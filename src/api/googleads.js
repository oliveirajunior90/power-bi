const {convertCsvToJson} = require('../utils/convertCsvToJson')
const GoogleAds = require('../utils/google-ads')
const config = require('../config/config')
const moment = require('moment')

const googleAdsReport = {
    developerToken: config.GOOGLE_ADS.developerToken,
    reportAgent: config.GOOGLE_ADS.reportAgent,
    clientCustomerId: config.GOOGLE_ADS.clientCustomerId,
    client_id: config.GOOGLE_ADS.client_id,
    client_secret: config.GOOGLE_ADS.client_secret,
    refresh_token: config.GOOGLE_ADS.refresh_token,
    access_token: config.GOOGLE_ADS.access_token
};

var startDate = moment(new Date('11/01/2019')).format('YYYYDDMM')
                
var endDate = moment(new Date('10/03/2019')).format('YYYYDDMM')

exports.getGoogleAdsInsights = async(idGads, type) => {
    
    googleAdsReport.clientCustomerId = idGads

    let query = ''

    if(type == 'refresh') 
        query = 'select Date, CampaignName, Impressions, Clicks, Cost, EffectiveFinalUrl, VideoViews from FINAL_URL_REPORT during YESTERDAY'
    else 
        query = `select Date, CampaignName, Impressions, Clicks, Cost, EffectiveFinalUrl, VideoViews from FINAL_URL_REPORT during ${startDate}, ${endDate}`
    
    const data = new GoogleAds(googleAdsReport) 
    
    const response = await data.getReport('v201809', { format: 'CSV', query })

    const responseJson = convertCsvToJson(response)

    return responseJson

}
    


/*

select
	Date, CampaignName, Impressions, Clicks, Cost, EffectiveFinalUrl, VideoViews
from FINAL_URL_REPORT
during YESTERDAY

*/