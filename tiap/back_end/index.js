require('dotenv').config()

const express = require('express')
const setupRoutes = require('./config/routes')

const app = express()
app.use(express.json())

setupRoutes(app, express)

app.listen(3456, () => {
    console.log('aplicação rodando')
})

