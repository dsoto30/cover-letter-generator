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

module.exports = { createUserController };
