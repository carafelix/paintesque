"use strict";
// ------------- DOM elements ---------------
const main = document.querySelector('#main');
const options = document.querySelector('#options');
const paint = document.querySelector('#paint');
const slider = document.querySelector('#slider');
const canvas = document.createElement('div');
canvas.setAttribute('id', 'canvas');
// ----------- functions -------------------
function getArea(dimension) {
    let area = dimension * dimension;
    return area;
}
function createCanvasDivs(area) {
    for (let i = 0; i < area; i++) {
        let div = document.createElement('div');
        div.classList.add('paint-divis');
        div.setAttribute('id', `${i}`);
    }
}
createCanvasDivs(getArea(12));
