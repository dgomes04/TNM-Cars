const express = require('express');
const usersRouter = express.Router();
const cadastrarUsuario = require('../controllers/Cadastrar_usuario')
const autenticarUsuario = require('../controllers/Autenticar_usuario')
const autenticarUsuarioMiddlewares = require('../middlewares/Autenticar_usuario')
const deletarUsuario = require('../controllers/Deletar_usuario')
const editarUsuario = require('../controllers/Editar_usuario')
const validarEmailUsuario = require('../controllers/Enviar_email')
const confirmarCadastro = require('../controllers/Confirmar_cadastro')

usersRouter.post('/users', cadastrarUsuario)
usersRouter.post('/users/autenticar',autenticarUsuario) 
usersRouter.post('/users/deletar', autenticarUsuarioMiddlewares, deletarUsuario)
usersRouter.post('/users/editar',autenticarUsuarioMiddlewares, editarUsuario)
usersRouter.post('/users/validarEmail',validarEmailUsuario.disparar)
usersRouter.get('/cadastro/confirmar', confirmarCadastro)
module.exports = usersRouter;