const express = require("express");
const router = express.Router();
require("dotenv").config();

// OpenAI configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res, next) => {
    const { name, jobTitle, company, jobDesc } = req.body;

    const API_KEY = process.env.OPENAI_API_KEY;

    const completionData = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are a cover letter generator that recieves a candidate name, company, job title, and job post description
                     and generates a cover letter for that job post.`,
            },
            {
                role: "user",
                content: `Candidate name: ${name}. Job Title: ${jobTitle}
                     Company: ${company}. Job post description: "${jobDesc}"`,
            },
        ],
        temperature: 0.8,
    });
    const coverLetter = completionData.data.choices[0].message.content;
    res.send({
        coverLetter,
    });
});

module.exports = router;
