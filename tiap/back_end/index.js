require('dotenv').config()
const { porta } = require('./env')

const express = require('express')
const setupRoutes = require('./config/routes')

const app = express()
app.use(express.json())

setupRoutes(app, express)

app.listen(porta, () => {
    console.log('aplicação rodando ' + porta)
})