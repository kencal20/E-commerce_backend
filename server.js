const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

//database s


app.listen(PORT, () => console.log(`Server is hosted on http://localhost:${PORT} `))