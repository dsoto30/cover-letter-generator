const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send({ response: "hello from server" });
});

userRouter.post("/create", userController.createUserController);

module.exports = { userRouter };
