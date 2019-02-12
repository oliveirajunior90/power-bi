const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express()

const controller = require('./controller/request.controller')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/client', controller.createClient)

app.post('/campaign', controller.createCampaign)
app.get('/campaign/start/:id', controller.startCampaign)
app.put('/campaign/:id', controller.updateCampaign)
app.delete('/campaign/:id', controller.deleteCampaign)

app.get('/ads/authentication' , controller.adsAuthentication)
app.get('/request-ga-avantare', controller.injectInsights)

module.exports = app
