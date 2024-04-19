const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';
const cookie = document.cookie.split('jwt=')[1]


function fetchAndPopulateBlogPost() {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`${API_URL}/api/article/${postId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    updateBlogPostHtml(data.singleArticle);
                    // console.log(data.singleArticle);
                } else {
                    console.error('No data found for the blog post with ID:', postId);
                }
            })
            .catch(error => {
                console.error('Error fetching blog post:', error);
            });
    } else {
        console.error('No blog post ID provided in the URL.');
    }
}

function updateBlogPostHtml(blogPost) {

    const destext = document.querySelector('.destext');
    const blogImage = document.querySelector('.blogimage img');
    const blogTitle = document.querySelector('.blogtitle .stitle');
    const blogContent = document.querySelector('.blogcontent');

    const publishedDate = new Date(blogPost.timestamp);
    const formattedDate = publishedDate.toLocaleDateString();
    const formattedTime = publishedDate.toLocaleTimeString();
    
    destext.innerHTML = `
    <p>Published ${formattedDate} at ${formattedTime}</p>
    <p>${blogPost.author}</p>
    <p>${blogPost.comments} comments, ${blogPost.likes} likes.</p>
    `;


    blogImage.src = blogPost.image;
    blogTitle.textContent = blogPost.title;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = blogPost.description;

    blogContent.innerHTML = '';

    blogContent.appendChild(descriptionParagraph);

    document.title = blogPost.title;
}

document.getElementById('formComment').addEventListener('submit', updateComment);

function createComment(event) {
    event.preventDefault();


    const form = event.target;
    const content = document.getElementById('comment').value;
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    fetch(`${API_URL}/api/comment/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookie}`
        },
        
        body: JSON.stringify({ blogId, content})
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error);
        } else {
            showMessage(data.message, '#10E956', 3000);
            fetchCommentsByPost();
            form.reset();
        }
    })
    .catch(error => {
        showMessage(error.message);
    });
}


function fetchCommentsByPost() {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`${API_URL}/api/comment/article/${postId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showMessage(data.error)
                }else if (data) {
                    populateComments(data.comments);
                    // console.log(data.comments);
                } else {
                    showMessage(error)
                    console.error('No comments found for the blog post with ID:', postId);
                }
            })
            .catch(error => {
                showMessage(error)
                console.error('Error fetching post related comments', error);
            });
    } else {
        showMessage(error)
        console.error('No blog post ID provided in the URL.');
    }
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
        editSpan.textContent = 'Edit';
        editSpan.setAttribute('data-id', comment._id);
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

document.querySelector('.reactions i.fa-thumbs-up').addEventListener('click', toggleLike);

function toggleLike(event) {
    event.preventDefault();

    const likeIcon = event.target;

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    const isLiked = likeIcon.classList.contains('liked');

    if (isLiked) {
        fetch(`${API_URL}/api/like/${blogId}`,  {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${cookie}`
            }
        })
        .then(response => response.json())
        .then(data => {

            showMessage(data.message, 3000)
            likeIcon.classList.remove('liked');
            fetchLikesByPost()
                
        })
        .catch(error => {
            console.error('Error fetching like related comments', error);
        });
    } else {
        fetch(`${API_URL}/api/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookie}`
            },
            body: JSON.stringify({
                blogId: blogId,
                liked: true,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showMessage(data.error)
            } else {
                showMessage(data.message, '#10E956', 3000);
            likeIcon.classList.add('liked');
            fetchLikesByPost()
            }
            
            })
        .catch(error => {
            console.error(error);
        });
    }
}

function fetchLikesByPost() {

    const likesParagraph = document.getElementById('likes');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`${API_URL}/api/like/count/${postId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${cookie}`
        }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    likesParagraph.textContent = `${data.likeCount} Likes`;
                } else {
                    console.error('No likes found', postId);
                }
            })
            .catch(error => {
                console.error('Error fetching likes related comments', error);
            });
    } else {
        console.error('No blog post ID provided in the URL.');
    }
}

const commentsContainer = document.querySelector('#realcomments');

commentsContainer.addEventListener('click', function(event) {

    if (event.target && event.target.id === 'deleteComment') {
        deleteComment(event);
    } else if (event.target && event.target.id === 'editComment') {
        fillCommentForm(event);
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

function fillCommentForm(event) {

    const editButton = event.target;
    const commentElement = editButton.closest('.comment');
    const commentId = editButton.getAttribute('data-id');

    const commentContent = commentElement.querySelector(':not(.cmnthd) > p').textContent;


    const commentForm = document.getElementById('formComment');
    const contentInput = commentForm.querySelector('#comment');
    
    if(contentInput) {
        contentInput.value = commentContent;
    }

    commentForm.querySelector('#commentId').value = commentId;
}

function updateComment(event) {
    event.preventDefault(); 

    const form = event.target;
    // const commentId = form.getAttribute('data-comment-id');
    const content = form.querySelector('#comment').value;

    const commentId = form.querySelector('#commentId').value;
    
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

if (commentId) {

fetch(`${API_URL}/api/comment/${commentId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie}`
    },
    body: JSON.stringify({ blogId, content }),
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        showMessage(data.error)
    } else {
        showMessage(data.message, '#10E956')
        fetchCommentsByPost()
        form.reset();
    }
})
.catch(error => {
    // Handle network or other errors
    console.error('Error updating comment:', error);
}); } else {
    createComment(event)
}
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

document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateBlogPost();
    fetchCommentsByPost();
    fetchLikesByPost()
});