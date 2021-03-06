//express modules & objects
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

if(!process.env.PORT){
	require('dotenv').config();
}

//Db
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rotten-potatoes", {useNewUrlParser: true});
 
//Routers
const home = require("./controllers/home");
const reviews = require("./controllers/reviews");
const comments = require("./controllers/comments");
const movies = require("./controllers/movies");

//handlebar setup
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");

//Middleware and route configuration
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use('/', movies);
app.use('/movies/:movieId/reviews', reviews);
app.use('/reviews/comments', comments);

//Server start
app.listen(process.env.PORT || 3000, () => {
	console.log("App listening on port 3000");
});

module.exports = app;
