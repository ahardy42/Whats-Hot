const express = require('express');
const router = express.Router();
const path = require("path");
const apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);

// route for sending the index.html after any API routes
router.use( (req, res, next) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;