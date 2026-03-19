let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");
let currentText = "";

function prepareText(text) {
    let result = text;

    result = result.replaceAll("sin(", "Math.sin(");
    result = result.replaceAll("cos(", "Math.cos(");
    result = result.replaceAll("tan(", "Math.tan(");
    result = result.replaceAll("sqrt(", "Math.sqrt(");
    result = result.replaceAll("log(", "Math.log10(");
    result = result.replaceAll("ln(", "Math.log(");
    result = result.replaceAll("pi", "Math.PI");
    result = result.replaceAll("e", "Math.E");
    result = result.replaceAll("^", "**");

    return result;
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        let value = buttons[i].dataset.value;

        if (value === "=") {
            if (currentText !== "") {
                try {
                    let readyText = prepareText(currentText);
                    currentText = Function("return " + readyText)().toString();
                    display.value = currentText;
                } catch (error) {
                    display.value = "Ошибка";
                    currentText = "";
                }
            }
        } else if (value === "AC") {
            currentText = "";
            display.value = "";
        } else if (value === "DEL") {
            currentText = currentText.slice(0, currentText.length - 1);
            display.value = currentText;
        } else {
            currentText += value;
            display.value = currentText;
        }
    });
}
