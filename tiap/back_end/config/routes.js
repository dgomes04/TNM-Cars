const { carrosRouter, usersRouter } = require('../routes')

module.exports = (app, express) => {
    app.use('/static', express.static(__dirname + '/imagens'));
    app.use(carrosRouter)
    app.use(usersRouter)
}