const service = require('../services');

module.exports = async (req, res, next) => {
    let latLng = req.body;
    let lat = latLng[0];
    let lng = latLng[1];

    // send the contents of req.body to the service
    try {
        const boundary = await service.returnBoundary(lat, lng);
        res.json(boundary);
    } catch(e) {
        next(e);
    }
}