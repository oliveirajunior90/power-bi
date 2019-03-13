var rp = require('request-promise');
const AdwordsReportBuilder = require('node-adwords/adwords/report-builder')
const {OAuth2Client} = require('google-auth-library');

class GoogleAds {

    constructor(credentials) {
        
        this.credentials = credentials;

        this.oauth2Client = new OAuth2Client(this.credentials.client_id, this.credentials.client_secret, '');
    }

    async getReport(version, report) {
        
        return rp({
            method: 'POST',
            uri: 'https://adwords.google.com/api/adwords/reportdownload/' + version,
            form: this.buildReportBody(report),
            headers : await this.getHeaders()
        })
        
    }

    getAccessToken() {

        if (this.credentials.access_token) return this.credentials.access_token

        const refreshToken = this.refreshAccessToken(this.credentials.refresh_token)

        return refreshToken
    }

    refreshAccessToken(refreshToken) {

        this.oauth2Client.setCredentials({
            refresh_token: refreshToken
        });

        return this.oauth2Client.getRequestHeaders(this.credentials.refresh_token)

    }

    async getHeaders(additionalHeaders = null) {   

        const accessToken = await this.getAccessToken()
        
        const headers = {
            Authorization: accessToken.Authorization,
            developerToken: this.credentials.developerToken,
            clientCustomerId: this.credentials.clientCustomerId,
            'content-type': 'application/x-www-form-urlencoded'
        };

        return headers
    }

    buildReportBody(report) {
        var b = new AdwordsReportBuilder();
        var form;
        if (report.query) {
            form = {
                '__rdquery': report.query,
                '__fmt': report.format || 'CSV'
            };
        } else {
            form = {
                '__rdxml': b.buildReport(report)
            }
        }

        return form;
    }

}

module.exports = GoogleAds






