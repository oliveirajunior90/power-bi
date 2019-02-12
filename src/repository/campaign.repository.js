const {getFacebookInsights} = require('../api/facebook')
const {getGoogleAnalyticsInsights} = require('../api/ga')
const {getGoogleAdsInsights} = require('../api/googleads')

const {campanha, ga, gads, facebook}  = require('../models')

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

exports.startCampaign = async(idCampaign) =>  {

    const campaign = await campanha.findByPk(idCampaign,{raw: true})

    if(campaign.status == true)
        return {message : "Esta conta já está ativa!"}

    if(campaign.facebookAdAccountId) { 
        const facebookInsights = await getFacebookInsights(campaign.facebookAdAccountId)
        await await saveFacebookInsights(facebookInsights, idCampaign)
    }

    if(campaign.vistaGA) {
        const gaInsights = await getGoogleAnalyticsInsights(campaign.vistaGA)
        await saveGaInsights(gaInsights, idCampaign)
    }

    if(campaign.gadsId) {
        const googleAdsInsights = await getGoogleAdsInsights(campaign.gadsId)
        await saveGoogleAdsInsights(googleAdsInsights, idCampaign)
    }

    await campanha.update({status: 1}, {where: {id:idCampaign}})

}

exports.delete = async(idCampaign) => await campanha.destroy({where: {id : idCampaign}, destroy: true})

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

    return database

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

    return database

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

    return {message: database}

}

function substObject(res) {
    for(var x in res) 
        if(x.startsWith("Custom") == true) 
            return res[x]
    
}