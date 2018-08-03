const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(process.env.CLIENT_EMAIL)


module.exports = app
