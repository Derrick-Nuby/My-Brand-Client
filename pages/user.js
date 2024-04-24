const API_URL = 'https://derricks-brand.onrender.com';

// const API_URL = 'http://localhost:4000';

const cookie = document.cookie.split('jwt=')[1]

function testUserAuth(event) {
    event.preventDefault();

fetch(`${API_URL}/api/auth/authuser`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/json',
            }
})    
.then(response => response.json())
.then(data => {
    console.log(data);
    if(data.error) {
        console.log(data.error)
    }   else {
        console.log(data.message)
    }
})
.catch(error => {
    console.log(error);
});
};


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

document.addEventListener('DOMContentLoaded', testUserAuth);