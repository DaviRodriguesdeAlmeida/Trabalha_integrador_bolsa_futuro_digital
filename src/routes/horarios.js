const express = require('express');
const HorariosController = require('../controllers/horarios.js');

const router = express.Router();

router.post('/normal', HorariosController.criar_horario);
router.post('/bloqueado', HorariosController.bloquear_horario);
router.get('/normal/:id', HorariosController.buscar_horarios_por_profissional_id);
router.get('/bloqueado/:id', HorariosController.buscar_horarios_bloqueados_por_profissional_id);
router.get('/disponivel/:id', HorariosController.buscar_horarios_disponiveis);
// router.get('/bloqueado/:id', HorariosController.buscar_horarios_bloqueados_por_profissional_id);

module.exports = router;