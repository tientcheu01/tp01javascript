document.addEventListener('DOMContentLoaded', function() {
    const articleForm = document.getElementById('articleForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const articleList = document.getElementById('listedesarticles');

    let articles = [];

    function renderArticles() {
        articleList.innerHTML = '';
        articles.forEach((article, index) => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
            articleElement.innerHTML = `
                <span>${index + 1}</span>
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <button class="editBtn" data-index="${index}">Modifier</button>
                <button class="deleteBtn" data-index="${index}">Supprimer</button>
            `;
            articleList.appendChild(articleElement);
        });
    }

    function addArticle(title, description) {
        articles.push({ title, description });
        renderArticles();
    }

    function deleteArticle(index) {
        articles.splice(index, 1);
        renderArticles();
    }

    function editArticle(index, newTitle, newDescription) {
        articles[index].title = newTitle;
        articles[index].description = newDescription;
        renderArticles();
    }

    articleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        if (title && description) {
            addArticle(title, description);
            titleInput.value = '';
            descriptionInput.value = '';
        }
    });

    articleList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const index = event.target.dataset.index;
            deleteArticle(index);
        }
        if (event.target.classList.contains('editBtn')) {
            const index = event.target.dataset.index;
            const newTitle = prompt('Entrez le nouveau titre :', articles[index].title);
            const newDescription = prompt('Entrez la nouvelle description :', articles[index].description);
            if (newTitle !== null && newDescription !== null) {
                editArticle(index, newTitle, newDescription);
            }
        }
    });
});
