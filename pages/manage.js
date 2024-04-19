const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';
const cookie = document.cookie.split('jwt=')[1]

function showAndUpdateUser(event) {
    event.preventDefault();

fetch(`${API_URL}/api/user/you`, {
    method: 'GET',
    credentials: 'include',
    headers: {
        "Authorization": `Bearer ${cookie}`
    }
})
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            showMessage(data.error)
        } else {
            const user = data.user;

            const nameElement = document.getElementById('names');
            const emailElement = document.getElementById('email');
            const phoneElement = document.getElementById('phone');
            const passwordElement = document.getElementById('password');
            const confirmPasswordElement = document.getElementById('passwordval');

            if (nameElement) {
                nameElement.value = user.name;
            }
            if (emailElement) {
                emailElement.value = user.email; // This field is read-only
            }
            if (phoneElement) {
                phoneElement.value = user.phone;
            }
            if (passwordElement && confirmPasswordElement) {
                
                passwordElement.value = 12345678
                confirmPasswordElement.value = 12345678
            }
            
            showError(data.message, '#10E956', 1000000)
            // console.log(data.user);
            //
        }
    })
    .catch(error => {
        showMessage(error)
    });
}

document.getElementById('userShowAndUpdateForm').addEventListener('submit', userUpdate);

function userUpdate(event) {
    event.preventDefault();

    const name = document.getElementById('names').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordval').value;


fetch(`${API_URL}/api/user`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie}`
    },
    body: JSON.stringify({ name, email, phone, password, confirmPassword })
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        showMessage(data.error)
    } else {
        showMessage(data.message, '#10E956')
        // console.log(data);
    }
})
}

document.getElementById('userDeleteForm').addEventListener('submit', userDelete);


function userDelete(event) {
    event.preventDefault();

    const password = document.getElementById('delPassword').value;
    const yes = document.getElementById('yes');
    const confirmation = yes.checked;

fetch(`${API_URL}/api/user`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie}`
    },
    body: JSON.stringify({ confirmation, password })
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        showMessage(data.error)
    } else {
        showMessage(data.message, '#10E956')
        console.log(data);
        userLogout();
        // setTimeout(function() {
        //     window.location.href = './create.html';
        // }, 7000);
    }
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

function showError(message, color, duration = 5000) {
    const errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = message;
    errorElement.style.display = "block";
    errorElement.style.borderColor = color;
    setTimeout(function() {
        errorElement.style.display = "none";
    }, duration);
}






document.addEventListener('DOMContentLoaded', showAndUpdateUser);