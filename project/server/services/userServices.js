const { userProfile } = require("../models/userModel");

async function createUserService(email, password) {
    const newUserProfile = new userProfile({
        email: email,
        password: password,
    });

    const newUser = await newUserProfile.save();
    return newUser;
}

async function createUserWithResumeService(email, password, fileId) {
    const newUserProfile = new userProfile({
        email: email,
        password: password,
        resume: fileId,
    });

    const createdUser = await newUserProfile.save();
    return createdUser;
}

module.exports = { createUserService, createUserWithResumeService };
