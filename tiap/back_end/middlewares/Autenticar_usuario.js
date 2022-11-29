const jwt = require('jsonwebtoken')

module.exports = async (request, response, next) => {

    const token = request.headers.token || request.query.token

    if (!token) {
        return response.status(400).json({ error: 'token não informado' })
    }

    let usuario = null

    try {

        usuario = jwt.verify(token, process.env.SECRET)

    } catch (error) {
        return response.status(400).json({ error: 'token inválido' })
    }

    request.usuario = usuario

    next()


}
