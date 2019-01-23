let chai, { expect } = require('chai');
const { getGoogleAnalyticsInsights } = require('../../src/api/ga')

describe('Google Analytics', () => {

    const ga = getGoogleAnalyticsInsights()

    console.log(ga)
    
})