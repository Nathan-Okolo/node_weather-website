const request = require('request')

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmF0aGFuLWpzIiwiYSI6ImNrcDZzdmt3bDB0cHoyd3F0djJuOHAxNWkifQ.Fd5KTnIJzrIDBTAWukjlXw&limit=1"
    request({url,json:true},(error,{body}={}) => {
        if (error){
            return callback("Unable connect to weather service. Pls check your Network connection or your code")
        }
        else if (body.features.length === 0){
            return callback("Unable to decode address Pls check the address!")
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
