const config = require('../config/config')
const adsSdk = require('facebook-nodejs-business-sdk');
const AdAccount = adsSdk.AdAccount;
const date = require('../utils/date')
const api = adsSdk.FacebookAdsApi.init(config.FACEBOOK.access_token);

api.setDebug(false);

const fields = [
  'date_start',
  'date_stop',
  'account_id',
  'account_name',
  'campaign_name',
  'adset_name',
  'ad_name',
  'impressions',
  'spend'
];
const params = {
  'level': 'adset',
  'filtering': [],
  'breakdowns': [],
  //'time_range': { 'since': '2018-10-28', 'until': '2019-01-17' },
  //'date_preset' : 'yesterday'
};

const dateStart = date.formatDate('12/01/2019')

const endStart = date.getCurrentDate()

exports.getFacebookInsights = async(accountId, type) => {

  if(type == 'refresh')
    params.date_preset = 'yesterday'
  else
    params.time_range = {'since': dateStart, 'until': endStart }

  const facebook = await new AdAccount(accountId).getInsights(fields, params)
        
  const facebookFiltered = facebook.map(result => {

      return {
          accountId : result.account_id,
          accountName : result.account_name,
          campaignName : result.campaign_name,
          dateStart : result.date_start,
          dateStop : result.date_stop,
          impressions : result.impressions,
          spend : result.spend,
          adsetName: result.adset_name
      }
      
  })

  return facebookFiltered

}








