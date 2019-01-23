exports.chunkStringInArray = (str, chunk) => {

    let i,j,temparray

    let partsOfStr = str.split(','); 

    
    for (i=0,j=partsOfStr.length; i<j; i+=chunk) {
        temparray = partsOfStr.slice(i,i+chunk);  
    }

    return temparray
}