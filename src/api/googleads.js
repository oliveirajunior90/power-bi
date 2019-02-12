const {convertCsvToJson} = require('../utils/convertCsvToJson')
const GoogleAds = require('../utils/google-ads')
const config = require('../config/config')

const googleAdsReport = {
    developerToken: config.GOOGLE_ADS.developerToken,
    reportAgent: config.GOOGLE_ADS.reportAgent,
    clientCustomerId: config.GOOGLE_ADS.clientCustomerId,
    client_id: config.GOOGLE_ADS.client_id,
    client_secret: config.GOOGLE_ADS.client_secret,
    refresh_token: config.GOOGLE_ADS.refresh_token,
    access_token: config.GOOGLE_ADS.access_token
};

const googleAdsParams ={
    reportName: 'Custom Adgroup Performance Report',
    reportType: 'FINAL_URL_REPORT',
    fields: ['Date', 'CampaignName', 'Impressions', 'Clicks', 'Cost', 'EffectiveFinalUrl', 'VideoViews'],
    filters: [
        { field: 'CampaignStatus', operator: 'IN', values: ['ENABLED', 'PAUSED'] }
    ],
    dateRangeType: 'CUSTOM_DATE', //defaults to CUSTOM_DATE. startDate or endDate required for CUSTOM_DATE
    startDate: new Date("10/12/2018"),
    endDate: new Date(),
    format: 'CSV' //defaults to CSV
}


exports.getGoogleAdsInsights = async(idGads) => {
    
    googleAdsReport.clientCustomerId = idGads
    
    const data = new GoogleAds(googleAdsReport) 
    
    const response = await data.getReport('v201809', googleAdsParams)
    const responseJson = convertCsvToJson(response)

    return responseJson

}
    


