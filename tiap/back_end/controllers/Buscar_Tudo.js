
const connection = require('../connection')

module.exports = async (request, response) => {
    
    const carrosPopulares =  await connection.awaitQuery(`SELECT * FROM carros`)

    response.json(carrosPopulares)
}
