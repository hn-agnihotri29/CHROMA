const socket = io()

let username;

let textarea = document.querySelector('textarea');
let area = document.querySelector(".area");


do {

   username = prompt('Please enter your name.');

} while(!username);

textarea.addEventListener('keyup',(e) => {
    if(e.key === "Enter") {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }

    ///Append////

    appendMessage(msg, 'outgoing') 
    textarea.value = ''
    scrollTobottom()

    //send to server

    socket.emit('message', msg);

}


function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type
  mainDiv.classList.add(className, 'message')

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `

  mainDiv.innerHTML = markup;

  area.appendChild(mainDiv);

}

//receive//

socket.on('message', (msg)=> {
  appendMessage(msg, 'incoming')
  scrollTobottom()
})


function scrollTobottom() {
    area.scrollTop = area.scrollHeight
}