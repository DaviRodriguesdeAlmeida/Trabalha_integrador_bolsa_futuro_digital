const ProfissionaisModel = require('../models/profissionais.js');

class ProfissionaisService {
    static async buscar_profissionais() {
        return await ProfissionaisModel.buscar_profissionais();
    }

    static async buscar_profissional_por_id(id) {
        if (!id) {
            throw new Error('ID do profissional não fornecido');
        }
        return await ProfissionaisModel.buscar_profissional_por_id(id);
    }

    static async criar_profissional(profissional) {
        if (!profissional || !profissional.nome || !profissional.email || !profissional.telefone || !profissional.especialidade) {
            throw new Error('Dados do profissional incompletos');
        }
        return await ProfissionaisModel.criar_profissional(profissional);
    }

    static async atualizar_profissional(id, profissional) {
        if (!id) {
            throw new Error('ID do profissional não fornecido');
        }
        return await ProfissionaisModel.atualizar_profissional(id, profissional);
    }

    static async deletar_profissional(id) {
        if (!id) {
            throw new Error('ID do profissional não fornecido');
        }
        return await ProfissionaisModel.deletar_profissional(id);
    }

    static async buscar_profissional_por_email(email) {
        if (!email) {
            throw new Error('Email do profissional não fornecido');
        }
        return await ProfissionaisModel.buscar_profissional_por_email(email);
    }
}

module.exports = ProfissionaisService;
