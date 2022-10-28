const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DB , () => {
    console.log('Database is connected');
}, e => console.error(e))

app.use(express.json())
app.use(cors())

app.use('/', userRouter)
app.use('/admin', adminRouter)

app.listen(4000, () => {
    console.log('Server is running');
})