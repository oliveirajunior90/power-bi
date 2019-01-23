const {convertCsvToJson} = require('../utils/convertCsvToJson')
const config = require('../config/config')

const AdwordsReport = require('node-adwords').AdwordsReport;

const googleAdsReport = new AdwordsReport({
    developerToken: config.GOOGLE_ADS.developerToken,
    reportAgent: config.GOOGLE_ADS.reportAgent,
    clientCustomerId: config.GOOGLE_ADS.clientCustomerId,
    client_id: config.GOOGLE_ADS.client_id,
    client_secret: config.GOOGLE_ADS.client_secret,
    refresh_token: config.GOOGLE_ADS.refresh_token,
    access_token: config.GOOGLE_ADS.access_token
});

const googleAdsParams ={
    reportName: 'Custom Adgroup Performance Report',
    reportType: 'FINAL_URL_REPORT',
    fields: ['Date', 'CampaignName', 'Impressions', 'Clicks', 'Cost', 'EffectiveFinalUrl', 'VideoViews'],
    filters: [
        { field: 'CampaignStatus', operator: 'IN', values: ['ENABLED', 'PAUSED'] }
    ],
    dateRangeType: 'CUSTOM_DATE', //defaults to CUSTOM_DATE. startDate or endDate required for CUSTOM_DATE
    startDate: new Date("05/01/2018"),
    endDate: new Date(),
    format: 'CSV' //defaults to CSV
}


exports.getGoogleAdsInsights = async() => {
    const adsReport = await googleAdsReport.getReport(
        'v201809', 
        googleAdsParams, 
        async(error, report) => {
            const resp = await convertCsvToJson(error, report)
            return resp
        }
    )
}




//client_id: '429645920680-ukd0deva5vr1ql28vt3meup3uj0mi6dj.apps.googlereportcontent.com', //this is the api console client_id
//client_secret: '3Zmw2_i4IVgIFEivzAHQsC7a'