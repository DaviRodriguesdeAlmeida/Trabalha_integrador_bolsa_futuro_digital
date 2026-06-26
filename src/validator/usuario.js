const zod = require('zod');

const UsuarioSchema = zod.object({
    nome: zod.string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(255,{"message": "O nome deve ter no máximo 255 caracteres"}),
    email: zod.string()
    .email({"message": "O email deve ser válido"})
    .max(255,{"message": "O email deve ter no máximo 255 caracteres"}),
    senha_hash: zod.string()
    .min(6,{"message": "A senha deve ter pelo menos 6 caracteres"})
    .max(255,{"message": "A senha deve ter no máximo 255 caracteres"}),
})

module.exports = UsuarioSchema;