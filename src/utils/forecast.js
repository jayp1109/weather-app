request = require('request')

const forecast = (latitude,longitude,callback)=>{

    const url = 'https://api.darksky.net/forecast/926007ed131bd03370527869ccd385f0/'+ latitude+','+ longitude+'?units=si'

    request({url,json:true},(error,{body}) => {

    if(error){
        callback('Unable to connect to forcast',undefined)
    }else if(body.error){
        callback('Unable to find location',undefined)
    }else {
        callback(undefined,{
            temperature:body.currently.temperature,
            rainProbability:body.currently.precipProbability
        })
    }

    })
}

module.exports ={
    forecast:forecast
}
