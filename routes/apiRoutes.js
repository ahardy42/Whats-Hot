const express = require('express');
const router = express.Router();
const axios = require("axios");
const yelp = require("yelp-fusion");
require("dotenv").config();

const client = yelp.client(process.env.YELP_KEY);

router.post("/heatmap", (req, res) => {
    // route to pull in 100 nearby spots
    let {latLng, amenity} = req.body; // expecting user's lat/lng in decimal format, and a search term
    let search1 = client.search({
        term: amenity,
        latitude: latLng[0],
        longitude: latLng[1],
        radius: 5000,
        limit: 50,
        offset: 0
    });
    let search2 = client.search({
        term: amenity,
        latitude: latLng[0],
        longitude: latLng[1],
        radius: 5000,
        limit: 50,
        offset: 50
    });
    Promise.all([search1, search2]).then(response => {
        let businessArray = [];
        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].jsonBody.businesses.length; j++) {
                businessArray.push(response[i].jsonBody.businesses[j]);
            }
        }
        let pointsArray = businessArray.map(business => { // optimized for heatmap https://github.com/Leaflet/Leaflet.heat
            return {lat: business.coordinates.latitude, lng: business.coordinates.longitude};
        });
        res.json(pointsArray);
    }).catch(error => {
        res.json(error);
    });
});

router.post("/boundary", (req, res) => {
    let latLng = req.body;
    let lat = latLng[0];
    let lng = latLng[1];
    let url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}&polygon_geojson=1&zoom=10`;
    axios.get(url)
    .then(response => {
        let {city, state} = response.data.features[0].properties.address;
        let boundary = {
            name : `${city}, ${state}`,
            boundingBox : response.data.features[0].bbox,
            geoJSON : response.data.features[0].geometry
        }
        res.json(boundary);
    })
    .catch(error => {
        console.log(error);
    })
})

module.exports = router;