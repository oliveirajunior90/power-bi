const {cliente} = require('../models')

exports.create = async(req) => {
    
    const data = await cliente.create(req)
    return data;

}