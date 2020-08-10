if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-layouts')
const homeRouter = require('./routes/homeRouter')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'))



app.get('/', homeRouter)


let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server running at port ', port)
})
