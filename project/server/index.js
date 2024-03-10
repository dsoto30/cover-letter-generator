require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3500;

app.get("/api", (req, res) => {
    res.send({ message: "Hello from Express!" });
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
