const AgendamentosService = require('../services/agendamentos.js');

class AgendamentosController {
    static async criar_agendamento(req, res) {
        try {
            const dados = req.body;
            const agendamento = await AgendamentosService.criar_agendamento(dados);
            return res.status(201).json({
                sucesso: true,
                dados: agendamento
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                sucesso: false,
                erro: error.message,
                erros: error.erros || null
            });
        }
    }

    static async buscar_agendamentos(req, res) {
        try {
            const filtros = req.query;
            const agendamentos = await AgendamentosService.buscar_agendamentos(filtros);
            return res.status(200).json({
                sucesso: true,
                dados: agendamentos
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                sucesso: false,
                erro: error.message,
                erros: error.erros || null
            });
        }
    }

    static async buscar_agendamento_por_id(req, res) {
        try {
            const id = req.params.id;
            const agendamento = await AgendamentosService.buscar_agendamento_por_id(id);
            return res.status(200).json({
                sucesso: true,
                dados: agendamento
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async concluir_agendamento(req, res) {
        try {
            const id = req.params.id;
            const agendamento = await AgendamentosService.concluir_agendamento(id);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Agendamento concluído com sucesso',
                dados: agendamento
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async cancelar_agendamento(req, res) {
        try {
            const id = req.params.id;
            const agendamento = await AgendamentosService.cancelar_agendamento(id);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Agendamento cancelado com sucesso',
                dados: agendamento
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async reagendar_agendamento(req, res) {
        try {
            const agendamento = await AgendamentosService.reagendar_agendamento(
                req.params.id,
                req.body
            );
            return res.status(201).json({
                sucesso: true,
                mensagem: 'Agendamento reagendado com sucesso',
                dados: agendamento
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                sucesso: false,
                erro: error.message,
                erros: error.erros || null
            });
        }
    }
}

module.exports = AgendamentosController;
