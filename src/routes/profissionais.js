const express = require('express');
const ProfissionaisController = require('../controllers/profissionais.js');

const router = express.Router();

router.get('/', ProfissionaisController.buscar_profissionais);
router.get('/:id', ProfissionaisController.buscar_profissional_por_id);
router.get('/email/:email', ProfissionaisController.buscar_profissional_por_email);
router.post('/', ProfissionaisController.criar_profissional);
router.put('/:id', ProfissionaisController.atualizar_profissional);
router.delete('/:id', ProfissionaisController.deletar_profissional);

module.exports = router;
