const path = require('path')
const express = require('express');
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Defining paths for express config
const pubDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubDir));


// Setup static dirs to serve
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Richa Shah"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Richa Shah',
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: "Richa Shah",
        message: 'This is a helper message',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: "You must provide an address."})
    }

    geocode(req.query.address, (error, {latitude, longitude, name} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {description, image}) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location: name,
                forecast: description,
                image,
                address: req.query.address,
        })
    })
})
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: "Richa Shah",
        errorMessage: "Help article not found"
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: "Richa Shah",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port:', port)
})