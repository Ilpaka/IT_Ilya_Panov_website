function showStringInfo(text) {
    let lettersCount = 0;
    let digitsCount = 0;
    let spacesCount = 0;
    let upperCaseCount = 0;
    let lowerCaseCount = 0;
    let symbolsCount = 0;
    let words;

    for (let i = 0; i < text.length; i++) {
        let symbol = text[i];

        if (symbol >= "A" && symbol <= "Z" || symbol >= "А" && symbol <= "Я") {
            lettersCount++;
            upperCaseCount++;
        } else if (symbol >= "a" && symbol <= "z" || symbol >= "а" && symbol <= "я") {
            lettersCount++;
            lowerCaseCount++;
        } else if (symbol >= "0" && symbol <= "9") {
            digitsCount++;
        } else if (symbol === " ") {
            spacesCount++;
        } else {
            symbolsCount++;
        }
    }

    if (text.trim() === "") {
        words = [];
    } else {
        words = text.trim().split(/\s+/);
    }

    console.log("Строка:", text);
    console.log("Общая длина строки:", text.length);
    console.log("Количество букв:", lettersCount);
    console.log("Количество цифр:", digitsCount);
    console.log("Количество пробелов:", spacesCount);
    console.log("Количество символов:", symbolsCount);
    console.log("Количество слов:", words.length);
    console.log("Количество больших букв:", upperCaseCount);
    console.log("Количество маленьких букв:", lowerCaseCount);
    console.log("Строка в верхнем регистре:", text.toUpperCase());
    console.log("Строка в нижнем регистре:", text.toLowerCase());
    console.log("Строка без пробелов по краям:", text.trim());
    console.log("Первый символ:", text[0]);
    console.log("Последний символ:", text[text.length - 1]);
}

let myText = "Привет, мир! Мне 18 лет. Я изучаю JavaScript.";

showStringInfo(myText);
