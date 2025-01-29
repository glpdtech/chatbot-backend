require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbwdcUczFxQeIzhmk-_8214rFQY8tOT1aRN7r6jWH_iqq3Mvd95sewGXsM9UikjmVxNLrQ/exec";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const userQuery = req.body.message;

    try {
        // Step 1: Check predefined responses from Google Sheets
        const sheetResponse = await axios.get(`${GOOGLE_SHEETS_API}?q=${encodeURIComponent(userQuery)}`);
        
        if (sheetResponse.data !== "No predefined response") {
            return res.json({ reply: sheetResponse.data });
        }

        // Step 2: If no predefined response, send query to ChatGPT
        const chatGPTResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userQuery }],
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const gptReply = chatGPTResponse.data.choices[0].message.content;
        res.json({ reply: gptReply });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "Sorry, something went wrong." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
