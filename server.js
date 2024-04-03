require("dotenv").config();
const express = require("express");
const app = express();
const feelingsRoute = require("./routes/feelings");
const activitiesRoute = require("./routes/activities");
const foodsRoute = require("./routes/foods");
const knexConfig = require('./knexfile.js');
const knex = require('knex')(knexConfig);
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(cors());


app.use("/api/feelings", feelingsRoute);
app.use("/api/activities", activitiesRoute);
app.use("/api/foods", foodsRoute);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`app running at "http://localhost:${PORT}"`);
});
