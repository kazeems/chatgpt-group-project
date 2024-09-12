const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn"); // Get the send button element
const chatContainer = document.querySelector(".chat-container");
const loadedPage = document.querySelector(".opening-message");

const bottomHidden = document.querySelector(".bottom--hidden");



let userText = null;

// Typing animation
const showTypingAnimation = ()=>{
    const html = `<div class="chat-content">
          <div class="chat-details">
            <img src="/img/logo.png" alt="AI-img" width="50px" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay:0.2s"></div>
              <div class="typing-dot""" style="--delay:0.3s"></div>
              <div class="typing-dot" style="--delay:0.4s"></div>
            </div>
          </div>
          <span class="icon icon--copy material-symbols"
            ><ion-icon name="copy"></ion-icon
          ></span>
        </div>`;
    // Create  an incoming chat div wwith typing animation and append it to chat container

    const incomingChatDiv = createElement(html, "incoming--chat");
    chatContainer.appendChild(incomingChatDiv);
}

// SHOW  MESSAGE
const createElement = (html, className)=>{
    // Create a ne div  and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
}

const handleOutgoingChat = () => {
    loadedPage.style.display = "none";
    bottomHidden.style.display = "flex"
    userText = chatInput.value.trim(); // Get chat value and remove extra spaces
    console.log(userText);
    const html = `<div class="chat-content">
          <div class="chat-details">
            <img
              src="/img/uifaces-popular-image.jpg"
              alt="uer-img"
              width="50px"
            />
            <p>${userText}</p>
          </div>`;
    const  outgoingChatDiv = createElement(html, "outgoing--chat")
    chatContainer.appendChild(outgoingChatDiv);
    setTimeout(showTypingAnimation, 500);
   
}

// Add event listener to the send button
sendBtn.addEventListener("click", handleOutgoingChat);



