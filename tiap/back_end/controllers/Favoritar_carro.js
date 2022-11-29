
const connection = require('../connection')

exports.favoritar = async (request, response) => {

    const { idCarro } = request.body

    if (! idCarro) {
        return response.status(400).json({ error: 'id do carro não informado' })
    }

    const query = 'INSERT INTO favoritos (idUser, idCarro) VALUES (?,?)'

    const insertedCarros = await connection.awaitQuery(query, [request.usuario.id, idCarro])

    response.json(insertedCarros)

}

exports.desfavoritar = async (request, response) => {

    const { idCarro } = request.body

    if (! idCarro) {
        return response.status(400).json({ error: 'id do carro não informado' })
    }

    const query = `DELETE FROM  favoritos WHERE idUser = ${request.usuario.id} AND idCarro = ${idCarro}`

    const deleteCarros = await connection.awaitQuery(query)

    response.json(deleteCarros)
}