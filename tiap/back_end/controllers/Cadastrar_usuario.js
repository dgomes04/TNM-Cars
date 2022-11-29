const connection = require('../connection')
const bcrypt = require('bcrypt')
const emailValidator = require('is-valid-email')

module.exports = async (request, response) => {
    const data = request.body

    const { email, nome, senha, confirmacaoDeSenha, telefone, usuario } = data

    if (!email || !nome || !senha || !confirmacaoDeSenha || !telefone || !usuario) {
        return response.status(400).json({ error: 'Necessário o preenchimento de todos os campos' })
    }

    if (nome.length < 3) {
        return response.status(400).json({ error: 'Insira um nome com no mínimo três caracteres' })
    }

    if (senha.length < 6) {
        return response.status(400).json({ error: 'A senha precisa ter no mínimo seis caracteres' })
    }
    if (senha != confirmacaoDeSenha) {
        return response.status(400).json({ error: 'As senhas não conferem' })
    }
    if (emailValidator(email) == false) {
        return response.status(400).json({ error: 'Insira um email válido' })
    }
   if (telefone < 8) {
    return response.status(400).json({ error: 'O telefone precisa possuir ddd e ter no mínimo 8 dígitos' })
   }
   if (usuario < 4) {
    return response.status(400).json({ error: 'O usuário precisa ter no mínimo 4 dígitos' })
   }

    const senhaCryp = await bcrypt.hash(senha, 10)

    const query = "INSERT INTO users (email, senha, nome, telefone, usuario) VALUES (?,?,?,?,?)"
    
    const insertedUser = await connection.awaitQuery(query, [email, senhaCryp, nome, telefone, usuario])
    
    if (insertedUser == undefined) {
        response.status(200).json({menssagem: 'Usuário existente'});
    } else {
        response.status(200).json({menssagem: 'Usuário cadastrado com sucesso'});
    }


}