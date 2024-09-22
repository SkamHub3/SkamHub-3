// Chat Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loading = document.getElementById('loading');

// Event listener for send button
sendBtn.addEventListener('click', sendMessage);

// Function to send the user's message
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Add user's message to chatbox
    addMessageToChat(userMessage, 'user');
    userInput.value = '';

    // Show loading spinner
    showLoading();

    // Fetch AI response
    getAIResponse(userMessage).then(botMessage => {
        hideLoading();
        addMessageToChat(botMessage, 'bot');
    });
}

async function getAccessToken() {
    // Implement your OAuth 2.0 flow here
    // For example, use Google's API client library or fetch an access token from your backend

    // Placeholder: Replace this with actual implementation to get a valid access token
    return '449036565676-3efn2ie5nc7esit4v42a5phhsm736not.apps.googleusercontent.com'; // Replace with the actual token
}


// Function to add messages to the chatbox
function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to show loading spinner
function showLoading() {
    loading.style.display = 'flex';
}

// Function to hide loading spinner
function hideLoading() {
    loading.style.display = 'none';
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessageToChat(userMessage, 'user');
    userInput.value = '';

    showLoading();

    // Get your access token (this can be from a successful OAuth flow)
    const accessToken = await getAccessToken(); // You need to implement this function

    // Fetch AI response
    getAIResponse(userMessage, accessToken).then(botMessage => {
        hideLoading();
        addMessageToChat(botMessage, 'bot');
    });
}


async function getAIResponse(userMessage, accessToken) {
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    // Include any other required parameters
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error ${response.status}:`, errorData);
                if (response.status === 429) {
                    await new Promise(res => setTimeout(res, 2000));
                    continue;
                }
                throw new Error(`Error: ${errorData.error.message}`);
            }

            const data = await response.json();
            return data.response; // Adjust based on the response structure

        } catch (error) {
            console.error('Error fetching AI response:', error);
            return 'Sorry, something went wrong. Please try again.';
        }
    }

    return 'Sorry, I cannot respond right now. Please try again later.';
}





//AIzaSyDk_H_PoQviRNMB98Z8n880JGFcZLJ6u3A

//sk-fRcUuPHJTpPF4JVXhXCK7WEALygogPw0Zee90E362fT3BlbkFJssMOSnQ57uLZQw9E5rxflI_QfHoTRdQeycrakzn1oA

//sk-5VN4vfPW-ATmasbxkrv6sM7v7UFxgiDu1eGKTPEXckT3BlbkFJwy01Pl8HMLQcwvo3jfogdwMg9bJUyOMUO5j8CWZe8A