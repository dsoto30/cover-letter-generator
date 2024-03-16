const { userProfile } = require("../models/userModel");

async function createUserService(email, password) {
    const newUserProfile = new userProfile({
        email: email,
        password: password,
    });

    await newUserProfile.save();
    return newUserProfile;
}

module.exports = { createUserService };
