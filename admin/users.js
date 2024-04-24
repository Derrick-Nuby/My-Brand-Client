const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';
const cookie = document.cookie.split('jwt=')[1]


function fetchUsers() {
fetch(`${API_URL}/api/user/all`, {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${cookie}`
    }
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        showMessage(data.error)
    } else {
        populateUsers(data.users);
        // console.log(data.comments);
    }
})
.catch(error => {
    console.log(error);
});

}

function populateUsers(users) {
    const usersContainer = document.querySelector('.realcomments');

    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('comment');
    
        const userHeader = document.createElement('div');
        userHeader.classList.add('cmnthd', 'code', 'scolor');
    
        // const headerP = document.createElement('p');
        // headerP.textContent = `${user.name}`;
        // userHeader.appendChild(headerP);
    
        const optionsP = document.createElement('p');
        const deleteSpan = document.createElement('span');
        deleteSpan.id = 'deleteUser';
        deleteSpan.textContent = 'Delete';
        deleteSpan.setAttribute('data-id', user._id);
        optionsP.appendChild(deleteSpan);
        userHeader.appendChild(optionsP);
        userElement.appendChild(userHeader);
    
        const userName = document.createElement('p');
        userName.textContent = `Name: ${user.name}`;
        userElement.appendChild(userName);

        const userEmail = document.createElement('p');
        userEmail.textContent = `Email: ${user.email}`;
        userElement.appendChild(userEmail);

        const userPhone = document.createElement('p');
        userPhone.textContent = `Phone: ${user.phone}`;
        userElement.appendChild(userPhone);

        const userIsAdmin = document.createElement('p');
        userIsAdmin.textContent = `Is Admin: ${user.isAdmin}`;
        userElement.appendChild(userIsAdmin);
        
        const userId = document.createElement('p');
        userId.textContent = `User ID: ${user._id}`;
        userElement.appendChild(userId);

        usersContainer.appendChild(userElement);
    });
}


const messagesContainer = document.querySelector('.realcomments');

messagesContainer.addEventListener('click', function(event) {

    if (event.target && event.target.id === 'deleteUser') {
        deleteUser(event);
    }
});


function deleteUser(event) {
    event.preventDefault();

    const deleteButton = event.target;
    const userElement = deleteButton.closest('.comment');
    const userId = deleteButton.getAttribute('data-id');

fetch(`${API_URL}/api/user`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie}`
    },
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        showMessage(data.error)
    } else {
        userElement.remove();
        showMessage(data.message, '#10E956')
    }
})
.catch(error => {
    showMessage(error.message || error)

})

}


document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});


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