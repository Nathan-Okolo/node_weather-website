const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    url ='http://api.weatherstack.com/current?access_key=0362ff525118cc0a52c0b7bebe5427ca&query='+ encodeURIComponent(latitude) +','+encodeURIComponent(longitude) 
    request({url,json:true}, (error,{body}={}) =>{
        if (error){
            return callback("Unable to connect to weather service. check code or your network connection")
        }
        else if( body.error){
            return callback( body.error.info)
        }
        else{
            callback(undefined,"It is currently " +  body.current.temperature + " degrees out. It feels like " +  body.current.feelslike + " degrees out and the humidity is " + body.current.humidity + "% with a wind direction of " + body.current.wind_dir + " is it day light? at "+ body.location.region +": "+body.current.is_day)
        }
    })
}
module.exports = forecast