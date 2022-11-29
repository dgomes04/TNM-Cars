const connection = require('../connection')
const bcrypt = require('bcrypt')

module.exports = async (request, response) => {
    const data = request.body

    const idUsuario = request.usuario

    if (!data.email || !data.nome || !data.usuario || !data.telefone || !data.senha) {
        return response.status(400).json({ error: 'Necessário o preenchimento de todos os campos' })
    }
    const senhaCryp = await bcrypt.hash(data.senha, 10)

    const query = `UPDATE users
    SET email = "${data.email}", senha = "${senhaCryp}", nome = "${data.nome}", usuario = "${data.usuario}", telefone = "${data.telefone}"
    WHERE id = ${idUsuario.id}`
    
    const editarUsuario = await connection.awaitQuery(query)

    response.status(200).json({menssagem: 'Usuário editado com sucesso'});

}