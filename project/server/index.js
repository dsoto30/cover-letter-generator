require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

const { userRouter } = require("./routes/userRoutes");

app.use("/users", userRouter);

app.use("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

mongoose
    .connect(mongoString)
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch((err) => {
        console.log(err);
    });
