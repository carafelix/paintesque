"use strict";
// ------------- DOM Elements ---------------
const main = document.querySelector('#main');
const options = document.querySelector('#options');
const paint = document.querySelector('#paint');
const slider = document.querySelector('#slider');
const output = document.querySelector('output');
// ------------- Elements Atributtes --------
slider.addEventListener('change', onSliderValueChange);
// ------------- Functions ------------------
function getArea(dimension) {
    let area = dimension * dimension;
    return area;
}
function getCanvasElements(area) {
    const divisArr = [];
    for (let i = 0; i < area; i++) {
        let i = document.createElement('div');
        i.classList.add('paint-divis');
        i.addEventListener('mouseover', (e) => checkMouseDown(e));
        i.addEventListener('mousedown', (e) => clickMouse(e));
        i.setAttribute('draggable', 'false');
        divisArr.push(i);
    }
    return divisArr;
}
function appendAllDivis(arr) {
    arr.forEach(div => paint.appendChild(div));
}
function drawCanvas() {
    appendAllDivis(getCanvasElements(getArea(+slider.value)));
}
function cleanCanvas() {
    while (paint.firstChild) {
        paint.removeChild(paint.firstChild);
    }
}
function clickMouse(e) {
    e.target.classList.add('colored');
}
function checkMouseDown(e) {
    if ((e.buttons === 1)) {
        e.target.classList.add('colored');
    }
}
function onSliderValueChange() {
    output.innerText = `${slider.value} x ${slider.value}`;
    cleanCanvas();
    drawCanvas();
}
// initial
output.innerText = `${slider.value} x ${slider.value}`;
appendAllDivis(getCanvasElements(getArea(+slider.value)));
