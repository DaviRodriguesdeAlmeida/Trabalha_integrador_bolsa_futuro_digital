const AgendamentosModel = require('../models/agendamentos.js');
const UsuariosModel = require('../models/usuarios.js');
const ProfissionaisModel = require('../models/profissionais.js');
const ServicosModel = require('../models/servicos.js');
const AppError = require('../utils/appError.js');
const { CriarAgendamentoSchema, FiltrosAgendamentoSchema, ReagendarAgendamentoSchema } = require('../validator/agendamento.js');

function normalizar_data_hora(data_hora) {
    let data_formatada = data_hora.replace('T', ' ');
    if (data_formatada.length === 16) {
        data_formatada += ':00';
    }
    return data_formatada;
}

function converter_para_data(data_hora) {
    return new Date(data_hora.replace(' ', 'T'));
}

function formatar_data_hora(data) {
    const zero = numero => String(numero).padStart(2, '0');
    return `${data.getFullYear()}-${zero(data.getMonth() + 1)}-${zero(data.getDate())} ` +
        `${zero(data.getHours())}:${zero(data.getMinutes())}:${zero(data.getSeconds())}`;
}

function validar_schema(schema, dados) {
    const validacao = schema.safeParse(dados);
    if (!validacao.success) {
        throw new AppError('Erro de validação', 400, validacao.error.flatten().fieldErrors);
    }
    return validacao.data;
}

class AgendamentosService {
    static async validar_disponibilidade(dados, id_ignorado = null) {
        let usuario;
        let profissional;
        let servico;

        try {
            usuario = await UsuariosModel.buscar_usuario_por_id(dados.usuario_id);
        } catch (error) {
            throw new AppError('Usuário não encontrado', 404);
        }
        try {
            profissional = await ProfissionaisModel.buscar_profissional_por_id(dados.profissional_id);
        } catch (error) {
            throw new AppError('Profissional não encontrado', 404);
        }
        try {
            servico = await ServicosModel.buscar_servico_por_id(dados.servico_id);
        } catch (error) {
            throw new AppError('Serviço não encontrado', 404);
        }

        if (!profissional.ativo) {
            throw new AppError('O profissional está inativo', 400);
        }
        if (!servico.ativo) {
            throw new AppError('O serviço está inativo', 400);
        }

        const relacao = await AgendamentosModel.profissional_realiza_servico(
            dados.profissional_id,
            dados.servico_id
        );
        if (!relacao) {
            throw new AppError('O profissional não realiza este serviço', 400);
        }

        const inicio = normalizar_data_hora(dados.data_hora_inicio);
        const inicio_data = converter_para_data(inicio);
        if (Number.isNaN(inicio_data.getTime())) {
            throw new AppError('Data e hora inválidas', 400);
        }

        const fim_data = new Date(inicio_data.getTime() + servico.duracao_min * 60000);
        const fim = formatar_data_hora(fim_data);
        const dia_semana = inicio_data.getDay();

        const horario_trabalho = await AgendamentosModel.buscar_horario_trabalho(
            dados.profissional_id,
            dia_semana,
            inicio,
            fim
        );
        if (!horario_trabalho) {
            throw new AppError('O horário está fora do expediente do profissional', 409);
        }

        const horario_bloqueado = await AgendamentosModel.buscar_horario_bloqueado(
            dados.profissional_id,
            inicio,
            fim
        );
        if (horario_bloqueado) {
            throw new AppError('O horário está bloqueado', 409);
        }

        const conflito = await AgendamentosModel.buscar_conflito_horario(
            dados.profissional_id,
            inicio,
            fim,
            id_ignorado
        );
        if (conflito) {
            throw new AppError('O profissional já possui um agendamento neste horário', 409);
        }

        return {
            usuario_id: usuario.id,
            profissional_id: profissional.id,
            servico_id: servico.id,
            data_hora_inicio: inicio,
            data_hora_fim: fim
        };
    }

