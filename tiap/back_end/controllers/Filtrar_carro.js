const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    if (data.estado && data.marca && data.carroceria && data.cambio) {

        const { estado, marca, carroceria, cambio } = request.body

        let querySelect = `select * from carros `

        if (estado == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `where estado = '${estado}' `
        }


        let comando = 'where'  

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }



        if (marca == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} marca = '${marca}' `
        }

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (carroceria == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} estilo = '${carroceria}' `
        }

        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (cambio == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} cambio = '${cambio}'`
        }

        const carros = await connection.awaitQuery(querySelect);
        return response.json(carros)

    }


}