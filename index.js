const config = require('config')
const courses = require('./routes/courses')
const home = require('./routes/home')
const debug = require('debug')('app:startup')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
// const Joi = require('joi')
const { urlencoded } = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.set('views', './views')


app.use(express.json()) 
//https://stackoverflow.com/a/67393195/9269320  (explanation of urlencoded; 
//used for parsing body from html form elements)
app.use(urlencoded({ extended: true }))
//used for security
app.use(helmet())
app.use('/api/courses', courses)
app.use('/',home)

console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))

//export NODE_ENV=development
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enabled...') //export DEBUG=app:startup
}

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
// }



    // export PORT = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
