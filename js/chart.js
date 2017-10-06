"use strict"

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,
    startBtn = document.getElementById("start"),
    table = document.getElementById("answers"),
    btnCheck = document.getElementById("start"),
    rows = document.querySelectorAll("table tr"),
    inputs = document.querySelectorAll("table input");

var arrBD = [-2, -3, -4, -5, -6,
    -1 / 2, -1 / 3, -1 / 4, -1 / 5, -1 / 6,
    2, 3, 4, 5, 6,
    1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6
];


function randomAC() {
    return Math.floor(Math.random() * 21 - 10);
} //console.log(randomA());

function randomBD(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
} //console.log(randomB(arrB));

function randomFunction() {
    return Math.floor(Math.random() * 4 + 1);
} //console.log(randomFunction());


var Chart = function () {
    this.x0 = width / 2;
    this.y0 = height / 2;
    this.x = width / 2;
    this.y = height / 2;
    this.step = 25;
};

Chart.prototype.coordinateSystem = function () {
    // координатная плоскость
    ctx.lineWidth = 2;
    ctx.font = "25px sans-serif";
    ctx.fillStyle = "black";
    ctx.beginPath();
    // x
    ctx.moveTo(20, height / 2);
    ctx.lineTo(width - 20, height / 2);
    ctx.fillText("X", width - 20, height / 2 - 10);
    // стрелка
    ctx.moveTo(width - 30, height / 2 - 5);
    ctx.lineTo(width - 20, height / 2);
    ctx.lineTo(width - 30, height / 2 + 5);

    // y
    ctx.moveTo(width / 2, 20);
    ctx.lineTo(width / 2, height - 20);
    ctx.fillText("Y", width / 2 + 10, 30);
    // стрелка
    ctx.moveTo(width / 2 - 5, 30);
    ctx.lineTo(width / 2, 20);
    ctx.lineTo(width / 2 + 5, 30);
    ctx.stroke();

    // шкала
    positiveX();
    negativeX();
    negativeY();
    positiveY();
}

// функции прорисовки шкалы по соответствующим осям
function positiveX() {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.font = "10px sans-serif"
    var num = 0;
    for (var xStep = width / 2; xStep < width - 25; xStep += 25) {
        ctx.moveTo(xStep, height / 2 - 5);
        ctx.lineTo(xStep, height / 2 + 5);

        if (num != 0) {
            ctx.fillText(num, xStep, height / 2 + 15);
        }
        num++;
    }
    ctx.stroke();
}

function negativeX() {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.font = "10px sans-serif"
    var number = 0;
    for (var xStep = width / 2; xStep > 25; xStep -= 25) {
        ctx.moveTo(xStep, height / 2 - 5);
        ctx.lineTo(xStep, height / 2 + 5);

        if (number != 0) {
            ctx.fillText(-number, xStep, height / 2 - 15);
        }
        number++;
    }
    ctx.stroke();
}

function negativeY() {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.font = "10px sans-serif"
    var numb = 0;
    for (var yStep = height / 2; yStep < height - 25; yStep += 25) {
        ctx.moveTo(width / 2 - 5, yStep);
        ctx.lineTo(width / 2 + 5, yStep);

        if (numb != 0) {
            ctx.fillText(-numb, width / 2 - 20, yStep);
        }
        numb++;
    }
    ctx.stroke();
}

function positiveY() {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.font = "10px sans-serif"
    var numb = 0;
    for (var yStep = height / 2; yStep > 25; yStep -= 25) {
        ctx.moveTo(width / 2 - 5, yStep);
        ctx.lineTo(width / 2 + 5, yStep);

        if (numb != 0) {
            ctx.fillText(numb, width / 2 + 20, yStep);
        }
        numb++;
    }
    ctx.stroke();
}

// метод сброса точки в начало координат
Chart.prototype.reset = function () {
    this.x = this.x0;
    this.y = this.y0;
};

// метод задания точки по координатам x, y сетки (возвращает массив с координатами)
Chart.prototype.setPoint = function (x, y) {
    return [this.x0 + x * this.step, this.y0 + y * -this.step];
};

// метод рисования точки
Chart.prototype.drawPoint = function (arr, color) {
    ctx.fillStyle = color || "red";
    ctx.beginPath();
    ctx.arc(arr[0], arr[1], 2, 0, Math.PI * 2, false);
    ctx.fill();
};

// метод рисования линии
Chart.prototype.drawLine = function (firstPoint, secondPoint, color) {
    ctx.strokeStyle = color || "red";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(firstPoint[0], firstPoint[1]);
    ctx.lineTo(secondPoint[0], secondPoint[1]);
    ctx.stroke();
};

// y = b * x
Chart.prototype.f2 = function (b) {
    var o = this.setPoint(0, 0);
    var positive = this.setPoint(10, (10 * b));
    var negative = this.setPoint(-10, (-10 * b));

    this.drawPoint(o);
    this.drawLine(o, positive);
    this.drawLine(o, negative);
};

// y = x + a
Chart.prototype.f1 = function (a) {
    var o = this.setPoint(0, a);
    var positive = this.setPoint(10, (10 + a));
    var negative = this.setPoint(-10, (-10 + a));

    this.drawPoint(o);
    this.drawLine(o, positive);
    this.drawLine(o, negative);
};

