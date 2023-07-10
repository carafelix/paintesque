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
//#region ------ create and append paint divis 
function getArea(n) {
    return n * n;
}
function getCanvasElements(area) {
    const divisArr = [];
    for (let i = 0; i < area; i++) {
        let i = document.createElement('div');
        i.classList.add('paint-divis');
        i.addEventListener('mouseover', (e) => checkMouseDown(e));
        i.addEventListener('mousedown', (e) => clickMouse(e));
        divisArr.push(i);
    }
    return divisArr;
}
function appendAllDivisAndSizeThem(arr) {
    let divSize = `${getDivisSize(+slider.value)}px`;
    arr.forEach(div => div.style.width = divSize);
    arr.forEach(div => div.style.height = divSize);
    arr.forEach(div => paint.appendChild(div));
}
//#endregion
//#region ------ Canvas Draw and Size
function drawCanvas() {
    appendAllDivisAndSizeThem(getCanvasElements(getArea(+slider.value)));
}
function getDivisSize(wide) {
    return 640 / wide;
}
function setDivisSize(px) {
}
function cleanCanvas() {
    while (paint.firstChild) {
        paint.removeChild(paint.firstChild);
    }
}
function onSliderValueChange() {
    output.innerText = `${slider.value} x ${slider.value}`;
    cleanCanvas();
    drawCanvas();
}
//#endregion
//#region ------ Mouse paint -----------------
function clickMouse(e) {
    e.target.classList.add('colored');
}
function checkMouseDown(e) {
    if ((e.buttons === 1)) {
        e.target.classList.add('colored');
    }
}
// initial
output.innerText = `${slider.value} x ${slider.value}`;
appendAllDivisAndSizeThem(getCanvasElements(getArea(+slider.value)));
