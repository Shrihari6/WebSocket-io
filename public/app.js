const socket = io(); // Initialize Socket.IO client
const chat = document.getElementById("chat");  // Chat display area
const input = document.getElementById("input");  // Message input field
const theme = document.getElementById("theme");
const wallpaper = document.querySelector(".wallpaper");
/* Event listener for sending chat messages on Enter key press

 the need for trimming input to avoid sending empty messages

the other possibility is to disable the input field when it's empty using input event listener

*/

input.addEventListener("keydown", e => {

  if(e.key==="Enter" && input.value.trim()){
    socket.emit("chat-message", input.value);  // Send chat message to server
    input.value="";  // Clear input field after sending message
  
  }
});

socket.on("chat-message", data => {  // Listen for incoming chat messages from server
  const div=document.createElement("div");
 // Create a new div element for the received message 
 
  div.textContent=`[${getISTTime()}] user@${data.id.slice(0,5)}: ${data.message}`;  // Format received message with timestamp and sender ID 
 
  chat.appendChild(div);  // Append received message to chat display area
  chat.scrollTop=chat.scrollHeight;
});

theme.addEventListener("change",()=>{  //Love this feature :D
  wallpaper.style.backgroundImage=`url("wallpapers/${theme.value}")`;
});


function getISTTime() {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}
