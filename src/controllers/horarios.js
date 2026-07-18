const HorariosService = require('../services/horarios.js');

class HorariosController {
    static async buscar_horarios_disponiveis(req, res) {
        try {
            const id = req.params.id;
            const data = req.query.data;
            const horarios_disponiveis = await HorariosService.buscar_horarios_disponiveis(id, data);
            return res.status(200).json({
                sucesso: true,
                dados: horarios_disponiveis
            });
        }catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async criar_horario(req, res) {
        try {
            const { profissional_id, dia_semana, hora_inicio, hora_fim } = req.body;
            const horarios = { dia_semana, hora_inicio, hora_fim };
            const resultado = await HorariosService.criar_horarios(profissional_id, horarios);
            return res.status(201).json({
                sucesso: true,
                dados: resultado
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async bloquear_horario(req, res) {
        try {
            const { profissional_id, inicio, fim, motivo } = req.body;  
            const horarios = { inicio, fim, motivo };
            const resultado = await HorariosService.bloquear_horario(profissional_id, horarios);
            return res.status(201).json({
                sucesso: true,
                dados: resultado
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async buscar_horarios_por_profissional_id(req, res) {
        try {
            const id = req.params.id;
            const horarios = await HorariosService.buscar_horarios_por_profissional_id(id);
            return res.status(200).json({
                sucesso: true,
                dados: horarios
            });
        }
        catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async buscar_horarios_bloqueados_por_profissional_id(req, res) {
        try {
            const id = req.params.id;
            const horarios_bloqueados = await HorariosService.buscar_horarios_bloqueados_por_profissional_id(id);
            return res.status(200).json({
                sucesso: true,
                dados: horarios_bloqueados
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
}

module.exports = HorariosController;
