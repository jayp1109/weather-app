const request = require('request')


const geocode =  (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF5YXJhbXB1dnZ1bGEiLCJhIjoiY2p4cnY1a2xyMGNoYTNocXF3Z3RjNWd3NSJ9.BUQ92bnInSlQkNtgUrbzrQ'
    request({url,json:true},(error,{body})=>{

        if(error){
            callback('unable to connect to locations services',undefined)
        }else if(body.features.length === 0){

            callback('unable to find location.',undefined)
        }else{
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    location:body.features[0].place_name
                })
        }
    })
}

module.exports = {
    geocode:geocode
}

