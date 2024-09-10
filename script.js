const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn"); // Get the send button element
const chatContainer = document.querySelector(".chat-container");
const themeBtn = document.getElementById("theme-btn");
const deleteBtn = document.getElementById("delete-btn");

let userText = null;

//TODO: DECLARE API KEY HERE

let loadDataFromLocalStorage = () => {
  // Load and apply the saved theme from local storage
  const savedTheme = localStorage.getItem("themeColor");
  const isLightMode = savedTheme === "light_mode";

  // Toggle the body class based on saved theme
  document.body.classList.toggle("light-mode", isLightMode);

  // Update the theme button icon based on the current mode
  themeBtn.innerHTML = isLightMode
    ? '<ion-icon name="moon"></ion-icon>' // Moon icon for light mode
    : '<ion-icon name="sunny"></ion-icon>'; // Sun icon for dark mode


  let defaultText = `
      <div class="opening-message">
        <p class="typewriter">Hello Buddy! <br />What can I help you with?</p>

        <div class="typing--container loaded-page">
          <div class="typing-content">
            <div class="typing-textarea">
              <textarea
                name="textarea"
                id="chat-input"
                placeholder="Enter a prompt here"
                required
              ></textarea>
              <span class="icon icon--send material-symbols" id="send-btn"
                ><ion-icon name="send"></ion-icon
              ></span>
            </div>
          </div>
        </div>
      `;

  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
};

// Typing animation
const showTypingAnimation = () => {
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
  // Create  an incoming chat div with typing animation and append it to chat container

  const incomingChatDiv = createElement(html, "incoming--chat");
  chatContainer.appendChild(incomingChatDiv);
};

// SHOW  MESSAGE
const createElement = (html, className) => {
  // Create a ne div  and apply chat, specified class and set html content of div
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

//TODO: DO GETCHATRESPONSE FUNCTION HERE

//TODO: DO COPYRESPONSE FUNCTION HERE

const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); // Get chat value and remove extra spaces
  console.log(userText);

  // Clear the input field TODO: DO RESET HEIGHT LATER
  chatInput.value = "";

  const html = `<div class="chat-content">
          <div class="chat-details">
            <img
              src="/img/uifaces-popular-image.jpg"
              alt="uer-img"
              width="50px"
            />
            <p>${userText}</p>
          </div>`;
  // Create an outgoing chat div with user's message and append it to chat container
  const outgoingChatDiv = createElement(html, "outgoing--chat");
  chatContainer.querySelector(".opening-message")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};

deleteBtn.addEventListener("click", () => {
  //Remove the chats from local storage and call loadDataFromLocalStorage function
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalStorage();
  }
});

themeBtn.addEventListener("click", () => {
  // Toggle the HTML body class for the theme mode
  const isLightMode = document.body.classList.toggle("light-mode");

  // Update the icon based on the current mode
  themeBtn.innerHTML = isLightMode
    ? '<ion-icon name="moon"></ion-icon>' // Moon icon for light mode
    : '<ion-icon name="sunny"></ion-icon>'; // Sun icon for dark mode
  
  // Save the current theme to local storage
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
});

//TODO: DO ADJUST INPUT FIELD DYNAMICALLY


//call loadData function
loadDataFromLocalStorage();

// Add event listener to the send button
sendBtn.addEventListener("click", handleOutgoingChat);
