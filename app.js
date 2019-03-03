const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require('path')

app.use(express.static('dist'))

if (process.env.NODE_ENV === 'development') {
    console.log('Started development proxy')
    const proxy = require('proxy-middleware')
    const url = require('url')
    app.use('/dist', proxy(url.parse('http://localhost:8080/dist')))
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'))
})

app.listen(3000, () => console.log('Server "' + process.env.NODE_ENV + '" is started'))