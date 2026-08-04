const zod = require('zod');

const formato_data_hora = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2})?$/;

const CriarAgendamentoSchema = zod.object({
    usuario_id: zod.coerce.number().int().positive(),
    profissional_id: zod.coerce.number().int().positive(),
    servico_id: zod.coerce.number().int().positive(),
    data_hora_inicio: zod.string().regex(formato_data_hora, {
        message: 'A data deve estar no formato AAAA-MM-DD HH:mm:ss'
    })
});

const FiltrosAgendamentoSchema = zod.object({
    usuario_id: zod.coerce.number().int().positive().optional(),
    profissional_id: zod.coerce.number().int().positive().optional(),
    status: zod.enum([
        'Aguardando confirmação',
        'Confirmado',
        'Cancelado',
        'Concluído',
        'Reagendado'
    ]).optional()
});

const ReagendarAgendamentoSchema = zod.object({
    data_hora_inicio: zod.string().regex(formato_data_hora, {
        message: 'A data deve estar no formato AAAA-MM-DD HH:mm:ss'
    }),
    profissional_id: zod.coerce.number().int().positive().optional(),
    servico_id: zod.coerce.number().int().positive().optional()
});

module.exports = {
    CriarAgendamentoSchema,
    FiltrosAgendamentoSchema,
    ReagendarAgendamentoSchema
};
