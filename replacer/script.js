let fileInput = document.getElementById("file-input");
let searchInput = document.getElementById("search-input");
let replaceInput = document.getElementById("replace-input");
let replaceButton = document.getElementById("replace-button");
let downloadButton = document.getElementById("download-button");
let beforeText = document.getElementById("before-text");
let afterText = document.getElementById("after-text");
let report = document.getElementById("report");

let currentFileName = "";
let changedText = "";

fileInput.addEventListener("change", function () {
    let file = fileInput.files[0];

    if (!file) {
        return;
    }

    currentFileName = file.name;

    let reader = new FileReader();

    reader.onload = function () {
        beforeText.value = reader.result;
        afterText.value = "";
        report.textContent = "Файл загружен: " + currentFileName;
        changedText = "";
    };

    reader.readAsText(file);
});

replaceButton.addEventListener("click", function () {
    let searchWord = searchInput.value;
    let replaceWord = replaceInput.value;
    let text = beforeText.value;

    if (text === "") {
        report.textContent = "Сначала выберите файл.";
        return;
    }

    if (searchWord === "") {
        report.textContent = "Введите слово для поиска.";
        return;
    }

    let count = 0;
    let result = text;

    while (result.includes(searchWord)) {
        result = result.replace(searchWord, replaceWord);
        count++;
    }

    changedText = result;
    afterText.value = result;
    report.textContent = "Количество замен: " + count;
});

downloadButton.addEventListener("click", function () {
    if (changedText === "") {
        report.textContent = "Сначала выполните замену.";
        return;
    }

    let blob = new Blob([changedText], { type: "text/plain" });
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "new_" + currentFileName;
    link.click();
});
