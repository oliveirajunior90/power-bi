const jwt = require('../api/google')
const { google } = require('googleapis')
const config = require('../config/config')
const key = require('../config/auth.json')

exports.gaController = async(req, res, next) => {

    try {
        const token = await jwt.authorize()
        
        const queryParams = await google.analytics('v3').data.ga.get({
              auth: jwt,
              ids: 'ga:' + config.GA_ID,
              'start-date': '30daysAgo',
              'end-date': 'today',
              metrics: 'ga:sessions, ga:impressions',
              dimensions: 'ga:date, ga:campaign, ga:source, ga:medium'
        })
        
        res.status(200).send({ data : queryParams.data.rows })
        
    } catch (e) {
        res.status(500).send(e)
    }
    
}

