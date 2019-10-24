const service = require('../services');

module.exports = async (req, res, next) => {
    let { latLng, amenity } = req.body; // expecting user's lat/lng in decimal format, and a search term

    // send the contents of req.body to the service
    try {
        const pointsArray = await service.combineSearch(latLng, amenity, 2);
        res.json(pointsArray);
    } catch (e) {
        next(e);
    }

}