    static async criar_agendamento(dados) {
        const dados_validados = validar_schema(CriarAgendamentoSchema, dados);
        const agendamento = await this.validar_disponibilidade(dados_validados);// aqui ele antes de criar ele usa a funcao de validar disponibilidade pra saber se  da pra agendar mas quero saber como funciona ent me manda como a funcao faz isso nao o codigo mas a explicacao da logica do codigo
        const status = await AgendamentosModel.buscar_status_por_nome('Confirmado');//aqui e pra pegar o id do statuc que ele quer colocar no agendamento que ele vai criar, nesse caso ele quer colocar o status de confirmado ent ele pega o id do status de confirmado e coloca no agendamento
        agendamento.status_id = status.id;//aqui achei meio estranho pq vc muda  agendamento que e const mas tamvez seja coisa de objetos quepode mudar campos me explique tambem

        const id = await AgendamentosModel.criar_agendamento(agendamento);//aqui e pra ele retornar depois e agendamento criado acho que nao precisaria pq pelo que sei geralmente quando vc cria algo ele ja retorna o id do que criou e assim aumenta muito os fetchs no banco e pode causar atraso talves agora deja irreçevante ja que e so um a mais  
        return await AgendamentosModel.buscar_agendamento_por_id(id);
    }

    static async buscar_agendamento_por_id(id) {//aqui entendi
        if (!id) {
            throw new AppError('ID do agendamento não fornecido', 400);
        }
        const agendamento = await AgendamentosModel.buscar_agendamento_por_id(id);
        if (!agendamento) {
            throw new AppError('Agendamento não encontrado', 404);
        }
        return agendamento;
    }

    static async buscar_agendamentos(filtros) {
        const filtros_validados = validar_schema(FiltrosAgendamentoSchema, filtros);
        return await AgendamentosModel.buscar_agendamentos(filtros_validados);//acho que parece certo algo como um quere baseado nos dados recebidos mas ainda nao vi la como ele filtra no model me explica como ele faz
    }

    static async concluir_agendamento(id) {
        const agendamento = await this.buscar_agendamento_por_id(id);
        if (agendamento.status !== 'Confirmado') {//pq so pode concluir confirmados?
            throw new AppError('Somente agendamentos confirmados podem ser concluídos', 409);
        }

        const status = await AgendamentosModel.buscar_status_por_nome('Concluído');
        await AgendamentosModel.atualizar_status(id, status.id);//nao vi o que atualizar agendamento faz ent me explique mas acho que entendi que ele basicamente muda s status do item
        return await AgendamentosModel.buscar_agendamento_por_id(id);
    }

    static async cancelar_agendamento(id) {
        const agendamento = await this.buscar_agendamento_por_id(id);

        if (agendamento.status !== 'Confirmado') {
            throw new AppError(
                'Somente agendamentos confirmados podem ser cancelados',
                409
            );
        }

        const inicio = converter_para_data(agendamento.data_hora_inicio);
        const horas_restantes = (inicio.getTime() - Date.now()) / 3600000;

        if (horas_restantes < 2) {
            throw new AppError(
                'O cancelamento deve ser feito com no mínimo 2 horas de antecedência',
                400
            );
        }

        const status = await AgendamentosModel.buscar_status_por_nome('Cancelado');
        await AgendamentosModel.atualizar_status(id, status.id);

        return await AgendamentosModel.buscar_agendamento_por_id(id);
    }

    static async reagendar_agendamento(id, novos_dados) {  
        const agendamento_atual = await this.buscar_agendamento_por_id(id);
        if (agendamento_atual.status !== 'Confirmado') {
            throw new AppError('Somente agendamentos confirmados podem ser reagendados', 409);
        }

        const dados_validados = validar_schema(ReagendarAgendamentoSchema, novos_dados);//so retorna os dados validados
        const dados_novos = {
            usuario_id: agendamento_atual.usuario_id,
            profissional_id: dados_validados.profissional_id || agendamento_atual.profissional_id,
            servico_id: dados_validados.servico_id || agendamento_atual.servico_id,
            data_hora_inicio: dados_validados.data_hora_inicio
        };//transforma em um objeto com os dados novos que ele quer reagendar e se nao tiver algum dado ele pega o do agendamento atual

        const novo_agendamento = await this.validar_disponibilidade(dados_novos, id);//ele verifica a disponibilidade tambem 
        const status_confirmado = await AgendamentosModel.buscar_status_por_nome('Confirmado');//nao entendi pq colocar esse estatus confirmado no item se em cima ja verificou se ostatus e de confirmado e nao entendi pq precisa do id de reagendado 
        const status_reagendado = await AgendamentosModel.buscar_status_por_nome('Reagendado');
        novo_agendamento.status_id = status_confirmado.id;

        const novo_id = await AgendamentosModel.reagendar_agendamento( id, status_reagendado.id, novo_agendamento);//nao sei o que reagendar do model faz me explique 
        return await AgendamentosModel.buscar_agendamento_por_id(novo_id);
    }
}

module.exports = AgendamentosService;
