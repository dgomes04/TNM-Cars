
const connection = require('../connection')

module.exports = async (request, response) => {
   
    const query = `SELECT c.* FROM favoritos f 
    JOIN carros c on c.id = f.idCarro 
    WHERE f.idUser = ${request.usuario.id}`

    const carros = await connection.awaitQuery(query)

    response.json(carros)
}