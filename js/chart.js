const startBtn = document.getElementById('start');
const table = document.getElementById('answers');
const btnCheck = document.getElementById('start');
const rows = document.querySelectorAll('table tr');
const inputs = document.querySelectorAll('table input');
const arrBD = [
  -2,
  -3,
  -4,
  -5,
  -6,
  -1 / 2,
  -1 / 3,
  -1 / 4,
  -1 / 5,
  -1 / 6,
  2,
  3,
  4,
  5,
  6,
  1 / 2,
  1 / 3,
  1 / 4,
  1 / 5,
  1 / 6,
];

function randomAC() {
  return Math.floor(Math.random() * 21 - 10);
} // console.log(randomA());

function randomBD(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
} // console.log(randomB(arrB));

function randomFunction() {
  return Math.floor(Math.random() * 4 + 1);
} // console.log(randomFunction());

class Chart {
  constructor({ canvas, setStep }) {
    this.canvas = canvas;
    this.step = setStep;
  }

  get ctx() {
    return this.canvas.getContext('2d');
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get x0() {
    return this.width / 2;
  }

  get y0() {
    return this.height / 2;
  }

  get x() {
    return this.width / 2;
  }

  get y() {
    return this.height / 2;
  }

  coordinateSystem() {
    const { ctx, width, height } = this;

    // координатная плоскость
    ctx.lineWidth = 2;
    ctx.font = '25px sans-serif';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    // ресуем ось x
    ctx.moveTo(20, height / 2);
    ctx.lineTo(width - 20, height / 2);
    ctx.fillText('X', width - 20, height / 2 - 10);
    // стрелка на оси x
    ctx.moveTo(width - 30, height / 2 - 5);
    ctx.lineTo(width - 20, height / 2);
    ctx.lineTo(width - 30, height / 2 + 5);

    // ресуем ось y
    ctx.moveTo(width / 2, 20);
    ctx.lineTo(width / 2, height - 20);
    ctx.fillText('Y', width / 2 + 10, 30);
    // стрелка на оси y
    ctx.moveTo(width / 2 - 5, 30);
    ctx.lineTo(width / 2, 20);
    ctx.lineTo(width / 2 + 5, 30);
    ctx.stroke();

    // функции прорисовки шкалы по соответствующим осям
    function positiveX() {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let num = 0;
      for (let xStep = width / 2; xStep < width - 25; xStep += 25) {
        ctx.moveTo(xStep, height / 2 - 5);
        ctx.lineTo(xStep, height / 2 + 5);

        if (num !== 0) {
          ctx.fillText(num, xStep, height / 2 + 15);
        }
        num += num;
      }
      ctx.stroke();
    }

    function negativeX() {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let number = 0;
      for (let xStep = width / 2; xStep > 25; xStep -= 25) {
        ctx.moveTo(xStep, height / 2 - 5);
        ctx.lineTo(xStep, height / 2 + 5);

        if (number !== 0) {
          ctx.fillText(-number, xStep, height / 2 - 15);
        }
        number += number;
      }
      ctx.stroke();
    }

    function negativeY() {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let numb = 0;
      for (let yStep = height / 2; yStep < height - 25; yStep += 25) {
        ctx.moveTo(width / 2 - 5, yStep);
        ctx.lineTo(width / 2 + 5, yStep);

        if (numb !== 0) {
          ctx.fillText(-numb, width / 2 - 20, yStep);
        }
        numb += numb;
      }
      ctx.stroke();
    }

    function positiveY() {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let numb = 0;
      for (let yStep = height / 2; yStep > 25; yStep -= 25) {
        ctx.moveTo(width / 2 - 5, yStep);
        ctx.lineTo(width / 2 + 5, yStep);

        if (numb !== 0) {
          ctx.fillText(numb, width / 2 + 20, yStep);
        }
        numb += numb;
      }
      ctx.stroke();
    }

    // нарисовать деления на осях
    positiveX();
    negativeX();
    negativeY();
    positiveY();
  }

  // метод сброса точки в начало координат
  reset() {
    this.x = this.x0;
    this.y = this.y0;
  }

  // метод задания точки по координатам x, y сетки (возвращает массив с координатами)
  setPoint(x, y) {
    return [this.x0 + x * this.step, this.y0 + y * -this.step];
  }

  // метод рисования точки
  drawPoint(arr, color = 'red') {
    const { ctx } = this;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(arr[0], arr[1], 2, 0, Math.PI * 2, false);
    ctx.fill();
  }

  // метод рисования линии
  drawLine(firstPoint, secondPoint, color = 'red') {
    const { ctx } = this;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(firstPoint[0], firstPoint[1]);
    ctx.lineTo(secondPoint[0], secondPoint[1]);
    ctx.stroke();
  }

  drawGrafic() {
    const { ctx } = this;

    ctx.strokeStyle = color || 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x0, this.y0);
    ctx.lineTo(secondPoint[0], secondPoint[1]);
    ctx.stroke();
  }

  // y = b * x
  f2(b) {
    const o = this.setPoint(0, 0);
    const positive = this.setPoint(10, 10 * b);
    const negative = this.setPoint(-10, -10 * b);

    this.drawPoint(o);
    this.drawLine(o, positive);
    this.drawLine(o, negative);
  }

