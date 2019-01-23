const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express()

const controller = require('./controller/request.controller')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/request-ga-avantare', controller.gaController)

module.exports = app
