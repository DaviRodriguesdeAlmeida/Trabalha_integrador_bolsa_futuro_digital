const bcrypt = require("bcrypt");

async function CriptografarSenha(senha) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
}

async function DescriptografarSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
}
module.exports = {
    CriptografarSenha,
    DescriptografarSenha
}