const pool = require('../config/database.js');

class UsuariosModel  {
    static async buscar_usuarios() {
        const [linhas] = await pool.query('SELECT * FROM usuarios');
        return linhas;
    }

    static async buscar_usuario_por_id(id) {
        const [linhas] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (linhas.length === 0) {
            throw new Error('Usuário não encontrado');
        }
        return linhas[0];
    }

    static async criar_usuario(usuario) {
        const { nome, email, senha_hash, nivel_acesso_id } = usuario;
        const [resultado] = await pool.query('INSERT INTO usuarios (nome, email, senha_hash, nivel_acesso_id) VALUES (?, ?, ?, ?)', [nome, email, senha_hash, nivel_acesso_id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Erro ao criar usuário');
        }else{
            return resultado.insertId;
        }
    }

    static async atualizar_usuario(id, usuario) {
        if(id == null || id == undefined || id == ""){
            throw new Error('ID do usuário não fornecido');
        }
        const [resultado] = await pool.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Erro ao atualizar usuário');
        }else{
            const UsuarioAtualizado = await this.buscar_usuario_por_id(id);
            return UsuarioAtualizado;
        }
    }

    static async deletar_usuario(id) {
        const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Erro ao deletar usuário');
        }else{
            return id;
        }
    }
}

module.exports = UsuariosModel;