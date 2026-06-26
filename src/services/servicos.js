const ServicosModel = require('../models/servicos.js');

class ServicosService {
    static async buscar_servicos() {
        return await ServicosModel.buscar_servicos();
    }

    static async buscar_servico_por_id(id) {
        if (!id) {
            throw new Error('ID do serviço não fornecido');
        }
        return await ServicosModel.buscar_servico_por_id(id);
    }

    static async buscar_servicos_por_area(area_id) {
        if (!area_id) {
            throw new Error('ID da área não fornecido');
        }
        return await ServicosModel.buscar_servicos_por_area(area_id);
    }

    static async criar_servico(servico) {
        if (!servico) {
            throw new Error('Dados do serviço não fornecidos');
        }
        if (!servico.nome || !servico.area_id || !servico.preco || !servico.duracao_min) {
            throw new Error('Todos os campos do serviço devem ser fornecidos');
        }
        return await ServicosModel.criar_servico(servico);
    }

    static async atualizar_servico(id, servico) {
        if (!id) {
            throw new Error('ID do serviço não fornecido');
        }
        if (!servico) {
            throw new Error('Dados do serviço não fornecidos');
        }
        return await ServicosModel.atualizar_servico(id, servico);
    }

    static async deletar_servico(id) {
        if (!id) {
            throw new Error('ID do serviço não fornecido');
        }
        const servico = await ServicosModel.buscar_servico_por_id(id);
        if (!servico) {
            throw new Error('Serviço não encontrado');
        }
        return await ServicosModel.deletar_servico(id);
    }
}

module.exports = ServicosService;
