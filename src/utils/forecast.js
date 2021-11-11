const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=af97ade80cd2bed62002ebb7c125c829&query=${lat},${lon}&units=f`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const {temperature, feelslike, weather_descriptions} = body.current
            const printStmt = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`;
            callback(undefined, printStmt)
        }
    })
};

module.exports = forecast;