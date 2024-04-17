const userServices = require("../services/userServices");
const createUserController = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const newUser = await userServices.createUserService(email, password);

        await res.status(201).json({
            message: "User Created Successfully",
            userObject: newUser,
        });
    } catch (err) {
        await res.status(500).json({
            message: "Server Error",
            error: err.message,
        });
    }
};

const createUserWithResumeController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const fileId = req.file.id;
        const newUser = await userServices.createUserWithResumeService(
            email,
            password,
            fileId
        );

        await res.status(201).json({
            message: "User registration successful",
            user: newUser,
            file: req.file,
        });
    } catch (error) {
        await res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = { createUserController, createUserWithResumeController };
