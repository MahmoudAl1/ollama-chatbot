const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");


chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    messageInput.value = "";

    const aiMessage = addMessage("", "ai");

    try {
        const response = await fetch("http://127.0.0.1:8000/chat/stream", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        if (!response.body) {
            throw new Error("Streaming is not supported by this response.");
        }

        const reader = response.body.getReader();

        const decoder = new TextDecoder();

        while (true) {

            const { value, done } = await reader.read();

            if (done) {
                break;
            }

            const chunk = decoder.decode(value, {
                stream: true
            });

            aiMessage.textContent += chunk;

            chatBox.scrollTop = chatBox.scrollHeight;
        }

    } catch (error) {

        console.error(error);

        aiMessage.textContent =
            "Error: Could not connect to the AI server.";
    }
});


function addMessage(text, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
        "message",
        `${sender}-message`
    );

    messageElement.textContent = text;

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;

    return messageElement;
}