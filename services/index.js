const axios = require('axios');
const yelp = require('yelp-fusion');
require('dotenv').config();

const client = yelp.client(process.env.YELP_KEY);

module.exports = {
    yelpSearch: function (latLng, amenity, index) {
        return client.search({
            term: amenity,
            latitude: latLng[0],
            longitude: latLng[1],
            radius: 5000,
            limit: 50,
            offset: index * 50
        });
    },
    combineSearch: async function (latLng, amenity, numSearches) {
        let searchArray = [];
        for (let i = 0; i < numSearches; i++) {
            searchArray.push(this.yelpSearch(latLng, amenity, i));
        }

        // run the searches and return an array
        let response = await Promise.all(searchArray);
        let businessArray = [];
        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].jsonBody.businesses.length; j++) {
                businessArray.push(response[i].jsonBody.businesses[j]);
            }
        }
        let pointsArray = businessArray.map(business => { // optimized for heatmap https://github.com/Leaflet/Leaflet.heat
            return {lat: business.coordinates.latitude, lng: business.coordinates.longitude};
        });

        return pointsArray;
    },
    returnBoundary: async function (lat, lng) {
        let url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}&polygon_geojson=1&zoom=10`;
        
        let response = await axios.get(url);
        let {city, state} = response.data.features[0].properties.address;
        let boundary = {
            name : `${city}, ${state}`,
            boundingBox : response.data.features[0].bbox,
            geoJSON : response.data.features[0].geometry
        }

        return boundary;

    }
}