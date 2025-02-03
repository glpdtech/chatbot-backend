fetch('http://10.10.10.100/ask-chatgpt', {  // Use your local computer IP here
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: userInput })
})
.then(response => response.json())
.then(data => {
    let botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = data.response;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
})
.catch(error => {
    console.error('Error:', error);
    let botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = "Oops! Something went wrong.";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
});
