const moment = require('moment')
const date = require('../../../src/utils/date')

describe('formatDateToFacebookAPI', () => {

    it('It shoult return date with the format 0000-00-00', () => {

        const dateStart = date.formatDateToFacebookAPI('30/01/2019')
        
        expect(dateStart).toBe('2019-01-30')

    })

})

describe('getCurrentDateTo', () => {

    it('It should return the current data with the format YYYY-MM-DD', () => {

        const currentDate = date.getCurrentDate()

        expect(currentDate).toBe('2019-03-12')

    })

})

describe(getCurrentDateToGaAPI, () => {

    it('It should return the current data with the format YYYY-MM-DD', () => {

        const currentDate = date.getCurrentDateToGa()

        expect(currentDate).toBe('')

    })

})