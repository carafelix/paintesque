"use strict";
// ------------- DOM elements ---------------
const main = document.querySelector('#main');
const options = document.querySelector('#options');
const paint = document.querySelector('#paint');
const slider = document.querySelector('#slider');
// ----------- functions -------------------
function getArea(dimension) {
    let area = dimension * dimension;
    return area;
}
function getCanvasElements(area) {
    const divisArr = [];
    for (let i = 0; i < area; i++) {
        let i = document.createElement('div');
        i.classList.add('paint-divis');
        i.addEventListener('mouseover', (e) => checkMouse(e));
        divisArr.push(i);
    }
    return divisArr;
}
function appendAllDivis(arr) {
    arr.forEach(div => paint.appendChild(div));
}
function drawCanvas() {
}
function checkMouse(e) {
    if ((e.buttons === 1)) {
        e.target.classList.add('colored');
    }
}
appendAllDivis(getCanvasElements(getArea(8)));
