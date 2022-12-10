const porta = process.env.PORT || 3030

module.exports = {
    porta,
    segredo: process.env.SECRET,
    servidor: process.env.SERVER || `http://localhost:${porta}`,
    smtp: {
        service: process.env.SMTP_SERVICE,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}
