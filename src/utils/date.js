const moment = require('moment')


exports.getYesterday = () => {
    var today = new Date();
    var dd = today.getDate() - 1;
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    var today = dd + '/' + mm + '/' + yyyy;

    return today;
}

exports.formatDate = (dateString) => {

    let date = dateString.split('/')
    return date[2]+'-'+date[1]+'-'+date[0]

}

exports.getCurrentDate = (dateString) => {

    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    return `${yyyy}-${mm}-${dd}`

}
