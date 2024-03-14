const mongoose = require("mongoose");

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
        /*
        ,
        resume: {
            type: String,
            contentType: String,
            fileId: mongoose.Schema.Types.ObjectId,
        }*/
    },
    {
        timestamps: true,
    }
);

const userProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = { userProfile };
