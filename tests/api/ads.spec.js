let chai, { expect } = require('chai');
let GoogleAds = require('../../src/utils/google-ads')
let config = require('../../src/config/config')

let googleAdsReport = {
    refresh_token: "1/G3sDL5g0Ph8NyEz4x_21itJZP_qRQTojAHRzFTLJoRk",
    //access_token: "ya29.GlutBoWchg0mQcEXLPbWO-jZkR5iIWFgiZyuEzcWPFZzv9AMvIfLAkIl3-5HKiRwzZiF5ccnOwwIl7ysMAFTN_goI0AQD6V64JVUKGTz0iwOCPY_ISpDqvjoXcuL",
    developerToken: config.GOOGLE_ADS.developerToken,
    clientCustomerId: config.GOOGLE_ADS.clientCustomerId,
    client_id: config.GOOGLE_ADS.client_id,
    client_secret: config.GOOGLE_ADS.client_secret,
};

let googleAdsParams ={
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

let googleAdsParams2 = {
    query: 'SELECT Criteria FROM KEYWORDS_PERFORMANCE_REPORT DURING 20170101,20170325',
    format: 'CSV'
}

describe('Google Ads', () => {

    it('Class should return a object', () => {

        const ads = new GoogleAds(googleAdsReport)
        //expect(ads).to.be.object
        
    })


    it('function getReport should return a promisse', ()=>{

        const ads = new GoogleAds(googleAdsReport)
        const report = ads.getReport('v201809', googleAdsParams)
        report
            .then(res => {
                console.log('certo')
            })
            .catch(err => {
                console.log(err)
            })
    
    })

     
})