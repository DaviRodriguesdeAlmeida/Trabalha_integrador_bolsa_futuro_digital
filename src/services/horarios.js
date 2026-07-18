const HorariosModel = require('../models/horarios.js');
const filtrar_horarios_disponiveis = require('../utils/horarios_disponiveis.js');

class HorariosService {
    static async buscar_horarios_por_profissional_id(id) {
        return await HorariosModel.buscar_horarios_por_profissional_id(id);
    }

    static async buscar_horarios_bloqueados_por_profissional_id(id) {
        return await HorariosModel.buscar_horario_bloqueado_por_profissional_id(id);
    }

    static async buscar_horarios_disponiveis(id, data) {
        if (!id) {
            throw new Error('ID do profissional não fornecido');
        }
        if (!data) {
            throw new Error('Data não fornecida');
        }

        const horarios_bloqueados = await HorariosModel.buscar_horario_bloqueado_por_data(id, data);
        const horarios_trabalho = await HorariosModel.buscar_horarios_por_profissional_id(id);

        const horarios_neste_dia = await filtrar_horarios_disponiveis(horarios_trabalho, horarios_bloqueados, data);
        return horarios_neste_dia;
    }
    

    static async buscar_horario_bloqueado_por_data(id, data) {
        if (!id) {
            throw new Error('ID do profissional não fornecido');
        }
        if (!data) {
            throw new Error('Data não fornecida');
        }
        return await HorariosModel.buscar_horario_bloqueado_por_data(id, data);
    }

    static async criar_horarios(id, horarios) {
        if (!id) {
            throw new Error('ID do profissional não fornecido');
        }
        if (!horarios || !horarios.dia_semana || !horarios.hora_inicio || !horarios.hora_fim) {
            throw new Error('Dados de horários incompletos');
        }
        if (horarios.hora_inicio >= horarios.hora_fim) {
            throw new Error('O horário de início deve ser anterior ao horário de fim');
        }
        const conflito = await HorariosService.buscar_horario_conflito(id, horarios);
        if (conflito.length > 0) {
            throw new Error('O horário informado conflita com um horário já existente');
        }
        return await HorariosModel.criar_horarios(id, horarios);
    }

    static async buscar_horario_conflito(id, horarios) {
        const { dia_semana, hora_inicio, hora_fim } = horarios;
        if (!dia_semana || !hora_inicio || !hora_fim) {
            throw new Error('Dados de horários incompletos');
        }
        return await HorariosModel.buscar_horario_conflito(id, horarios);
    }

    static async bloquear_horario(id, horarios) {
        const { inicio, fim, motivo } = horarios;
        if (!inicio || !fim || !motivo) {
            throw new Error('Dados de bloqueio de horário incompletos');
        }
        if(new Date(inicio) >= new Date(fim)) {
            throw new Error('O horário de início deve ser anterior ao horário de fim');
        }
        const conflito = await HorariosService.buscar_horario_bloqueado_conflito(id, inicio, fim);
        if (conflito.length > 0) {
            throw new Error('O horário de bloqueio conflita com um horário já bloqueado');
        }
        return await HorariosModel.bloquear_horario(id, horarios);
    }

    static async buscar_horario_bloqueado_conflito(id, inicio, fim) {
        if (!inicio || !fim) {
            throw new Error('Dados de bloqueio de horário incompletos');
        }
        return await HorariosModel.buscar_horario_bloqueado_conflito(id, inicio, fim);
    }
}
module.exports = HorariosService;