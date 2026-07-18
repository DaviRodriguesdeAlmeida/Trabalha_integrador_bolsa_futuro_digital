const pool = require("../config/database")

class HorariosModel {
    static async buscar_horarios_por_profissional_id(id) {
        const [linhas] = await pool.query('SELECT * FROM horarios_trabalho WHERE profissional_id = ?', [id]);
        return linhas;
    }

    static async buscar_horario_bloqueado_por_data(id, data) {
        const [linhas] = await pool.query(
            'SELECT * FROM horarios_bloqueados WHERE profissional_id = ? AND inicio like ? ',
            [id, `${data}%`]
        );
        return linhas;
    }

    static async buscar_horario_bloqueado_por_profissional_id(id) {
        const [linhas] = await pool.query(
            'SELECT * FROM horarios_bloqueados WHERE profissional_id = ?',
            [id]
        );
        return linhas;
    }

    static async criar_horarios(id, horarios){
        const { dia_semana, hora_inicio, hora_fim } = horarios;
        const [resultado] = await pool.query(
            'INSERT INTO horarios_trabalho (profissional_id, dia_semana, hora_inicio, hora_fim) values(?, ?, ?, ?)',
            [id, dia_semana, hora_inicio, hora_fim]
        );
        return resultado;
    }

    static async buscar_horario_conflito(id, horarios) {
        const { dia_semana, hora_inicio, hora_fim } = horarios;
        const [linhas] = await pool.query(
            'SELECT * FROM horarios_trabalho WHERE dia_semana = ? AND hora_inicio < ? AND hora_fim > ? AND profissional_id = ? limit 1',
            [dia_semana, hora_fim, hora_inicio, id]
        );
        return linhas;
    }

    static async bloquear_horario(id, horarios) {
        const { inicio, fim, motivo } = horarios;
        const [resultado] = await pool.query(
            'INSERT INTO horarios_bloqueados (profissional_id, inicio, fim, motivo) values(?, ?, ?, ?)',
            [id, inicio, fim, motivo]
        );
        return resultado;
    }

    static async buscar_horario_bloqueado_por_profissional_id(id) {
        const [linhas] = await pool.query(
            'SELECT * FROM horarios_bloqueados WHERE profissional_id = ?',
            [id]
        );
        return linhas;
    }

    static async buscar_horario_bloqueado_conflito(id, inicio, fim) {
        const [linhas] = await pool.query(
            'SELECT * FROM horarios_bloqueados WHERE profissional_id = ? AND inicio < ? AND fim > ? LIMIT 1',
            [id, fim, inicio]
        );
        return linhas;
    }

    static async buscar_horario_bloqueado_por_id(id) {
        const [linhas] = await pool.query(
            'SELECT * FROM horarios_bloqueados WHERE profissional_id = ?',
            [id]
        );
        return linhas;
    }
}

module.exports = HorariosModel

// HorariosModel.buscar_horario_bloqueado_por_id(1)
//     .then(resultado => console.log(resultado))
//     .catch(erro => console.error(erro));

// HorariosModel.criar_horarios(1, { dia_semana: 'Segunda-feira', hora_inicio: '09:00', hora_fim: '17:00' })
//     .then(resultado => console.log(resultado))
//     .catch(erro => console.error(erro));

// HorariosModel.buscar_horarios_por_profissional_id(1)
//     .then(resultado => console.log(resultado))
//     .catch(erro => console.error(erro));