function drawGrid({ canvas, setStep }) {
  const grid = canvas.getContext('2d');
  const gridWidth = canvas.width;
  const gridHeight = canvas.height;
  const step = setStep || 25;

  grid.strokeStyle = 'grey';
  grid.lineWidth = 1;

  grid.beginPath();

  for (let i = gridWidth / 2 + step; i < gridWidth - step; i += step) {
    grid.moveTo(step * 2, i);
    grid.lineTo(gridWidth - step * 2, i);
  }

  for (let i = gridWidth / 2 - step; i > step; i -= step) {
    grid.moveTo(step * 2, i);
    grid.lineTo(gridWidth - step * 2, i);
  }

  for (let i = gridHeight / 2 + step; i < gridHeight - step; i += step) {
    grid.moveTo(i, step * 2);
    grid.lineTo(i, gridHeight - step * 2);
  }

  for (let i = gridHeight / 2 - step; i > step; i -= step) {
    grid.moveTo(i, step * 2);
    grid.lineTo(i, gridHeight - step * 2);
  }

  grid.stroke();
}

drawGrid({
  canvas: document.getElementById('grid'),
  setStep: 25,
});
