const person1select = document.querySelector('#person1') //jhnselector
const person2select = document.querySelector('#person2') //janeselector
const chatHeader = document.querySelector('.chat-head')   //chatHeaderer
const chatMessages = document.querySelector('.chat-msg')  //chatmessages
const chatInputForm = document.querySelector('.chat-input')  //chatInputForm
const chatInput = document.querySelector('.chatInput') //chatInput
const clearbtn = document.querySelector('.clear-chat') //clearbuttonform

const messages = JSON.parse(localStorage.getItem('messages')) || []


var person1='person1'
var person2 ='person2'

const chatMessageElement = (message) => `
<div class="messaage ${message.sender === person1 ? 'bg-blue' : 'bg-grey'}>
<div class="message-sender">${message.text}</div>
<div class="message-timestamp">${message.time}</div>
</div>
`

window.onload =() => {
  messages.forEach(message => {
    chatMessages.innerHTML += chatMessageElement(message)
 });
}

let messaageSender = 'person1';
const updateMessageSender = (name) =>{
  messaageSender = name
  chatHeader.innerText = `${messaageSender} chatting...`
  chatInput.placeholder = `Type here, ${messaageSender}`

  if (name === 'person1') {
    person1select.classList.add('active-role')
    person2select.classList.remove('active-role')

  }
  
  if (name === 'person2') {
    person2select.classList.add('active-role')
    person1select.classList.remove('active-role')

  }
  
  chatInput.focus()

}

person1select.onclick =() => updateMessageSender(person1)
person2select.onclick = () => updateMessageSender(person2)




const sendMessage= (e) =>{
  e.preventDefault()
   
  const timestamp = new Date().toLocaleString('en-US', {hour:"numeric", minute:"numeric", hour12:true})
  const message= {
    sender: messaageSender,
    text: chatInput.value,
    timestamp,
  }
  
  messages.push(message)
  localStorage.setItem('messages' , JSON.stringify(message))

  chatMessages.innerHTML += chatMessageElement(message)
  chatInputForm.reset()
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)


clearbtn.addEventListener('click',() =>{
  localStorage.clear()
  chatMessages.innerHTML = ''
})