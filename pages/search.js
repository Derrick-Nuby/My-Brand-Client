const API_URL = 'https://derricks-brand.onrender.com';
// const API_URL = 'http://localhost:4000';
const cookie = document.cookie.split('jwt=')[1]

// Function to fetch and populate articles on page load
function fetchAndPopulateArticles() {
    fetch(`${API_URL}/api/article/`)
        .then(response => response.json())
        .then(data => {

            const articlesContainer = document.querySelector('.myarticles .articlesitems');

            if (data.articles && data.articles.length > 0) {
                articlesContainer.innerHTML = '';

                // Loop through each article
                data.articles.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');

                    const img = document.createElement('img');
                    img.src = article.image;
                    img.alt = article.title;

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('artitle', 'code');

                    const link = document.createElement('a');
                    link.href = `./post.html?id=${article._id}`;

                    link.textContent = article.title;
                    titleDiv.appendChild(link);
                    articleDiv.appendChild(img);
                    articleDiv.appendChild(titleDiv);
                    articlesContainer.appendChild(articleDiv);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
        });
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