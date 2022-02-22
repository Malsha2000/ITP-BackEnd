const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const teacherRoutes = require("./src/routes/Teacher");

const app = express();
dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("DB Connection successful")
).catch((err) => {
    console.log(err);
});

//Middleware
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("success");
    console.log(process.env.PORT);
});

app.use("/teacher",teacherRoutes);


app.listen(5000, () =>
    console.log(`Server is up and running on PORT 5000`)
);