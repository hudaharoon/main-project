const router = require('./Routes/router')

const appMiddleware = require('./Middleware/appMiddleware')


//1)import .env

require('dotenv').config()

//2)import express

const express = require("express")

//import connetion .js
require('./DB/connections')

//3)import cors

const cors = require('cors')

//4)create a server

const pfServer = express()


//5)make use of cors by server

pfServer.use(cors())


//6)use middleware tomconvert json to js object

pfServer.use(express.json())
//pfServer.use(appMiddleware)
pfServer.use(router)

//pfServer.use(appMiddleware)
pfServer.use('/uploads',express.static('./uploads'))

//7)define port
const PORT = 4000

//8)run the server
pfServer.listen(PORT, () => {
    console.log(`server is running successfully at port:${PORT}`);
})

pfServer.get('/', (req, res) => {
    res.send("project fair server is running successfully")
})