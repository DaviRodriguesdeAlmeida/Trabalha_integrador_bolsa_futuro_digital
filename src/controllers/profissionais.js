const ProfissionaisService = require('../services/profissionais.js');

class ProfissionaisController {
    static async buscar_profissionais(req, res) {
        try{
            const profissionais = await ProfissionaisService.buscar_profissionais();
            return res.status(200).json({
                sucesso: true,
                dados: profissionais
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async buscar_profissional_por_id(req, res) {
        try{
            const id = req.params.id;
            const profissional = await ProfissionaisService.buscar_profissional_por_id(id);
            return res.status(200).json({
                sucesso: true,
                dados:profissional
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async criar_profissional(req, res) {
        try{
            const profissional = req.body;
            const profissional_id = await ProfissionaisService.criar_profissional(profissional);
            return res.status(201).json({
                sucesso: true,
                dados: profissional_id
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async atualizar_profissional(req, res) {
        // return res.status(501).json({
        //     sucesso: false,
        //     erro: 'Função ainda não implementada'
        // });
        try{
            const id = req.params.id;
            const profissional = req.body;
            const profissional_atualizado = await ProfissionaisService.atualizar_profissional(id, profissional);
            return res.status(200).json({
                sucesso: true,
                dados: profissional_atualizado
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async deletar_profissional(req, res) {
        try{
            const id = req.params.id;
            await ProfissionaisService.deletar_profissional(id);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Profissional deletado com sucesso'
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async buscar_profissional_por_email(req, res) {
        try{
            const email = req.params.email;
            const profissional = await ProfissionaisService.buscar_profissional_por_email(email);
            return res.status(200).json({
                sucesso: true,
                dados: profissional
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
}

module.exports = ProfissionaisController;
