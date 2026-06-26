const UsuariosService = require('../services/usuarios.js');

class UsuariosController {
    static async buscar_usuarios(req, res) {
        try{
            const usuarios = await UsuariosService.buscar_usuarios();
            return res.status(200).json({
                sucesso: true,
                dados: usuarios
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async buscar_usuario_por_id(req, res) {
        try{
            const id = req.params.id;
            const usuario = await UsuariosService.buscar_usuario_por_id(id);
            return res.status(200).json({
                sucesso: true,
                dados:usuario
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    static async criar_usuario(req, res) {
        try{
            let usuario = req.body;
            const usuario_id = await UsuariosService.criar_usuario(usuario);
            return res.status(201).json({
                sucesso: true,
                dados: usuario_id
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message,
                erros: error.erros || null
            });
        }
    }

    static async atualizar_usuario(req, res) {
        try{
            const id = req.params.id;
            const usuario = req.body;
            const resultado = await UsuariosService.atualizar_usuario(id, usuario);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário atualizado com sucesso',
                dados: resultado
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
        // Lógica para atualizar um usuário existente
    }

    static async deletar_usuario(req, res) {
        // Lógica para deletar um usuário
        try{
            const id = req.params.id;
            const resultado = await UsuariosService.deletar_usuario(id);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário deletado com sucesso',
                dados: resultado
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
}

module.exports = UsuariosController;