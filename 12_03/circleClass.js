class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(newRadius) {
        if (newRadius > 0) {
            this._radius = newRadius;
        } else {
            console.log("Радиус должен быть больше нуля.");
        }
    }

    get diameter() {
        return this._radius * 2;
    }

    getArea() {
        return Math.PI * this._radius * this._radius;
    }

    getLength() {
        return 2 * Math.PI * this._radius;
    }
}

let myCircle = new Circle(10);

console.log("Радиус окружности:", myCircle.radius);
console.log("Диаметр окружности:", myCircle.diameter);
console.log("Площадь окружности:", myCircle.getArea());
console.log("Длина окружности:", myCircle.getLength());

myCircle.radius = 15;

console.log("Новый радиус окружности:", myCircle.radius);
console.log("Новый диаметр окружности:", myCircle.diameter);
console.log("Новая площадь окружности:", myCircle.getArea());
console.log("Новая длина окружности:", myCircle.getLength());

let radiusInput = document.getElementById("radius-input");
let createButton = document.getElementById("create-button");
let radiusOutput = document.getElementById("radius-output");
let diameterOutput = document.getElementById("diameter-output");
let areaOutput = document.getElementById("area-output");
let lengthOutput = document.getElementById("length-output");
let circleView = document.getElementById("circle-view");
let circleText = document.getElementById("circle-text");
let message = document.getElementById("message");

function showCircleInfo(circle) {
    radiusOutput.textContent = circle.radius.toFixed(2);
    diameterOutput.textContent = circle.diameter.toFixed(2);
    areaOutput.textContent = circle.getArea().toFixed(2);
    lengthOutput.textContent = circle.getLength().toFixed(2);

    let size = circle.diameter * 10;

    if (size < 120) {
        size = 120;
    }

    if (size > 320) {
        size = 320;
    }

    circleView.style.width = size + "px";
    circleView.style.height = size + "px";

    circleText.innerHTML =
        "R = " + circle.radius.toFixed(2) + "<br>" +
        "D = " + circle.diameter.toFixed(2) + "<br>" +
        "S = " + circle.getArea().toFixed(2) + "<br>" +
        "L = " + circle.getLength().toFixed(2);
}

createButton.addEventListener("click", function () {
    let radiusValue = Number(radiusInput.value);

    if (radiusValue <= 0 || isNaN(radiusValue)) {
        message.textContent = "Введите радиус больше нуля.";
        return;
    }

    myCircle.radius = radiusValue;
    showCircleInfo(myCircle);
    message.textContent = "Данные окружности обновлены.";
});

showCircleInfo(myCircle);
