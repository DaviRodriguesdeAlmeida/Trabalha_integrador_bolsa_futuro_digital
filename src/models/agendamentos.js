const pool = require('../config/database.js');

class AgendamentosModel {
    static async buscar_agendamento_por_id(id) {
        const [linhas] = await pool.query(
            `SELECT agendamentos.*, usuarios.nome AS usuario_nome, 
             profissionais.nome AS profissional_nome,
             servicos.nome AS servico_nome, 
             status_agendamento.nome AS status
             FROM agendamentos
             INNER JOIN usuarios ON usuarios.id = agendamentos.usuario_id
             INNER JOIN profissionais ON profissionais.id = agendamentos.profissional_id
             INNER JOIN servicos ON servicos.id = agendamentos.servico_id
             INNER JOIN status_agendamento ON status_agendamento.id = agendamentos.status_id
             WHERE agendamentos.id = ?`,
            [id]
        );
        return linhas[0];
    }

    static async buscar_agendamentos(filtros) {
        let sql = `SELECT agendamentos.*, usuarios.nome AS usuario_nome,
            profissionais.nome AS profissional_nome,
            servicos.nome AS servico_nome,
            status_agendamento.nome AS status
            FROM agendamentos
            INNER JOIN usuarios ON usuarios.id = agendamentos.usuario_id
            INNER JOIN profissionais ON profissionais.id = agendamentos.profissional_id
            INNER JOIN servicos ON servicos.id = agendamentos.servico_id
            INNER JOIN status_agendamento ON status_agendamento.id = agendamentos.status_id
            WHERE 1 = 1`;
        const valores = [];

        if (filtros.usuario_id) {
            sql += ' AND agendamentos.usuario_id = ?';
            valores.push(filtros.usuario_id);
        }
        if (filtros.profissional_id) {
            sql += ' AND agendamentos.profissional_id = ?';
            valores.push(filtros.profissional_id);
        }
        if (filtros.status) {
            sql += ' AND status_agendamento.nome = ?';
            valores.push(filtros.status);
        }

        sql += ' ORDER BY agendamentos.data_hora_inicio';
        const [linhas] = await pool.query(sql, valores);
        return linhas;
    }

    static async buscar_agendamentos_ativos_por_data(profissional_id, data) {
        const [linhas] = await pool.query(
            `SELECT agendamentos.*
            FROM agendamentos
            INNER JOIN status_agendamento ON status_agendamento.id = agendamentos.status_id
            WHERE agendamentos.profissional_id = ?
            AND DATE(agendamentos.data_hora_inicio) = ?
            AND status_agendamento.nome NOT IN ('Cancelado', 'Reagendado')`,
            [profissional_id, data]
        );
        return linhas;
    }

    static async buscar_conflito_horario(profissional_id, inicio, fim, id_ignorado = null) {
        let sql = `SELECT agendamentos.id
            FROM agendamentos
            INNER JOIN status_agendamento ON status_agendamento.id = agendamentos.status_id
            WHERE agendamentos.profissional_id = ?
            AND agendamentos.data_hora_inicio < ?
            AND agendamentos.data_hora_fim > ?
            AND status_agendamento.nome NOT IN ('Cancelado', 'Reagendado')`;
        const valores = [profissional_id, fim, inicio];

        if (id_ignorado) {
            sql += ' AND agendamentos.id != ?';
            valores.push(id_ignorado);
        }

        sql += ' LIMIT 1';
        const [linhas] = await pool.query(sql, valores);
        return linhas[0];
    }

    static async buscar_horario_trabalho(profissional_id, dia_semana, inicio, fim) {
        const [linhas] = await pool.query(
            `SELECT * FROM horarios_trabalho
            WHERE profissional_id = ? AND dia_semana = ?
            AND hora_inicio <= TIME(?) AND hora_fim >= TIME(?)
            LIMIT 1`,
            [profissional_id, dia_semana, inicio, fim]
        );
        return linhas[0];
    }

    static async buscar_horario_bloqueado(profissional_id, inicio, fim) {
        const [linhas] = await pool.query(
            `SELECT * FROM horarios_bloqueados
            WHERE profissional_id = ? AND inicio < ? AND fim > ?
            LIMIT 1`,
            [profissional_id, fim, inicio]
        );
        return linhas[0];
    }

    static async profissional_realiza_servico(profissional_id, servico_id) {
        const [linhas] = await pool.query(
            'SELECT * FROM profissionais_servicos WHERE profissional_id = ? AND servico_id = ?',
            [profissional_id, servico_id]
        );
        return linhas[0];
    }

    static async buscar_status_por_nome(nome) {
        const [linhas] = await pool.query(
            'SELECT * FROM status_agendamento WHERE nome = ?',
            [nome]
        );
        return linhas[0];
    }

    static async criar_agendamento(agendamento) {
        const { usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim } = agendamento;
        const [resultado] = await pool.query(
            `INSERT INTO agendamentos
            (usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim]
        );
        return resultado.insertId;
    }

    static async atualizar_status(id, status_id) {
        const [resultado] = await pool.query(
            'UPDATE agendamentos SET status_id = ? WHERE id = ?',
            [status_id, id]
        );
        return resultado.affectedRows;
    }

    static async reagendar_agendamento(id, status_reagendado_id, novo_agendamento) {
        const conexao = await pool.getConnection();
        try {
            await conexao.beginTransaction();
            await conexao.query(
                'UPDATE agendamentos SET status_id = ? WHERE id = ?',
                [status_reagendado_id, id]
            );
            const [resultado] = await conexao.query(
                `INSERT INTO agendamentos
                (usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    novo_agendamento.usuario_id,
                    novo_agendamento.profissional_id,
                    novo_agendamento.servico_id,
                    novo_agendamento.status_id,
                    novo_agendamento.data_hora_inicio,
                    novo_agendamento.data_hora_fim
                ]
            );
            await conexao.commit();
            return resultado.insertId;
        } catch (error) {
            await conexao.rollback();
            throw error;
        } finally {
            conexao.release();
        }
    }
}

module.exports = AgendamentosModel;
