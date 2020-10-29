const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const PORT = process.env.PORT || 3001;
const routes = require("./routes/api/spotify");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Enabling CORS
app.use(cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");

//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
//         return res.status(200).json({});
//     }
//     next();
// });

// Define API routes here
routes(app);

// Connect to Mongo
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/spotify", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
