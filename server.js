const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT
const db = mongoose.connection
const db_name = process.env.DATABASE_NAME

//middleware
app.use(express.json())
app.use(cors())

//database 
mongoose.connect(db_name)
db.on('error', () => console.log('Error when Connecting to database'))
db.once('open', () => console.log('Successful in Connecting to database')) 


app.listen(PORT, () => console.log(`Server is hosted on http://localhost:${PORT} `))