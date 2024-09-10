const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn"); // Get the send button element
const chatContainer = document.querySelector(".chat-container");
const loadedPage = document.querySelector(".opening-message");
const bottomHidden = document.querySelector(".bottom--hidden");

// Control buttons declaration
const lightMode = document.querySelector("#theme-btn");
const darkMode = document.querySelector("#delete-btn");
const newChat = document.getElementById("new-chat-btn");

let userText = null;

// Typing animation
const showTypingAnimation = () => {
    const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="/img/logo.png" alt="AI-img" width="50px" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay:0.2s"></div>
              <div class="typing-dot" style="--delay:0.3s"></div>
              <div class="typing-dot" style="--delay:0.4s"></div>
            </div>
          </div>
          <span class="icon icon--copy material-symbols">
            <ion-icon name="copy"></ion-icon>
          </span>
        </div>`;
    // Create an incoming chat div with typing animation and append it to chat container
    const incomingChatDiv = createElement(html, "incoming--chat");
    chatContainer.appendChild(incomingChatDiv);
}

// Show message
const createElement = (html, className) => {
    // Create a new div, apply chat, specified class, and set HTML content of the div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
}

const handleOutgoingChat = () => {
    if (loadedPage) loadedPage.style.display = "none";
    if (bottomHidden) bottomHidden.style.display = "flex";
    userText = chatInput.value.trim(); // Get chat value and remove extra spaces
    console.log(userText);
    const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="/img/uifaces-popular-image.jpg" alt="user-img" width="50px" />
            <p>${userText}</p>
          </div>`;
    const outgoingChatDiv = createElement(html, "outgoing--chat");
    chatContainer.appendChild(outgoingChatDiv);
    setTimeout(showTypingAnimation, 500);
}

// Add event listener to the send button
if (sendBtn) sendBtn.addEventListener("click", handleOutgoingChat);

if (lightMode) lightMode.addEventListener("click", () => {
    document.querySelector("body").classList.add("light-mode");
    console.log("light mode");
});

if (darkMode) darkMode.addEventListener("click", () => {
    document.querySelector("body").classList.remove("light-mode");
    console.log("dark mode");
});
