import loginRouter from './routes/login'
import swDocument from './swagger.def'
import { ServiceRouter } from './routes/service.route'
const {sequelize} = require('./models')

const express = require('express'),
http = require('http'),
swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser').json()

const app = express()

app.use(bodyParser)
app.use(express.json())
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))
app.use('/login', loginRouter)

const server = http.createServer(app)
const hostname = '0.0.0.0'
const port = 3001

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/api-docs`)
  // await sequelize.sync()
  await sequelize.authenticate()
  console.log("Database connected successfully")
})
app.use(ServiceRouter)


//! TEST HTTP 
app.post("/test", async (req: any, res: any) => {
  console.log("Test completed")
  console.log(req.body)
})