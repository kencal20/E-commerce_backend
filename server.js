const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT
const db = mongoose.connection
const db_name = process.env.DATABASE_NAME
const userRouter = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const orderRoutes = require('./routes/orderRoutes')
const admin = require('firebase-admin')

//middleware
app.use(express.json())
app.use(cors())

//database 
mongoose.connect(db_name)
db.on('error', () => console.log('Error when Connecting to database'))
db.once('open', () => console.log('Successful in Connecting to database'))

//firebase-admin setup
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

app.use('/users/', userRouter(admin))
app.use('/products/', productRoutes())
app.use('/categories/', categoryRoutes())
app.use('/orders/', orderRoutes())

app.listen(PORT, () => console.log(`Server is hosted on http://localhost:${PORT} `))