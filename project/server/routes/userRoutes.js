const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const { upload } = require("../middleware/middleware");

userRouter.post("/register", userController.createUserController);

userRouter.post(
    "/create",
    upload.single("resume"),
    userController.createUserWithResumeController
);

userRouter.post(
    "/file-upload",
    upload.single("resume"),
    async (req, res, next) => {
        try {
            console.log(req.file);
            await res.status(201).json({
                message: "file upload succeded",
                file: req.file,
            });
        } catch (error) {
            await res.status(500).json({
                message: "file upload failed",
                error: error.message,
            });
        }
    }
);

module.exports = { userRouter };
