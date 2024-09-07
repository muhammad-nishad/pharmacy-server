const express = require("express");

const cors = require("cors");

require("dotenv").config();

const morgan=require('morgan')

const connectDB = require("./config/db");

const app = express();

const routes = require("./routes");

app.use(cors());

app.use(express.json());

app.use(morgan('dev'))

connectDB();

//  routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
