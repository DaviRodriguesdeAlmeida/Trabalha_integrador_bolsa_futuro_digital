const jwt = require("jsonwebtoken");

class JWT {
    JWT_SECRET_KEY = "chave_ultra_super_secreta";

    static gerarToken(usuario) {
        const { id ,nome, email } = usuario;
        const payload = { id, nome, email };
        const token = jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: "1h" });
        return token;
    }

    static verificarToken(token) {

    }
}