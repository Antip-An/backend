import loginRouter from './routes/login'
import swDocument from './swagger.def'
import { ServiceRouter } from './routes/service.route'
import { authRouter } from './routes/auth.route'
import { UserRouter } from './routes/user.router'
const {sequelize} = require('./models')

const express = require('express'),
http = require('http'),
swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser').json()

const app = express()

app.use(bodyParser)
app.use(express.json())
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))
app.use('/api', loginRouter, UserRouter, ServiceRouter, authRouter)


const server = http.createServer(app)
const hostname = '0.0.0.0'
const port = 8080

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/api-docs`)
  await sequelize.authenticate()
  console.log("Database connected successfully")
})

