const {getGoogleAnalyticsInsights} = require('../api/ga')

exports.gaController = async(req, res, next) => {

    try {
        
        const ga = await getGoogleAnalyticsInsights()

        //const googleAds = await getGoogleAdsInsights()

        //const facebook = await getFacebookInsights()

        res.status(200).send(ga)
        
    } catch (e) {    

        res.status(500).send({error: e.message})

    }
    
}

