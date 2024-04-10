require("dotenv").config()
const mongodbconnect = require("./db");
const express = require('express');
const cors = require('cors');
const path = require("path");


mongodbconnect();
const app = express()
 
const port = 5000

app.use(cors());
app.use(express.json());
//Available Routes
app.use("/api/auth",require(path.join(__dirname,"routes/auth.js")))
app.use("/api/notes",require(path.join(__dirname,"routes/notes.js")))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})