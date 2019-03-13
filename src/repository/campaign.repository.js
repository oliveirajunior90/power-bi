const {getFacebookInsights} = require('../api/facebook')
const {getGoogleAnalyticsInsights} = require('../api/ga')
const {getGoogleAdsInsights} = require('../api/googleads')

const {campanha, ga, gads, facebook}  = require('../models')

const SUCCESS_MESSAGE = 'Dados salvos com sucesso!' 
const ERROR_MESSAGE_ACTIVE = 'Esta conta já está ativa!'
const ERROR_MESSAGE_SAVE = 'Dados não foram salvos!'

exports.create = async(req) => await campanha.create(req)
    
exports.update = async(idCampaign, req) => {

    const objectToUpdate = {}

    //if(req.nome) objectToUpdate.nome = req.nome
    if(req.clienteId) objectToUpdate.clienteId = req.clienteId
    if(req.dataInicio) objectToUpdate.dataInicio = req.dataInicio
    if(req.dataFim) objectToUpdate.dataFim = req.dataFim
    if(req.vistaGA) objectToUpdate.vistaGA = req.vistaGA
    if(req.facebookAdAccountId) objectToUpdate.facebookAdAccountId = req.facebookAdAccountId
    if(req.gadsId) objectToUpdate.gadsId = req.gadsId
    if(req.slug) objectToUpdate.slug = req.slug

    const data = await campanha.update(objectToUpdate, {where:{id:idCampaign}})
    
    return data

}

exports.startCampaign = async(idCampaignParam) =>  {

    const campaign = await campanha.findByPk(idCampaignParam,{raw: true})

    const facebook =  await saveFacebookCampaign(idCampaignParam, campaign ,'')

    const googleAnalitycs = await saveGaCampaign(idCampaignParam, campaign ,'')

    const googleAds = await saveGoogleAdsCampaign(idCampaignParam, campaign, '')

    return {
        facebook, 
        googleAnalitycs,
        googleAds
    };
    
}

exports.delete = async(idCampaign) => await campanha.destroy({where: {id : idCampaign}, destroy: true})

exports.updateCampaigns = async() => {

    const result = await campanha.findAll({
        attributes: ['id']
    })

    result.map(res => refreshActiveInsights(res.dataValues.id))

}

const saveGaInsights = async (gaInsights, idCampaign) => {

    const insights = []
    
    gaInsights.map((res, i) => {
        insights.push({
           campanhaId : idCampaign,
           date: res[0],
           campaign: res[1],
           source: res[2],
           medium: res[3],
           sessions : res[4],
           impressions : res[5],
           keyword : res[6],
           goal1completions : res[7],
           goal2completions : res[8],
           goal3completions : res[9],
           goal4completions : res[10],
           goal5completions : res[11],
           goal6completions : res[12],
           goal7completions : res[13],
           goal8completions : res[14]
        })
    })

    const database = await ga.bulkCreate(insights, {campanhaId : idCampaign})

    campanha.update({statusGa: 1}, {where: {id:idCampaign}})

    return {message: database}

}

const saveFacebookInsights = async(facebookInsights, idCampaign) => {

    const insights = []
    
    facebookInsights.map((res, i) => {
        insights.push({
            campanhaId : idCampaign,
            accountId : res.accountId,
            accountName : res.accountName,
            campaignName : res.campaignName,
            dateStart : res.dateStart,
            dateStop : res.dateStop,
            impressions : res.impressions,
            spend : res.spend,
            adsetName : res.adsetName    
        })
    })

    const database = await facebook.bulkCreate(insights, {campanhaId : idCampaign})

    campanha.update({statusFacebook: 1}, {where: {id:idCampaign}})

    return {message: database}

}

const saveGoogleAdsInsights = async(googleAdsInsights, idCampaign) => {

    const insights = [] 

    googleAdsInsights.map((res, i) => {
        
        insights.push({

            campanhaId : idCampaign,
            date : substObject(res),
            campaignName : res.field2, 
            impressions : res.field3 , 
            clicks : res.field4, 
            cost : res.field5, 
            effectiveFinalUrl : res.field6, 
            viewViews : res.field7, 

        })

    })
    
    const database = await gads.bulkCreate(insights, {campanhaId : idCampaign})

    campanha.update({statusGads: 1}, {where: {id:idCampaign}})

    return database

}

function substObject(res) {
    for(var x in res) 
        if(x.startsWith("FINAL") == true) 
            return res[x]
    
}

const saveFacebookCampaign = async(idCampaignParam, campaign) => {

    if(campaign.facebookAdAccountId) { 

        if(campaign.statusFacebook == 1) {
            const error = {}
            error.message = ERROR_MESSAGE_ACTIVE
            return error
        } else {
            const facebookInsights = await getFacebookInsights(campaign.facebookAdAccountId, 'activate')
            const responseFacebook = await saveFacebookInsights(facebookInsights, idCampaignParam)
            if(responseFacebook){
                const success = {}
                success.message = SUCCESS_MESSAGE
                return success;
            } else {
                const error = {}
                error.message = ERROR_MESSAGE_SAVE
                return error
            }
                 
        }

    }

}

const saveGaCampaign = async(idCampaignParam, campaign, date) => {

    if(campaign.vistaGA) {

        if(campaign.statusGa == 1) {
            const error = {}
            error.message = ERROR_MESSAGE_ACTIVE
            return error
        } else {
            const gaInsights = await getGoogleAnalyticsInsights(campaign.vistaGA, 'activate')
            const responseGA = await saveGaInsights(gaInsights, idCampaignParam)
            if(responseGA) {
                const success = {}
                success.message = SUCCESS_MESSAGE
                return success
            } else {
                const error = {}
                error.message = ERROR_MESSAGE_SAVE 
                return error
            } 
                
        } 

    }

}         

const saveGoogleAdsCampaign = async(idCampaignParam, campaign) => {

    if(campaign.gadsId) {

        if(campaign.statusGads == 1) {
            const error = {}
            error.message = ERROR_MESSAGE_ACTIVE
            return error
        } else {
            const googleAdsInsights = await getGoogleAdsInsights(campaign.gadsId, 'activate')
            const responseGads = await saveGoogleAdsInsights(googleAdsInsights, idCampaignParam)
            if(responseGads) {
                const success = {}
                success.message = SUCCESS_MESSAGE 
                return success
            } else {
                const error = {}
                error.message = ERROR_MESSAGE_SAVE
                return error
            } 
                 
        }

    }
    
}


const refreshActiveInsights = async(idCampaign) => {

    const campaign = await campanha.findByPk(idCampaign,{raw: true})

    if(campaign.vistaGA && campaign.statusGa === 1) {
        const gaInsights = await getGoogleAnalyticsInsights(campaign.vistaGA, 'refresh')
        await saveGaInsights(gaInsights, idCampaign)
    }

    if(campaign.facebookAdAccountId && campaign.statusFacebook === 1) {
        const facebookInsights = await getFacebookInsights(campaign.facebookAdAccountId,'refresh')
        await saveFacebookInsights(facebookInsights, idCampaign)
    }

    if(campaign.gadsId && campaign.statusGads === 1) {
        const googleAdsInsights = await getGoogleAdsInsights(campaign.gadsId, 'refresh')
        await saveGoogleAdsInsights(googleAdsInsights, idCampaign)
    }
    
}