const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require('path')

app.use('/dist', express.static('dist'))

if (process.env.NODE_ENV === 'production') {
    app.use(function(req, res, next) {
        if (req.secure) {
            next()
        } else {
            res.redirect(301, 'https://' + req.headers.host + req.url)
        }
    })
}

app.all('*', (req, res, next) => {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url)
    } else {
        next()
    }
})

if (process.env.NODE_ENV === 'development') {
    console.log('Started "'+ process.env.NODE_ENV + '" proxy')
    const proxy = require('proxy-middleware')
    const url = require('url')
    app.use('/dist', proxy(url.parse('http://localhost:8080/dist')))
}

app.get('/', (req, res) => {
    res.redirect('/booking/')
})

app.get('/booking/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log('Server "' + process.env.NODE_ENV + '" is started')
})