drawGrid(25);

function drawGrid(step){

"use strict"
var canvas2 = document.getElementById("grid");
var grid = canvas2.getContext("2d");

var gridWidth = canvas2.width,
    gridHeight = canvas2.height;

var step = step || 25;

grid.strokeStyle = "black";
grid.lineWidth = 1;

grid.beginPath();
for (var i = gridWidth / 2 + step; i < gridWidth - step; i += step) {
    grid.moveTo(0, i);
    grid.lineTo(gridWidth, i);
}

for (var i = gridWidth / 2 -step; i > step; i -= step) {
    grid.moveTo(0, i);
    grid.lineTo(gridWidth, i);
}

for (var i = gridHeight / 2 + step; i < gridHeight - step; i += step) {
    grid.moveTo(i, 0);
    grid.lineTo(i, gridHeight);
}

for (var i = gridHeight / 2 - step; i > step; i -= step) {
    grid.moveTo(i, 0);
    grid.lineTo(i, gridHeight);
}
grid.stroke();

};
