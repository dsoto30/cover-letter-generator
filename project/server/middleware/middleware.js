require("dotenv").config();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

const mongoURI = process.env.DATABASE_URL;
console.log(mongoURI);

let gfs;

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

connectToMongo();

mongoose.connection.on("connected", () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connections[0].db, {
        bucketName: "resumes",
    });
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    console.error("Error generating random bytes:", err);
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                console.log("Uploading file:", filename);
                const fileInfo = {
                    filename: filename,
                    bucketName: "resumes",
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

module.exports = { upload };
