class AppError extends Error {
    constructor(mensagem, statusCode = 400, erros = null) {
        super(mensagem);
        this.statusCode = statusCode;
        this.erros = erros;
    }
}

module.exports = AppError;