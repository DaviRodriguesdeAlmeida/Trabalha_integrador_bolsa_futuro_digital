const express = require('express');
const usuarios_controller = require('../controllers/usuarios');

const router = express.Router();

router.get('/', usuarios_controller.buscar_usuarios);
router.get('/:id', usuarios_controller.buscar_usuario_por_id);
router.post('/', usuarios_controller.criar_usuario);
router.put('/:id', usuarios_controller.atualizar_usuario);
router.delete('/:id', usuarios_controller.deletar_usuario);

module.exports = router;