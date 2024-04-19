const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';
const cookie = document.cookie.split('jwt=')[1]


function fetchComments() {
fetch(`${API_URL}/api/comment/`, {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${cookie}`
    }
})
.then(response => response.json())
.then(data => {
    if (data) {
        populateComments(data.comments);
        // console.log(data.comments);
    } else {
        console.error('No comments found for the blog post with ID:', postId);
    }
})
.catch(error => {
    console.error('Error fetching post related comments', error);
});

}

function populateComments(comments) {

    const commentsContainer = document.querySelector('.realcomments');

    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
    
        const commentHeader = document.createElement('div');
        commentHeader.classList.add('cmnthd', 'code', 'scolor');
    
        const timestamp = new Date(comment.timestamp);
        const formattedDate = timestamp.toDateString();
    
        const headerP = document.createElement('p');
        headerP.textContent = `${comment.authorName} ${formattedDate}`;
        
        commentHeader.appendChild(headerP); 
    
        const optionsP = document.createElement('p');
    
        const editSpan = document.createElement('span');
        editSpan.id = 'editComment';
        editSpan.textContent = comment.blogId;
        optionsP.appendChild(editSpan);
    
        const deleteSpan = document.createElement('span');
        deleteSpan.id = 'deleteComment';
        deleteSpan.textContent = 'Delete';
        deleteSpan.setAttribute('data-id', comment._id);
        optionsP.appendChild(deleteSpan);
    
        commentHeader.appendChild(optionsP);
        commentElement.appendChild(commentHeader);
    
        const commentContent = document.createElement('p');
        commentContent.textContent = comment.content;

        commentElement.appendChild(commentContent);
        commentsContainer.appendChild(commentElement);
    });
    
}


const commentsContainer = document.querySelector('.realcomments');

commentsContainer.addEventListener('click', function(event) {

    if (event.target && event.target.id === 'deleteComment') {
        deleteComment(event);
    }
});


function deleteComment(event) {
    event.preventDefault();

    const deleteButton = event.target;
    const commentElement = deleteButton.closest('.comment');
    const commentId = deleteButton.getAttribute('data-id');

fetch(`${API_URL}/api/comment/${commentId}`, {
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
        commentElement.remove();
        showMessage(data.message, '#10E956')
    }
})
.catch(error => {
    showMessage(error.message || error)

})

}

function fetchMessages() {
fetch(`${API_URL}/api/message/`, {
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
        populateMessages(data.messages);
        // console.log(data.messages);
    }
})
.catch(error => {
    console.error('Error fetching post related comments', error);
});

}

function populateMessages(messages) {

    const messagesContainer = document.querySelector('.realmessages');

    messagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('comment');
    
        const messageHeader = document.createElement('div');
        messageHeader.classList.add('cmnthd', 'code', 'scolor');

        const timestamp = new Date(message.timestamp);
        const formattedDate = timestamp.toDateString();
    
        const headerP = document.createElement('p');
        headerP.textContent = `${message.names} ${formattedDate}`;
        
        messageHeader.appendChild(headerP); 
    
        const optionsP = document.createElement('p');
    
        const deleteSpan = document.createElement('span');
        deleteSpan.id = 'deleteMessage';
        deleteSpan.textContent = 'Delete';
        deleteSpan.setAttribute('data-id', message._id);
        optionsP.appendChild(deleteSpan);
    
        messageHeader.appendChild(optionsP);
        messageElement.appendChild(messageHeader);
    
        const detailsP = document.createElement('p');
        detailsP.innerHTML = `Email: ${message.email}<br>Subject: ${message.subject}<br>Phone: ${message.phone}`;
        
        messageElement.appendChild(detailsP);
    
        const messageContent = document.createElement('p');
        messageContent.textContent = message.message;

        messageElement.appendChild(messageContent);
        
        messagesContainer.appendChild(messageElement);
    });
}

const messagesContainer = document.querySelector('.realmessages');

messagesContainer.addEventListener('click', function(event) {

    if (event.target && event.target.id === 'deleteMessage') {
        deleteMessage(event);
    }
});

function deleteMessage(event) {
    event.preventDefault();

    const deleteButton = event.target;
    const messageElement = deleteButton.closest('.comment');
    const messageId = deleteButton.getAttribute('data-id');

fetch(`${API_URL}/api/message/${messageId}`, {
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
        messageElement.remove();
        showMessage(data.message, '#10E956')
    }
})
.catch(error => {
    showMessage(error.message || error)

})

}


document.addEventListener('DOMContentLoaded', () => {
    fetchComments();
    fetchMessages()
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