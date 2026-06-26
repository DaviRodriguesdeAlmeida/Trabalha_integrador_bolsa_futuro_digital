const pool = require('../config/database.js');

class ProfissionaisModel {
    static async buscar_profissionais() {
        const [linhas] = await pool.query('SELECT * FROM profissionais');
        return linhas;
    }

    static async buscar_profissional_por_id(id) {
        const [linhas] = await pool.query('SELECT * FROM profissionais WHERE id = ?', [id]);
        if (linhas.length === 0) {
            throw new Error('Profissional não encontrado');
        }
        return linhas[0];
    }

    static async criar_profissional(profissional) {
        const { nome, email, telefone, especialidade } = profissional;
        const [resultado] = await pool.query(
            'INSERT INTO profissionais (nome, email, telefone, especialidade) VALUES (?, ?, ?, ?)',
            [nome, email, telefone, especialidade]
        );
        return resultado.insertId;
    }

    static async atualizar_profissional(id, profissional) {
        
        const [resultado] = await pool.query('UPDATE profissionais SET ? WHERE id = ?', [profissional, id]);
        // return resultado;
        if (resultado.affectedRows === 0) {
            throw new Error('Profissional não encontrado');
        }
        const profissional_atualizado = await this.buscar_profissional_por_id(id);
        return profissional_atualizado;
    }

    static async deletar_profissional(id) {
        const [resultado] = await pool.query('DELETE FROM profissionais WHERE id = ?', [id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Profissional não encontrado');
        }
    }

    static async buscar_profissional_por_email(email) {
        const [linhas] = await pool.query('SELECT * FROM profissionais WHERE email = ?', [email]);
        if (linhas.length === 0) {
            throw new Error('Profissional não encontrado');
        }
        return linhas[0];
    }
}

module.exports = ProfissionaisModel;
