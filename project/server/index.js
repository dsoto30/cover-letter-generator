require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { userRouter } = require("./routes/userRoutes");
app.use("/users", userRouter);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
