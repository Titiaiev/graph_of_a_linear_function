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

  renderCoordinateSystem() {
    const { ctx, width, height } = this;
    this.clear();

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
    function positiveX(step) {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let num = 0;
      for (let xStep = width / 2; xStep < width - step * 2; xStep += step) {
        ctx.moveTo(xStep, height / 2 - 5);
        ctx.lineTo(xStep, height / 2 + 5);

        if (num !== 0) {
          ctx.fillText(num, xStep, height / 2 + 15);
        }
        num += 1;
      }
      ctx.stroke();
    }

    function negativeX(step) {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let number = 0;
      for (let xStep = width / 2; xStep > step * 2; xStep -= step) {
        ctx.moveTo(xStep, height / 2 - 5);
        ctx.lineTo(xStep, height / 2 + 5);

        if (number !== 0) {
          ctx.fillText(-number, xStep, height / 2 - 15);
        }
        number += 1;
      }
      ctx.stroke();
    }

    function negativeY(step) {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let numb = 0;
      for (let yStep = height / 2; yStep < height - step * 2; yStep += step) {
        ctx.moveTo(width / 2 - 5, yStep);
        ctx.lineTo(width / 2 + 5, yStep);

        if (numb !== 0) {
          ctx.fillText(-numb, width / 2 - 20, yStep);
        }
        numb += 1;
      }
      ctx.stroke();
    }

    function positiveY(step) {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.font = '10px sans-serif';
      let numb = 0;
      for (let yStep = height / 2; yStep > step * 2; yStep -= step) {
        ctx.moveTo(width / 2 - 5, yStep);
        ctx.lineTo(width / 2 + 5, yStep);

        if (numb !== 0) {
          ctx.fillText(numb, width / 2 + 20, yStep);
        }
        numb += 1;
      }
      ctx.stroke();
    }

    // нарисовать деления на осях
    positiveX(this.step);
    negativeX(this.step);
    negativeY(this.step);
    positiveY(this.step);
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

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = 'black';
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

export default Chart;
