const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=af97ade80cd2bed62002ebb7c125c829&query=${lat},${lon}`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const {temperature, feelslike, weather_descriptions, wind_speed, weather_icons} = body.current
            const printStmt = {
                description: `${weather_descriptions[0]}, with a wind speed of ${wind_speed}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`,
                image: weather_icons[0]
            }
            callback(undefined, printStmt)
        }
    })
};

module.exports = forecast;