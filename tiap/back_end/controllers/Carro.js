const connection = require('../connection')

module.exports = async (request, response) => {

    const { id } = request.body

    if (!id) {
        return response.status(400).json({ error: 'id do carro nÃ£o informado' })
    }

    const carrosPopulares = await connection.awaitQuery(`SELECT * FROM carros where id = ${id}`)

    response.json(carrosPopulares)
}
