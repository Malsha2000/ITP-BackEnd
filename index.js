const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

const app = express();
dotenv.config();

app.use(cors())

//Middleware
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("success");
    console.log(process.env.PORT);
});

app.listen(5000, () =>
    console.log(`Server is up and running on PORT 5000`)
);