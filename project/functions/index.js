const functions = require("firebase-functions");
const express = require("express");
const { OpenAI } = require("openai");
const { config } = require("dotenv");
config();
const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.post("/getOpenAIResponse", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        if (!prompt) {
            res.status(400).send("Missing prompt");
            return;
        }
        console.log(prompt);
        const response = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful job recruiter helping job seekers to create personalized cover letters for their desired job",
                },
                { role: "user", content: prompt },
            ],
            max_tokens: 1000,
        });
        return res.status(200).send(response.choices[0].message.content);
    } catch (error) {
        console.error(error);
    }
});

exports.api = functions.https.onRequest(app);
