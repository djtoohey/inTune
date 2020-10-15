const router = require("express").Router();
const spotifyRoutes = require("./spotify");

// spotify routes
router.use("/spotify", spotifyRoutes);

module.exports = router;
