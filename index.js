const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const teachersRoute = require("./src/routes/teacher");
const studentRoute = require("./src/routes/student");
const eventRoute = require("./src/routes/event");
const adminRoute = require("./src/routes/admin");

const app = express();
dotenv.config();

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection successful"))
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("success");
  console.log(process.env.PORT);
});

app.use("/api/teacher", teachersRoute);
app.use("/api/student", studentRoute);
app.use("/api/event", eventRoute);
app.use("/api/admin", adminRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server is up and running on PORT ${process.env.PORT}`)
);
