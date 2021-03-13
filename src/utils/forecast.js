const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&&appid=ff79a34aa446aab4481d56dce0cd007d&units=metric'

    // request({url, json:true},(error, response)=>{
    request({url, json:true},(error, { body })=>{
        if(error){
            callback("Unable to connect...", undefined)
        //}else if(response.body.message){
        }else if(body.message){
            callback('Invalid Location Provided..', undefined)
        }else{
            const w_data = body.main
            
            callback(undefined, {
                temprature : w_data.temp,
                weather : body.weather[0].description,
                name : body.name
            })
        }
    })
}

module.exports = forecast