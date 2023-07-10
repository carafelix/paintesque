"use strict";
// ------------- DOM Elements ---------------
const main = document.querySelector('#main');
const options = document.querySelector('#options');
const paint = document.querySelector('#paint');
const slider = document.querySelector('#slider');
const output = document.querySelector('output');
// ------------- Elements Atributtes --------
const sliderValues = [8, 16, 24, 32, 40, 48, 64];
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
    let divSize = `${getDivisSize(getNumberFromArr(+slider.value, sliderValues))}px`;
    arr.forEach(div => div.style.width = divSize);
    arr.forEach(div => div.style.height = divSize);
    arr.forEach(div => paint.appendChild(div));
}
//#endregion
//#region ------ Canvas Draw and Size -------------
function getNumberFromArr(index, arr) {
    return arr[index];
}
function drawCanvas() {
    appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));
}
function getDivisSize(wide) {
    return 640 / wide;
}
function cleanCanvas() {
    while (paint.firstChild) {
        paint.removeChild(paint.firstChild);
    }
}
function onSliderValueChange() {
    cleanCanvas();
    drawCanvas();
    output.innerText = `Pen Size: ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))} px`;
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
appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));
output.innerText = `Pen Size: ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))} px`;
