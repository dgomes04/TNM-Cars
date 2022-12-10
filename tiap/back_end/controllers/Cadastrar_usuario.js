const connection = require('../connection')
const bcrypt = require('bcrypt')
const emailValidator = require('is-valid-email')
const jwt = require('jsonwebtoken')
const { servidor, segredo } = require('../env')
const disparaEmail = require('../controllers/Enviar_email')

module.exports = async (request, response) => {

    try {
        const data = request.body

        const { email, nome, senha, confirmacaoDeSenha, telefone, usuario } = data

        if (!email || !nome || !senha || !confirmacaoDeSenha || !telefone || !usuario) {
            throw new Error('Necessário o preenchimento de todos os campos')
        }

        if (nome.length < 3) {
            throw new Error('Insira um nome com no mínimo três caracteres' )
        }

        if (senha.length < 6) {
            throw new Error('A senha precisa ter no mínimo seis caracteres' ) 
        }
        if (senha != confirmacaoDeSenha) {
            throw new Error( 'As senhas não conferem' )
        }
        if (emailValidator(email) == false) {
            throw new Error('Insira um email válido' )
        }
        if (telefone < 8) {
            throw new Error('O telefone precisa possuir ddd e ter no mínimo 8 dígitos' )
        }
        if (usuario < 4) {
            throw new Error('O usuário precisa ter no mínimo 4 dígitos' )
        }
        const senhaCryp = await bcrypt.hash(senha, 10)

        const query = "INSERT INTO users (email, senha, nome, telefone, usuario) VALUES (?,?,?,?,?)"

        let user = await connection.awaitQuery(query, [email, senhaCryp, nome, telefone, usuario])
        
        if (user == undefined) {
            throw new Error('usuário existente' )
        }

        user = await connection.awaitQuery(`SELECT id, email, nome from users where id =${user.insertId}`)
        
        user = user[0]

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                email: user.email
            },
            segredo,
            {
                expiresIn: '30m'
            }
        )

        const urlCompleta = `${servidor}/cadastro/confirmar?token=${token}`

        await disparaEmail.disparar({
            para: user.email,
            assunto: 'Confirmação de conta',
            texto: `
            <h2>olá ${user.nome}<h2><br>
            <p>Confirme seu email através deste <a href="${urlCompleta}">link</a>
        `,
            ehHtml: true
        })

        response.json({
            mensagem: 'Email enviado!'
        })
    } catch (error) {
        return response.status(400).json({ error: error.message  })
    }

}