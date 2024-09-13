const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn"); // Get the send button element
const chatContainer = document.querySelector(".chat-container");
const themeBtn = document.getElementById("theme-btn");
const deleteBtn = document.getElementById("delete-btn");

let userText = null;

// API configuration
const API_KEY = "AIzaSyDZJUoNINS22HkakzYHDwkqfEmVJQGn9NE"; // Your API key here

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

// SHOW  MESSAGE
const createElement = (html, className) => {
  // Create a new div  and apply chat, specified class and set html content of div
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

// getChatResponse Function Here

const getChatResponse = async (incomingChatDiv) => {
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  const pElement = document.createElement("p");

  // Define the properties and data for the API request
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ 
          role: "user", 
          parts: [{ text: userText }] 
        }] 
      }),
  };

  try {
      // Fetch response from the API
      const response = await fetch(API_URL, requestOptions);
      
      // Check if response is okay
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Update the paragraph element with the response text
      pElement.textContent = data?.candidates[0]?.content?.parts[0]?.text.replace(/\*\*(.*?)\*\*/g, '$1') || "No response from API.";
  } catch (error) {
      // Handle errors and update UI
      pElement.classList.add("error");
      pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
      console.error("Error fetching chat response:", error);
  }

  // Remove the typing animation, append the paragraph element and save the chats to local storage
  incomingChatDiv.querySelector(".typing-animation").remove();
  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);

  // Update chat history in local storage
  localStorage.setItem("all-chats", chatContainer.innerHTML);
  
  // Scroll to the bottom of the chat container
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};


//COPY RESPONSE FUNCTION
const copyResponse = (copyBtn) => {
  // Copy the text content of the response to the clipboard
  const responseTextElement = copyBtn.parentElement.querySelector("p");
  navigator.clipboard.writeText(responseTextElement.textContent);
  // Change the icon to indicate success
  const icon = copyBtn.querySelector("ion-icon");
  icon.setAttribute("name", "check"); // Change to check icon to indicate success
  // After 1 second, revert the icon to the original "copy"
  setTimeout(() => icon.setAttribute("name", "copy"), 1000);
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
          <span onclick="copyResponse(this)" class="icon icon--copy material-symbols"
            ><ion-icon name="copy"></ion-icon
          ></span>
        </div>`;
  // Create  an incoming chat div with typing animation and append it to chat container

  const incomingChatDiv = createElement(html, "incoming--chat");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(incomingChatDiv);
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); // Get chat value and remove extra spaces
  console.log(userText);

  // Clear the input field
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
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  chatInput.style.height = `${initialHeight}px`;
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

const initialHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If the Enter key is pressed without Shift and the window width is larger
  // than 800 pixels, handle the outgoing chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

//call loadData function
loadDataFromLocalStorage();

// Add event listener to the send button
sendBtn.addEventListener("click", handleOutgoingChat);
