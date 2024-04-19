const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';
const cookie = document.cookie.split('jwt=')[1]


document.getElementById('addblog').addEventListener('submit', updateArticle);

function addblog(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    fetch(`${API_URL}/api/article`, {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": `Bearer ${cookie}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showMessage(data.error)
        } else {
            showMessage(data.message, '10E956')
            fetchAndPopulateArticles();
        }
    })
    .catch(error => {
        console.error('Error submitting blog post:', error);
    });
}

function fetchAndPopulateArticles() {
fetch(`${API_URL}/api/article/`)
.then(response => response.json())
.then(data => {

const articlesContainer = document.querySelector('.myarticles .articlesitems');

if (data.articles && data.articles.length > 0) {
    articlesContainer.innerHTML = '';

    data.articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const img = document.createElement('img');
        img.src = article.image;
        img.alt = article.title;

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('artitle', 'code');

        const link = document.createElement('a');
        link.href = `${window.location.origin}/pages/post.html?id=${article._id}`;

        const optionsP = document.createElement('p');

        const editSpan = document.createElement('span');
        editSpan.id = 'editArticle';
        editSpan.textContent = 'Edit';
        editSpan.setAttribute('data-id', article._id);
        optionsP.appendChild(editSpan);
    
        const deleteSpan = document.createElement('span');
        deleteSpan.id = 'deleteArticle';
        deleteSpan.textContent = 'Delete';
        deleteSpan.setAttribute('data-id', article._id);
        optionsP.appendChild(deleteSpan);

        link.textContent = article.title;
        titleDiv.appendChild(link);
        articleDiv.appendChild(img);
        articleDiv.appendChild(titleDiv);
        articlesContainer.appendChild(articleDiv);
        articleDiv.appendChild(optionsP);
    });
}
})
.catch(error => {
    console.error('Error fetching articles:', error);
});
}


const articlesContainer = document.querySelector('#realarticles');

articlesContainer.addEventListener('click', function(event) {

    if (event.target && event.target.id === 'deleteArticle') {
        deleteArticle(event);
    } else if (event.target && event.target.id === 'editArticle') {
        fillArticleForm(event);
    }
});


function deleteArticle(event) {
    event.preventDefault();

    const deleteButton = event.target;
    const articleElement = deleteButton.closest('.article');
    const articleId = deleteButton.getAttribute('data-id');

fetch(`${API_URL}/api/article/${articleId}`, {
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
        articleElement.remove();
        showMessage(data.message, '#10E956')
    }
})
.catch(error => {
    showMessage(error.message || error)

})
}

function fillArticleForm(event) {
    event.preventDefault();

    const editButton = event.target;
    const articleElement = editButton.closest('.article');
    const articleId = editButton.getAttribute('data-id');


    const articleForm = document.getElementById('addblog');

    articleForm.querySelector('#articleId').value = articleId


fetch(`${API_URL}/api/article/${articleId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie}`
    },
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        console.log(data.error);
        showMessage(data.error)
    } else {

        const article = data.singleArticle

        // const blogimage = document.getElementById('blogimage')
        const title = document.getElementById('title')
        const description = document.getElementById('description')

        if (blogimage && title && description) {
            // blogimage.value = article.image;
            title.value = article.title;
            description.value = article.description;
        }

        articleElement.remove();
        // console.log(data.singleArticle);
        showMessage(data.message, '#10E956')
    }
})
.catch(error => {
    console.log(error);

    showMessage(error.message || error)

})
}

function updateArticle(event) {
    event.preventDefault();

    const form = event.target;
    const articleId = form.querySelector('#articleId').value;

    const formData = new FormData(form);

    const blogImage = document.getElementById('blogimage').files[0];
    if (blogImage) {
        formData.append('image', blogImage);
    }

    const title = document.getElementById('title')
    const description = document.getElementById('description')

    formData.append('title', title);
    formData.append('description', description);


if (articleId) {
    fetch(`${API_URL}/api/article/${articleId}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${cookie}`,
            // "Content-Type": "application/json",
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.error) {
            showMessage(data.error)
        } else {
            showMessage(data.message, '#10E956')
            fetchAndPopulateArticles()
            form.reset()
        }
    })
    .catch(error => {
        console.error('Error submitting blog post:', error);
    });
} else {
    addblog(event);
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

document.addEventListener('DOMContentLoaded', fetchAndPopulateArticles);