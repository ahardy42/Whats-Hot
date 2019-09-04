const express = require('express');
const router = express.Router();
const axios = require("axios");
const yelp = require("yelp-fusion");
require("dotenv").config();

const client = yelp.client(process.env.YELP_KEY);

router.post("/heatmap", (req, res) => {
    // route to pull in 100 nearby spots
    let {latLng, amenity} = req.body; // expecting user's lat/lng in decimal format, and a search term
    client.search({
        term: amenity,
        latitude: latLng[0],
        longitude: latLng[1],
        radius: 1000,
        limit: 50,
        offset: 0
    }).then(response => {
        let {businesses} = response.jsonBody;
        let pointsArray = businesses.map(business => { // optimized for heatmap https://github.com/Leaflet/Leaflet.heat
            return {lat: business.coordinates.latitude, lng: business.coordinates.longitude};
        });
        res.json(pointsArray);
    }).catch(error => {
        res.json(error);
    });
})

module.exports = router;