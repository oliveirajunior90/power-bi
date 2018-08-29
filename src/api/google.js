'use strict'

const config = require('../config/config')
const key = require('../config/auth.json')
const { google } = require('googleapis')


const jwt = new google.auth.JWT(key.client_email, null, key.private_key, config.GOOGLE_API_URL)

/*
jwt.authorize((err, response) => {

    google.analytics('v3').data.ga.get({
        auth: jwt,
        ids: 'ga:' + config.GA_ID,
        'start-date': '30daysAgo',
        'end-date': 'today',
        metrics: 'ga:pageviews'
      },
      (err, result) => {
        console.log(result.rows)
      }
    )
  })

  dimensions
  ga:date
  ga:campaign
  ga:source
  ga:medium

  metrics
  GA:Sessions
  
  */

  module.exports = jwt