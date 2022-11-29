
const connection = require('../connection')

module.exports = async (request, response) => {
    const data = request.body

    const validators = {
        valorParcela: 'O valor da parcela é obrigatório',
        qtdParcelas: 'A quantidade de parcelas é obrigatória',
        porcentagem: 'A porcentagem é obrigatória',
        cambio: 'O câmbio é obrigatório',
        custoCombutivel: 'O custo de combustível é obrigatório',
        estilo: 'O estilo é obrigatório'
    }

    for (const [key, value] of Object.entries(validators)) {
        if (!data[key]) {
            return response.status(400).json({ error: value })
        }
    }
    console.log(data)
    const valorParcela = Number.parseFloat(data.valorParcela.split(',').join('.'))
    const totalCarro = Number.parseFloat(valorParcela * data.qtdParcelas)
    const porcentagem = (data.porcentagem * totalCarro / 100)
    const valorCarroMaisPorcentagem = totalCarro + porcentagem
    const valorCarroMenosPorcentagem = (totalCarro - porcentagem)
    const cambio = data.cambio
    const consumo = data.custoCombutivel

    const estilosPermitidos = {
        hatch: `estilo = 'hatch'`,
        sedan: `estilo = 'sedan'`,
        suv: `estilo = 'suv'`,
        picape: `estilo = 'picape'`,
        todos: `(estilo = 'hatch' or estilo = 'sedan' or estilo = 'suv' or estilo = 'picape')`
    }

    let select = `SELECT * FROM carros where ${estilosPermitidos[data.estilo]}`

    if (data.custoCombutivel === 'todos') {
        select += ` and (consumo = 'baixo' or consumo = 'medio' or consumo = 'alto')`
    } else {
        select += ` and consumo = '${consumo}'`
    }


    if (data.cambio === 'todos') {
        select += ` and (cambio = 'manual' or cambio = 'automatico')`
    } else {
        select += ` and cambio = '${cambio}'`
    }

    select += ` and valor BETWEEN ${valorCarroMenosPorcentagem} AND ${valorCarroMaisPorcentagem} `

    const carros = await connection.awaitQuery(select);
   
    for (const {id} of carros) {

        const existeCarro =  await connection.awaitQuery(`select * from carros_populares where idcarro = ${id}`)
        if (existeCarro[0]) {
            const voto = existeCarro[0].votos +1
            await connection.awaitQuery(`update carros_populares set votos = ${voto} where idcarro = ${id}`) 
        } else {
            await connection.awaitQuery(`INSERT INTO carros_populares (idcarro, votos) values (?,?)`, [id, 1])
        }
    }
    response.json(carros)
   

}