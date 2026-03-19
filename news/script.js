class NewsFeed {
    constructor() {
        this.news = [];
    }

    get count() {
        return this.news.length;
    }

    showAllNews() {
        return this.news;
    }

    addNews(oneNews) {
        this.news.push(oneNews);
    }

    deleteNews(id) {
        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].id === id) {
                this.news.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    sortByDate() {
        this.news.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    findByTag(tag) {
        let result = [];

        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].tags.includes(tag)) {
                result.push(this.news[i]);
            }
        }

        return result;
    }
}

let newsFeed = new NewsFeed();
let nextId = 1;

newsFeed.addNews({
    id: nextId,
    title: "Открытие новой библиотеки",
    text: "В городе открылась новая современная библиотека.",
    date: "2026-03-15",
    tags: ["город", "культура"]
});
nextId++;

newsFeed.addNews({
    id: nextId,
    title: "Матч завершился победой",
    text: "Команда хозяев выиграла матч со счетом 3:1.",
    date: "2026-03-18",
    tags: ["спорт", "матч"]
});
nextId++;

newsFeed.addNews({
    id: nextId,
    title: "Вышло обновление приложения",
    text: "Разработчики добавили новые функции в приложение.",
    date: "2026-03-17",
    tags: ["технологии", "приложение"]
});
nextId++;

console.log("Количество новостей:", newsFeed.count);
console.log("Все новости:", newsFeed.showAllNews());

newsFeed.sortByDate();
console.log("Новости после сортировки по дате:", newsFeed.showAllNews());

console.log("Поиск по тегу 'спорт':", newsFeed.findByTag("спорт"));

function renderNews(list) {
    let newsList = document.getElementById("news-list");
    newsList.innerHTML = "";
    document.getElementById("news-count").textContent = newsFeed.count;

    if (list.length === 0) {
        newsList.innerHTML = "<p>Новостей нет.</p>";
        return;
    }

    for (let i = 0; i < list.length; i++) {
        let card = document.createElement("div");
        card.className = "news-card";

        let title = document.createElement("h3");
        title.textContent = list[i].title;

        let date = document.createElement("div");
        date.className = "news-date";
        date.textContent = "Дата: " + list[i].date;

        let text = document.createElement("p");
        text.textContent = list[i].text;

        let tags = document.createElement("div");
        tags.className = "news-tags";
        tags.textContent = "Теги: " + list[i].tags.join(", ");

        let idText = document.createElement("div");
        idText.textContent = "ID: " + list[i].id;

        let deleteButton = document.createElement("button");
        deleteButton.className = "card-button";
        deleteButton.textContent = "Удалить эту новость";
        deleteButton.addEventListener("click", function () {
            newsFeed.deleteNews(list[i].id);
            showMessage("Новость удалена.");
            renderNews(newsFeed.showAllNews());
        });

        card.append(title);
        card.append(idText);
        card.append(date);
        card.append(text);
        card.append(tags);
        card.append(deleteButton);

        newsList.append(card);
    }
}

function showMessage(text) {
    document.getElementById("message").textContent = text;
}

document.getElementById("show-all-button").addEventListener("click", function () {
    renderNews(newsFeed.showAllNews());
    showMessage("Показаны все новости.");
});

document.getElementById("sort-button").addEventListener("click", function () {
    newsFeed.sortByDate();
    renderNews(newsFeed.showAllNews());
    showMessage("Новости отсортированы по дате.");
});

document.getElementById("add-button").addEventListener("click", function () {
    let title = document.getElementById("title-input").value.trim();
    let text = document.getElementById("text-input").value.trim();
    let date = document.getElementById("date-input").value;
    let tagsText = document.getElementById("tags-input").value.trim();

    if (title === "" || text === "" || date === "" || tagsText === "") {
        showMessage("Заполните все поля для добавления новости.");
        return;
    }

    let tags = tagsText.split(",");

    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
    }

    newsFeed.addNews({
        id: nextId,
        title: title,
        text: text,
        date: date,
        tags: tags
    });

    nextId++;

    document.getElementById("title-input").value = "";
    document.getElementById("text-input").value = "";
    document.getElementById("date-input").value = "";
    document.getElementById("tags-input").value = "";

    renderNews(newsFeed.showAllNews());
    showMessage("Новая новость добавлена.");
});

document.getElementById("delete-button").addEventListener("click", function () {
    let id = Number(document.getElementById("delete-id-input").value);

    if (!id) {
        showMessage("Введите id для удаления.");
        return;
    }

    let result = newsFeed.deleteNews(id);

    if (result) {
        renderNews(newsFeed.showAllNews());
        showMessage("Новость удалена по id.");
    } else {
        showMessage("Новость с таким id не найдена.");
    }

    document.getElementById("delete-id-input").value = "";
});

document.getElementById("search-button").addEventListener("click", function () {
    let tag = document.getElementById("tag-search-input").value.trim();

    if (tag === "") {
        showMessage("Введите тег для поиска.");
        return;
    }

    let result = newsFeed.findByTag(tag);
    renderNews(result);
    showMessage("Найдено новостей: " + result.length);
});

document.getElementById("reset-button").addEventListener("click", function () {
    document.getElementById("tag-search-input").value = "";
    renderNews(newsFeed.showAllNews());
    showMessage("Фильтр сброшен.");
});

renderNews(newsFeed.showAllNews());
showMessage("Показаны все новости.");
