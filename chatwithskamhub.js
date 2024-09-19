document.getElementById('sendBtn').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const customInfo = "You are an AI assistant named SkamHub, designed to help users with general questions."; // You can modify this
    if (!userInput) return;

    displayMessage(userInput, 'user');
    toggleLoading(true); // Show loading bar

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer AIzaSyA2G212i9qWwxQUR6K5ZvEHT3gszSGgTHE` // Replace with your actual API key
            },
            body: JSON.stringify({
                prompt: {
                    text: `You are an AI assistant named SkamHub. User's input: ${userInput}`
                },
                temperature: 0.7,
                candidate_count: 1,
                max_tokens: 300
            })
        });
        

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const botResponse = data.candidates[0].output;

        displayMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    } finally {
        toggleLoading(false); // Hide loading bar
        document.getElementById('userInput').value = '';
    }
}

function displayMessage(text, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    messageElement.innerText = text;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function toggleLoading(isLoading) {
    const progressBar = document.getElementById('loadingBar');
    if (isLoading) {
        progressBar.style.display = 'block'; // Show the loading bar
        let width = 0;
        const loadingInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(loadingInterval); // Stop the loading bar once it fills up
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 100); // Adjust the speed of the loading bar
    } else {
        progressBar.style.display = 'none'; // Hide the loading bar
    }
}







const { GoogleAuth } = require('google-auth-library');
const fetch = require('node-fetch');

const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

async function getAccessToken() {
    const client = await auth.getClient();
    return await client.getAccessToken();
}

async function sendMessage(userInput) {
    const accessToken = await getAccessToken();

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            prompt: {
                text: `You are an AI assistant named SkamHub. User's input: ${userInput}`
            },
            temperature: 0.7,
            candidate_count: 1,
            max_tokens: 300,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].output;
}

