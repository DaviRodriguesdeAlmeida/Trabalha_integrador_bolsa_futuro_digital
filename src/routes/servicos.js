const express = require('express');
const ServicosController = require('../controllers/servicos.js');

const router = express.Router();

router.get('/', ServicosController.buscar_servicos);
router.get('/area/:area_id', ServicosController.buscar_servicos_por_area);
router.get('/:id', ServicosController.buscar_servico_por_id);
router.post('/', ServicosController.criar_servico);
router.put('/:id', ServicosController.atualizar_servico);
router.delete('/:id', ServicosController.deletar_servico);

module.exports = router;
