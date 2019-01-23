const config = require('../config/config')
const adsSdk = require('facebook-nodejs-business-sdk');
const AdAccount = adsSdk.AdAccount;



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
  'time_range': { 'since': '2018-10-28', 'until': '2019-01-17' },
};

exports.getFacebookInsights = async() => {

  const facebook = await new AdAccount(config.FACEBOOK.ad_account_id).getInsights(fields, params)
        
  const facebookFiltered = facebook.map(result => {

      return {
          account_id : result.account_id,
          account_name : result.account_name,
          campaign_name : result.campaign_name,
          date_start : result.date_start,
          date_stop : result.date_stop,
          impressions : result.impressions,
          spend : result.send,
          adset_name: result.adset_name
      }
      
  })

  return facebookFiltered

}








