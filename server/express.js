const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");
const authRoutes=require("./routes/authRoutes")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());


app.use("/",userRoutes)
app.use("/",authRoutes)
module.exports = app;
