const mongoose = require("mongoose");

const { connection } = require("../middleware/middleware");

const userProfileSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "resumes",
        },
    },
    {
        timestamps: true,
    }
);

const userProfile = connection.model("UserProfile", userProfileSchema);

module.exports = { userProfile };
