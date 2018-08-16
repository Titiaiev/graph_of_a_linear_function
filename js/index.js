/* eslint import/extensions: 0  no-alert: 0 */
import drawGrid from './grid.js';
import Chart from './Chart.js';
import { inputParse } from './inputParse.js';

const app = document.getElementById('app');

const size =
  document.documentElement.clientWidth < document.documentElement.clientHeight
    ? document.documentElement.clientWidth - 100
    : document.documentElement.clientHeight - 100;
console.log(size);
const step = size / 25 || 25;

const gridCanvas = document.createElement('canvas');
gridCanvas.width = size;
gridCanvas.height = size;
gridCanvas.setAttribute('id', 'grid');

document.getElementById('canvases').appendChild(gridCanvas);

drawGrid({
  canvas: gridCanvas,
  setStep: step,
});

const chartCanvas = document.createElement('canvas');
chartCanvas.width = size;
chartCanvas.height = size;
chartCanvas.setAttribute('id', 'chart');

document.getElementById('canvases').appendChild(chartCanvas);

const chart = new Chart({
  canvas: chartCanvas,
  setStep: step,
});

chart.renderCoordinateSystem();

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

function afterChecked() {
  btnCheck.setAttribute('data-state', 'start');
  btnCheck.innerText = 'Старт';
  inputs[0].value = '';
  inputs[1].value = '';
  // chart.renderCoordinateSystem();
}

startBtn.addEventListener('click', () => {
  // если кнопка в режиме "Старт"
  if (startBtn.getAttribute('data-state') === 'start') {
    chart.renderCoordinateSystem();

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
        if (inputParse(inputs[0]).a === curentVars.a && inputParse(inputs[0]).b === curentVars.b) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!window.confirm('Не верно :( Подумай еще немного!')) {
          afterChecked();
        }
        break;

      case 2:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
        if (inputParse(inputs[0]).a === curentVars.a && inputParse(inputs[0]).b === curentVars.b) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!window.confirm('Не верно :( Подумай еще немного!')) {
          afterChecked();
        }
        break;
      case 3:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b) {
        if (inputParse(inputs[0]).a === curentVars.a && inputParse(inputs[0]).b === curentVars.b) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!window.confirm('Не верно :( Подумай еще немного!')) {
          afterChecked();
        }
        break;

      case 4:
        //                if (convertToFloat(inputs[1]) == curentVars.a && convertToFloat(inputs[0]) == curentVars.b && convertToFloat(inputs[3]) == curentVars.c && convertToFloat(inputs[2]) == curentVars.d) {
        if (
          inputParse(inputs[0]).a === curentVars.a &&
          inputParse(inputs[0]).b === curentVars.b &&
          inputParse(inputs[1]).a === curentVars.c &&
          inputParse(inputs[1]).b === curentVars.d
        ) {
          alert('Крутяк! Это правильный ответ!');
          afterChecked();
        } else if (!window.confirm('Не верно :( Подумай еще немного!')) {
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

(function init() {
  for (let n = 0; n < inputs.length; n += 1) {
    // если поле ввода в фокусе, то дать талице opacity: 1;
    inputs[n].onfocus = () => {
      table.style.opacity = '1';
    };
    // если поле ввода потеряло фокус, то дать таблице opacity: 0.3;
    inputs[n].onblur = (e) => {
      // table.style.opacity = "0.3";
      if (e.target.value === '') {
        console.log(e.target.value);
        table.removeAttribute('style');
      }
    };
    // во время ввода заменить значение data-state на check, что бы назначить кнопке другой поведение
    inputs[n].oninput = (e) => {
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
