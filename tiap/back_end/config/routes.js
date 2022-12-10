const { carrosRouter, usersRouter } = require('../routes')

module.exports = (app, express) => {
    app.use(carrosRouter)
    app.use(usersRouter)
}