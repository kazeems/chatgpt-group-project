// const apiKey = 'sk-AkIyLc-s4neHWRTTCYyQH1wY8E2iB4ZwD_lnxYPRNfT3BlbkFJSlAbBab65XcK67MYSC02p7F-HXl6jDJebxFpkXFjUA';

// const apiKey = 'AIzaSyB4pZS8vXc1I7oeoZ3T9K_zx2v6TxZ9tBA'
// const submitButton = document.getElementById('submit')
// const output = document.getElementById('output')
// const input = document.querySelector('input')
// const history = document.getElementById('history')
// const newChat = document.getElementById('new-text')

// Function for changing input value 
// function changeInput(value){
//   const input = document.getElementById('input')
//   input.value = value
// }


//   try{
//     const response = await fetch(messageUrl, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},

//       body: JSON.stringify({
//         contents: [{
//           role: 'user',
//           parts: [[ input.value]]
//         }]
        
//       })
     
//     })

//     const data =  await response.json();
//     console.log(data)

//   }catch (error){
//     console.log(error)

//   }
// }

// Api call for getting message and response
// async function getMessage() {
//   const chatUrl = `https://api.openai.com/v1/chat/completions`;
//   const options = {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: input.value }],
//       max_tokens: 100
//     })
//   };

//   console.log('clicked');
//   try {
//     const response = await fetch(chatUrl, options);


//     // Display a message if there are too many request

//     if (response.status === 429) {
//       console.log('Too many requests - please try again later.');
//       output.textContent = 'Too many requests - please try again later.';
//       return;
//     }

//     const data = await response.json(); 
//     output.textContent = data.choices[0].message.content;

//     if (data.choices[0].message.content && input.value) {
//       const pElement = document.createElement('p');
//       pElement.textContent = input.value;
//       pElement.addEventListener('click', () => changeInput(pElement.textContent));  
//       history.appendChild(pElement);
//     }
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


// submitButton.addEventListener('click', getMessage)

// function clearInput (){
//   input.value = ''
// }

// newChat.addEventListener('click', clearInput)

// const chatUrl = 'https://api.openai.com/v1/chat/completions';  // Remove the extra space

// Make a POST request with the API key in the headers
// fetch(chatUrl, {
//   method: 'POST',
//   headers: {
//     'Authorization': `Bearer ${key}`,  // API key goes in the Authorization header
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     model: "gpt-4",  // or "gpt-3.5-turbo"
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: "Hello, how are you?" }
//     ]
//   })
// })
// .then((response) => {
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// })
// .then((data) => {
//   console.log(data);  // Handle your response data here
// })
// .catch((error) => {
//   console.error('Error:', error);  // Handle any errors here
// });


const apiKey = 'AIzaSyB4pZS8vXc1I7oeoZ3T9K_zx2v6TxZ9tBA';
const submitButton = document.getElementById('submit');
const output = document.getElementById('output');
const input = document.querySelector('input');

// Gemini API request
const getMessage = async () => {

  const message_Url = ` https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`
  try {
    const response = await fetch(message_Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{text: input.value}]
      }]
       
      })
    });

   

    const data = await response.json();
    const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response available";
    console.log(apiResponse);

    // Displaying the response in the output
    output.textContent = apiResponse;

  } catch (error) {
    console.error('Error:', error);
    output.textContent = `Error: ${error.message}`;
  }
};

// Trigger getMessage when submit button is clicked
submitButton.addEventListener('click', getMessage);

