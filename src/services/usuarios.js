const UsuariosModel = require('../models/usuarios.js');
const { CriptografarSenha, DescriptografarSenha } = require('../utils/criptografia.js');
// const { JWT } = require("../middlewares/jwt.js");

class UsuariosService {
    static async buscar_usuarios() {
        return await UsuariosModel.buscar_usuarios();
    }

    static async buscar_usuario_por_id(id) {
        return await UsuariosModel.buscar_usuario_por_id(id);
    }

    static async criar_usuario(usuario) {
        const senha_codificada = await CriptografarSenha(usuario.senha_hash);
        usuario.senha_hash = senha_codificada;
        return await UsuariosModel.criar_usuario({...usuario, senha_hash: senha_codificada});
    }

    static async atualizar_usuario(id, usuario) {
        if (usuario.senha_hash) {
            const senha_codificada = await CriptografarSenha(usuario.senha_hash);
            usuario.senha_hash = senha_codificada;
        }
        return await UsuariosModel.atualizar_usuario(id, {...usuario});
    }

    static async deletar_usuario(id) {
        const usuario = await UsuariosModel.buscar_usuario_por_id(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        
        return await UsuariosModel.deletar_usuario(id); 
    }

}

module.exports = UsuariosService;