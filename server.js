if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-layouts')
const mongoose = require('mongoose')

const homeRouter = require('./routes/home')
const userRouter = require('./routes/users')

const app = express()


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', homeRouter)
app.use('/user', userRouter)



port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server running at port ' + port)
})