  // y = x + a
  f1(a) {
    const o = this.setPoint(0, a);
    const positive = this.setPoint(10, 10 + a);
    const negative = this.setPoint(-10, -10 + a);

    this.drawPoint(o);
    this.drawLine(o, positive);
    this.drawLine(o, negative);
  }

  // y = (b * x) + a
  f3(a, b) {
    const o = this.setPoint(0, a);
    const positive = this.setPoint(10, 10 * b + a);
    const negative = this.setPoint(-10, -10 * b + a);

    this.drawPoint(o);
    this.drawLine(o, positive);
    this.drawLine(o, negative);
  }

  // y = (b * x) + a
  f4(a, b, c, d) {
    const o1 = this.setPoint(0, a);
    const positive1 = this.setPoint(10, 10 * b + a);
    const negative1 = this.setPoint(-10, -10 * b + a);

    this.drawPoint(o1);
    this.drawLine(o1, positive1);
    this.drawLine(o1, negative1);

    // y = (d * x) + c
    const o2 = this.setPoint(0, c);
    const positive2 = this.setPoint(10, 10 * d + c);
    const negative2 = this.setPoint(-10, -10 * d + c);

    this.drawPoint(o2, 'blue');
    this.drawLine(o2, positive2, 'blue');
    this.drawLine(o2, negative2, 'blue');
  }
}

const curentVars = {
  a: 0,
  b: 1,
  c: 0,
  d: 1,
  choice: 0,
  reset() {
    this.a = 0;
    this.b = 1;
    this.c = 0;
    this.d = 1;
  },
};

const chart = new Chart({
  canvas: document.getElementById('canvas'),
  setStep: 25,
});

chart.coordinateSystem();

startBtn.addEventListener('click', () => {
  // если кнопка в режиме "Старт"
  if (startBtn.getAttribute('data-state') === 'start') {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'black';
    chart.coordinateSystem();
    curentVars.choice = randomFunction();
    switch (curentVars.choice) {
      case 1:
        curentVars.reset();
        curentVars.a = randomAC();
        console.clear();
        console.log(`a:${curentVars.a}`);
        rows[1].style.display = 'none';
        chart.f1(curentVars.a);
        break;
      case 2:
        curentVars.reset();
        curentVars.b = randomBD(arrBD);
        console.clear();
        console.log(`b:${curentVars.b}`);
        rows[1].style.display = 'none';
        chart.f2(curentVars.b);
        break;
      case 3:
        curentVars.reset();
        curentVars.a = randomAC();
        curentVars.b = randomBD(arrBD);
        console.clear();
        console.log(`a:${curentVars.a}; b:${curentVars.b}`);
        rows[1].style.display = 'none';
        chart.f3(curentVars.a, curentVars.b);
        break;
      case 4:
        curentVars.reset();
        curentVars.a = randomAC();
        curentVars.b = randomBD(arrBD);
        curentVars.c = randomAC();
        curentVars.d = randomBD(arrBD);
        console.clear();
        console.log(`a:${curentVars.a}; b:${curentVars.b}; c:${curentVars.c}; d:${curentVars.d}`);
        rows[1].style.display = 'block';
        chart.f4(curentVars.a, curentVars.b, curentVars.c, curentVars.d);
        break;

      default:
        console.log('Не одна из четыр функций не выбрана!');
        break;
    }
  }

  // если кнопка в режиме "Проверить"
  else if (startBtn.getAttribute('data-state') === 'check') {
    switch (curentVars.choice) {
      case 1:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
        if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!confirm('Не верно :( Подумай еще немного!')) {
          afterChecked();
        }
        break;

      case 2:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
        if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!confirm('Не верно :( Подумай еще немного!')) {
          afterChecked();
        }
        break;
      case 3:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
        if (inputParse(inputs[0]).a == curentVars.a && inputParse(inputs[0]).b == curentVars.b) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!confirm('Не верно :( Подумай еще немного!')) {
          afterChecked();
        }
        break;

      case 4:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b && convertToFloat(inputs[3]) == curentVars.c && convertToFloat(inputs[2]) == curentVars.d) {
        if (
          inputParse(inputs[0]).a == curentVars.a &&
          inputParse(inputs[0]).b == curentVars.b &&
          inputParse(inputs[1]).a == curentVars.c &&
          inputParse(inputs[1]).b == curentVars.d
        ) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!confirm('Не верно :( Подумай еще немного!')) {
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
  btnCheck.setAttribute('data-state', 'start');
  btnCheck.innerText = 'Старт';
  inputs[0].value = '';
  inputs[1].value = '';
}

(function() {
  for (let n = 0; n < inputs.length; n++) {
    // если поле ввода в фокусе, то дать талице opacity: 1;
    inputs[n].onfocus = function() {
      table.style.opacity = '1';
    };
    // если поле ввода потеряло фокус, то дать таблице opacity: 0.3;
    inputs[n].onblur = function(e) {
      // table.style.opacity = "0.3";
      if (e.target.value == '') {
        console.log(e.target.value);
        table.removeAttribute('style');
      }
    };
    // во время ввода заменить значение data-state на check, что бы назначить кнопке другой поведение
    inputs[n].oninput = function(e) {
      if (e.target.value !== '') {
        btnCheck.setAttribute('data-state', 'check');
        btnCheck.innerText = 'Проверить';
      } else {
        btnCheck.setAttribute('data-state', 'start');
        btnCheck.innerText = 'Старт';
      }
    };
  }
})();
