const { query } = require('express')
const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    if (data.cambio && data.estilo && data.anoMaximo && data.anoMinimo && data.precoMaximo && data.precoMinimo) {
        let querySelect = `select * from carros `
        let comando = 'where'

        if (data.cambio == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `where cambio = '${data.cambio}' `
        }
        if (querySelect != 'select * from carros ') {
            comando = 'where'
        }
        
        if (data.estilo == 'Todos') {
            querySelect += ``
        } else {
            querySelect += `${comando} estilo = '${data.estilo}' `
        }

        if (data.anoMinimo == 'Todos' && data.anoMaximo == 'Todos') {
            querySelect += ``
        }
        

        if (querySelect != 'select * from carros') {
            comando = 'and'
        }

        if (data.anoMinimo == 'Todos' && data.anoMaximo != 'Todos') {
            querySelect += `${comando} ano between 1500 and ${data.anoMaximo} `
        }

        if (data.anoMaximo == 'Todos' && data.anoMinimo != 'Todos') {
            querySelect += `${comando} ano between ${data.anoMinimo} and 3000 `
        }

        if (querySelect == 'select * from carros ') {
            comando = 'where'
        }

        if (data.anoMaximo != 'Todos' && data.anoMinimo != 'Todos') {
            querySelect += `${comando} ano between ${data.anoMinimo} and ${data.anoMaximo} `
        }
        
        if (querySelect != 'select * from carros ') {
            comando = 'and'
        }

        if (data.precoMinimo == 'Todos' && data.precoMaximo == 'Todos') {
            querySelect += ``
        }
        if (data.precoMinimo == 'Todos' && data.precoMaximo != 'Todos') {
            querySelect += `${comando} valor between 1500 and ${data.precoMaximo} `
        }

        if (data.precoMaximo == 'Todos' && data.precoMinimo != 'Todos') {
            querySelect += `${comando} valor between ${data.precoMinimo} and 900000 `
        }
       
        if (data.precoMaximo != 'Todos' && data.precoMinimo != 'Todos') {
            querySelect += `${comando} valor between ${data.precoMinimo} and ${data.precoMaximo} `
        }
        
        const carros = await connection.awaitQuery(querySelect);
        
        for (const { id } of carros) {

            const existeCarro = await connection.awaitQuery(`select * from carros_populares where idcarro = ${id}`)
            if (existeCarro[0]) {
                const voto = existeCarro[0].votos + 1
                await connection.awaitQuery(`update carros_populares set votos = ${voto} where idcarro = ${id}`)
            } else {
                await connection.awaitQuery(`INSERT INTO carros_populares (idcarro, votos) values (?,?)`, [id, 1])
            }
        }

        return response.json(carros)
    }



}