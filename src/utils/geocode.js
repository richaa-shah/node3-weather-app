const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmljaGFzaGFoOTkiLCJhIjoiY2t2bDNqbDl1OTJrbjJuczd6a2JncTlyNyJ9.8bgRKRIAkyV1e1Z5rnnxeg&limit=1`;
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location, please try a new search.", undefined)
        } else {
            const { center, place_name} = body.features[0];
            const latitude = center[1];
            const longitude = center[0];
            callback(undefined, {
                latitude,
                longitude,
                name: place_name
            })
        }
    })
}

module.exports = geocode;