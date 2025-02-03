const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.post('/ask-chatgpt', async (req, res) => {
    const userInput = req.body.prompt;
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: userInput,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        res.json({ response: data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: 'Sorry, something went wrong!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
