const person1select = document.querySelector('#person1'); // john selector
const person2select = document.querySelector('#person2'); // jane selector
const chatHeader = document.querySelector('.chat-head'); // chat header
const chatMessages = document.querySelector('.chat-msg'); // chat messages
const chatInputForm = document.querySelector('.chat-input'); // chat input form
const chatInput = document.querySelector('.chatInput'); // chat input
const clearbtn = document.querySelector('.clear-chat'); // clear button form


let messages = JSON.parse(localStorage.getItem('messages')) || [];



const person1 = 'Anonymous';
const person2 = 'Tavashi';

const chatMessageElement = (message) => `

  <div class="message ${message.sender === person1 ? 'bg-blue' : 'bg-grey'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>



  `;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += chatMessageElement(message);
  });
};

let messageSender = person1;
const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  
  chatInput.placeholder = `Type here, ${messageSender}`;

  if (name === person1) {
    person1select.classList.add('active-role');
    person2select.classList.remove('active-role');
  }

  if (name === person2) {
    person2select.classList.add('active-role');
    person1select.classList.remove('active-role');
  }

  chatInput.focus();
};

person1select.onclick = () => updateMessageSender(person1);
person2select.onclick = () => updateMessageSender(person2);

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };
  

  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  chatMessages.innerHTML += chatMessageElement(message);
  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearbtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
