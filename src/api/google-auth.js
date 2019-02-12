const config = require('../config/config')
const {google} = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_ADS.client_id,
  config.GOOGLE_ADS.client_secret,
  ''
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/adwords'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});