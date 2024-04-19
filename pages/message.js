const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';


document.getElementById('contactform').addEventListener('submit', sendMessage);



function sendMessage(event) {
    event.preventDefault();
    
    const form = event.target;
    const names = document.getElementById('names').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('ctitle').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;



fetch(`${API_URL}/api/message`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ names, email, subject, phone, message })
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        showMessage(data.error);
    } else {
        showMessage(data.message, '#10E956', 10000)
        form.reset();
    }
})
.catch(error => {
    showMessage(error.message)
})
}























function showMessage(message, color, duration = 5000) {
    const msgbox = document.getElementById('msgbox');
    const messageParagraph = msgbox.querySelector('p');
    
    msgbox.style.display = 'block';
    msgbox.style.right = '-100%';
    msgbox.style.animation = 'none';
    msgbox.style.backgroundColor = 'rgb(145, 0, 0)';

    messageParagraph.textContent = message;
    msgbox.style.backgroundColor = color;

    msgbox.offsetHeight;
    msgbox.style.animation = 'slideInFromRight 1s ease-in-out forwards';

    setTimeout(function() {
        msgbox.style.display = 'block';
        msgbox.style.animation = 'slideOutToRight 3s ease-in-out 0s forwards';
    }, duration);
        
}