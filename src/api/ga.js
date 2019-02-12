
const config = require('../config/config')
const key = require('../config/auth.json')
const { google } = require('googleapis')

exports.getGoogleAnalyticsInsights = async(gaId, startDate = '30daysAgo') => {

  const metrics = [
    'ga:sessions, ga:impressions, ga:goal1completions, ga:goal2completions, ga:goal3completions, ga:goal4completions, ga:goal5completions, ga:goal6completions, ga:goal7completions, ga:goal8completions',
    'ga:goal9completions, ga:goal10completions, ga:goal11completions, ga:goal12completions, ga:goal13completions, ga:goal14completions, ga:goal15completions, ga:goal16completions, ga:goal17completions, ga:goal18completions',
    'ga:goal19completions, ga:goal20completions'
  ]

  const jwt = new google.auth.JWT(key.client_email, null, key.private_key, config.GOOGLE_API_URL)
        
  const queryParams = await google.analytics('v3').data.ga.get({
      auth: jwt,
      ids: 'ga:' + gaId,
      'start-date': startDate,
      'end-date': 'today',
      metrics,
      dimensions: 'ga:date, ga:campaign, ga:source, ga:medium'
  })

  return queryParams.data.rows

} 



  
    
