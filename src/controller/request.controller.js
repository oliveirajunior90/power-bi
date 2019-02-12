const {getGoogleAnalyticsInsights} = require('../api/ga')
const Cliente = require('../repository/client.repository')
const Campanha = require('../repository/campaign.repository') 


exports.injectInsights = async(req,res,next) => {

    try {

        const data = await getGoogleAnalyticsInsights(132904968, '')
        
        res.status(200).send(data)

    } catch (e) {

        res.status(500).send(e)

    }
    
}


exports.createClient = async(req, res, next) => {
    
    try {

        const data = await Cliente.create(req.body)

        res.status(200).send({message: 'Cliente criado com sucesso', data})

    } catch(e) {

        res.status(500).send({error: e.message})

    }

}

exports.createCampaign = async(req, res, next) => {

    try {
        
        const initDate = new Date(req.body.dataInicio)
        const endDate = new Date(req.body.dataFim)

        let data = req.body

        data.dataInicio = initDate 
        data.dataFim = endDate

        const result = await Campanha.create(data)

        res.status(200).send(result)

    } catch(e) {

        res.status(500).send({error: e.message})

    }

}   

exports.updateCampaign = async(req,res,next) => {

    try {

        const data = await Campanha.update(req.params.id, req.body)

        res.status(200).send(data)

    } catch(e) {

        res.status(500).send({error: e.message})

    }

}

exports.deleteCampaign = async(req,res,next) => {

    try {

        const data = await Campanha.delete(req.params.id)

        res.status(200).send(data)

    } catch(e) {

        res.status(500).send({error: e.message})

    }

}

exports.startCampaign = async(req, res, next) => {

    try {

        const result = await Campanha.startCampaign(req.params.id)

        res.status(200).send(result)

    } catch(e) {

        res.status(500).send({error: e.message})

    }

}

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

