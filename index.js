const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const teachersRoute = require("./src/routes/teacher");

const app = express();
dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("DB Connection successful")
).catch((err) => {
    console.log(err);
});

//Middleware
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("success");
    console.log(process.env.PORT);
});

app.use("/api/teacher", teachersRoute);


app.listen(process.env.PORT, () =>
    console.log(`Server is up and running on PORT ${process.env.PORT}`)
);