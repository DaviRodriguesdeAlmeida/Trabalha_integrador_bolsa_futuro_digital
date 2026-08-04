const express = require('express');
const AgendamentosController = require('../controllers/agendamentos.js');

const router = express.Router();

router.post('/', AgendamentosController.criar_agendamento);
router.get('/', AgendamentosController.buscar_agendamentos);
router.get('/:id', AgendamentosController.buscar_agendamento_por_id);
router.put('/:id/concluir', AgendamentosController.concluir_agendamento);
router.put('/:id/cancelar', AgendamentosController.cancelar_agendamento);
router.put('/:id/reagendar', AgendamentosController.reagendar_agendamento);

module.exports = router;
