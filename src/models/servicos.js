const pool = require('../config/database.js');

class ServicosModel {
    static async buscar_servicos() {
        const [linhas] = await pool.query('SELECT * FROM servicos');
        return linhas;
    }

    static async buscar_servico_por_id(id) {
        const [linhas] = await pool.query('SELECT * FROM servicos WHERE id = ?', [id]);
        if (linhas.length === 0) {
            throw new Error('Serviço não encontrado');
        }
        return linhas[0];
    }

    static async buscar_servicos_por_area(area_id) {
        const [linhas] = await pool.query('SELECT * FROM servicos WHERE area_id = ?', [area_id]);
        if (linhas.length === 0) {
            throw new Error('Nenhum serviço encontrado para a área especificada');
        }
        return linhas;
    }

    static async criar_servico(servico) {
        const { nome, area_id, preco, duracao_min } = servico;
        const [resultado] = await pool.query('INSERT INTO servicos (nome, area_id, preco, duracao_min) VALUES (?, ?, ?, ?)', [nome, area_id, preco, duracao_min]);
        if (resultado.affectedRows === 0) {
            throw new Error('Erro ao criar serviço');
        }else{
            return resultado.insertId;
        }
    }

    static async atualizar_servico(id, servico) {
        const [resultado] = await pool.query('UPDATE servicos SET ? WHERE id = ?', [servico, id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Erro ao atualizar serviço');
        }

        const ServicoAtualizado = await this.buscar_servico_por_id(id);
        return ServicoAtualizado;
        
    }

    static async deletar_servico(id) {
        const [resultado] = await pool.query('DELETE FROM servicos WHERE id = ?', [id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Erro ao deletar serviço');
        }
        return id;
    }
}

module.exports = ServicosModel;