// y = (b * x) + a
Chart.prototype.f3 = function (a, b) {
    var o = this.setPoint(0, a);
    var positive = this.setPoint(10, (10 * b + a));
    var negative = this.setPoint(-10, (-10 * b + a));

    this.drawPoint(o);
    this.drawLine(o, positive);
    this.drawLine(o, negative);
};

// y = (b * x) + a
Chart.prototype.f4 = function (a, b, c, d) {
    var o1 = this.setPoint(0, a);
    var positive1 = this.setPoint(10, (10 * b + a));
    var negative1 = this.setPoint(-10, (-10 * b + a));

    this.drawPoint(o1);
    this.drawLine(o1, positive1);
    this.drawLine(o1, negative1);

    // y = (d * x) + c
    var o2 = this.setPoint(0, c);
    var positive2 = this.setPoint(10, (10 * d + c));
    var negative2 = this.setPoint(-10, (-10 * d + c));

    this.drawPoint(o2, "blue");
    this.drawLine(o2, positive2, "blue");
    this.drawLine(o2, negative2, "blue");
};


var curentVars = {
    a: 0,
    b: 1,
    c: 0,
    d: 1,
    choice: 0,
    reset: function () {
        this.a = 0;
        this.b = 1;
        this.c = 0;
        this.d = 1;
    }
};

var chart = new Chart();
chart.coordinateSystem();




startBtn.addEventListener("click", function () {

    // если кнопка в режиме "Старт"
    if (startBtn.getAttribute("data-state") === "start") {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        chart.coordinateSystem();
        curentVars.choice = randomFunction();
        switch (curentVars.choice) {
            case 1:
                curentVars.reset();
                curentVars.a = randomAC();
                console.clear();
                console.log("a:" + curentVars.a);
                rows[1].style.display = "none";
                chart.f1(curentVars.a);
                break;
            case 2:
                curentVars.reset();
                curentVars.b = randomBD(arrBD);
                console.clear();
                console.log("b:" + curentVars.b);
                rows[1].style.display = "none";
                chart.f2(curentVars.b);
                break;
            case 3:
                curentVars.reset();
                curentVars.a = randomAC();
                curentVars.b = randomBD(arrBD);
                console.clear();
                console.log("a:" + curentVars.a + "; b:" + curentVars.b);
                rows[1].style.display = "none";
                chart.f3(curentVars.a, curentVars.b);
                break;
            case 4:
                curentVars.reset();
                curentVars.a = randomAC();
                curentVars.b = randomBD(arrBD);
                curentVars.c = randomAC();
                curentVars.d = randomBD(arrBD);
                console.clear();
                console.log("a:" + curentVars.a + "; b:" + curentVars.b + "; c:" + curentVars.c + "; d:" + curentVars.d);
                rows[1].style.display = "block";
                chart.f4(curentVars.a, curentVars.b, curentVars.c, curentVars.d);
                break;

            default:
                console.log('Не одна из четыр функций не выбрана!');
                break;
        }
    }

    // если кнопка в режиме "Проверить"
    else if (startBtn.getAttribute("data-state") === "check") {

        switch (curentVars.choice) {

            case 1:

//                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
                if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b) {
                    alert("Крутяк! Это правильный ответ!");
                    afterChecked();
                } else if (!confirm("Не верно :( Подумай еще немного!")) {
                    afterChecked();
                }
                break;

            case 2:

//                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
                if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b) {
                    alert("Крутяк! Это правильный ответ!");
                    afterChecked();
                } else if (!confirm("Не верно :( Подумай еще немного!")) {
                    afterChecked();
                }
                break;
            case 3:

//                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
                if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b) {
                    alert("Крутяк! Это правильный ответ!");
                    afterChecked();
                } else if (!confirm("Не верно :( Подумай еще немного!")) {
                    afterChecked();
                }
                break;

            case 4:

//                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b && convertToFloat(inputs[3]) == curentVars.c && convertToFloat(inputs[2]) == curentVars.d) {
                if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b && inputParse(inputs[1]).a == curentVars.c && inputParse(inputs[1]).b == curentVars.d) {
                    alert("Крутяк! Это правильный ответ!");
                    afterChecked();
                } else if (!confirm("Не верно :( Подумай еще немного!")) {
                    afterChecked();
                }
                break;

            default:
                console.log('Не одна из четыр проверок не сработала!');
                afterChecked();
                break;
        }
    }
});

function afterChecked() {
    btnCheck.setAttribute("data-state", "start");
    btnCheck.innerText = "Старт";
    inputs[0].value = '';
    inputs[1].value = '';
};


(function(){

for (var n = 0; n < inputs.length; n++) {
    // если поле ввода в фокусе, то дать талице opacity: 1;
    inputs[n].onfocus = function () {
        table.style.opacity = "1";
    };
    // если поле ввода потеряло фокус, то дать таблице opacity: 0.3;
    inputs[n].onblur = function (e) {
        // table.style.opacity = "0.3";
        if(e.target.value == "") {

        console.log(e.target.value);
        table.removeAttribute("style");
        }
    };
    // во время ввода заменить значение data-state на check, что бы назначить кнопке другой поведение
    inputs[n].oninput = function (e) {

        if (e.target.value !== "") {
            btnCheck.setAttribute("data-state", "check");
            btnCheck.innerText = "Проверить";
        } else {
            btnCheck.setAttribute("data-state", "start");
            btnCheck.innerText = "Старт";
        }
    };
}

})();
