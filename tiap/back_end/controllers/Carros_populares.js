const connection = require('../connection')

module.exports = async (request, response) => {
    
    const carrosPopulares =  await connection.awaitQuery(`SELECT * FROM carros
    INNER JOIN carros_populares
    ON carros.id = carros_populares.idcarro ORDER BY votos desc`)

    response.json(carrosPopulares)
}
