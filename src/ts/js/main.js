"use strict";
// ------------- DOM Elements ---------------
const paint = document.querySelector('#paint');
const slider = document.querySelector('#slider');
const output = document.querySelector('output');
const pencil = document.querySelector('#pencil');
const opacityCheckbox = document.querySelector('#opacity');
// ------------- Elements Atributtes --------
const sliderValues = [8, 16, 24, 32, 40, 48, 64];
slider.addEventListener('change', onSliderValueChange);
opacityCheckbox.addEventListener('change', () => onSliderValueChange());
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
        if (!checkToggleMode()) {
            i.addEventListener('mouseover', (e) => checkMouse(e));
            i.addEventListener('mousedown', (e) => checkMouse(e));
        }
        if (checkToggleMode()) {
            i.addEventListener('mouseover', (e) => checkMouseModeTwo(e));
            i.addEventListener('mousedown', (e) => checkMouseModeTwo(e));
        }
        i.addEventListener('contextmenu', (e) => e.preventDefault());
        i.setAttribute('data-opa', '0');
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
function checkMouse(e) {
    if (e.buttons === 1) {
        e.target.style.backgroundColor = `${pencil.value}`;
    }
    else if (e.buttons === 2) {
        e.target.style.backgroundColor = `#f9f9f9`;
    }
}
// ----------- Opacity mode ------------------
function getHexOpacity(hex) {
    return hexObject[hex];
}
const hexObject = {
    '100': 'a0',
    '110': 'b0',
    '120': 'c0',
    '130': 'd0',
    '140': 'e0'
};
function checkMouseModeTwo(e) {
    if (e.buttons === 1) {
        if (isChanceTrue(e)) {
        }
        else if (+(e.target.dataset.opa) < 80) {
            e.target.dataset.opa = `${(+(e.target.dataset.opa) + 20)}`;
            e.target.style.backgroundColor = `${pencil.value}${e.target.dataset.opa}`;
        }
        else if ((+(e.target.dataset.opa) >= 80) && ((+(e.target.dataset.opa) < 140))) {
            e.target.dataset.opa = `${(+(e.target.dataset.opa) + 20)}`;
            e.target.style.backgroundColor = `${pencil.value}${getHexOpacity(e.target.dataset.opa)}`;
        }
        else {
            e.target.style.backgroundColor = `${pencil.value}`;
        }
    }
    else if (e.buttons === 2) {
        if ((+(e.target.dataset.opa) <= 100) && (+(e.target.dataset.opa) > 20)) {
            e.target.dataset.opa = `${(+(e.target.dataset.opa) - 20)}`;
            e.target.style.backgroundColor = `${pencil.value}${e.target.dataset.opa}`;
        }
        else if ((+(e.target.dataset.opa) >= 80) && ((+(e.target.dataset.opa) <= 140))) {
            e.target.style.backgroundColor = `${pencil.value}${getHexOpacity(e.target.dataset.opa)}`;
            e.target.dataset.opa = `${(+(e.target.dataset.opa) - 20)}`;
        }
        else {
            e.target.dataset.opa = '0';
            e.target.style.backgroundColor = '#f9f9f9';
        }
    }
}
function checkToggleMode() {
    if (opacityCheckbox.checked) {
        return true;
    }
    else
        return false;
}
function isChanceTrue(e) {
    let chance = mathChance();
    if ((chance > 90000) && (chance < 100000)) {
        e.target.dataset.opa = '0';
        e.target.style.backgroundImage = `url(./src/minesweeper/bomb.png) ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))}px`;
        return true;
        // } else if((chance>90000)&&(chance<97500)){
        //         e.target.dataset.opa = '0';
        //         (e.target as HTMLDivElement).style.backgroundImage = 'url(./src/minesweeper/flag.svg)';
        //             return true
        // } else if((chance>97500)&&(chance<=100000)){
        //         e.target.dataset.opa = '0';
        //         (e.target as HTMLDivElement).style.backgroundImage = 'url(./src/minesweeper/flag.svg)';
        //             return true
    }
    else
        return false;
}
function mathChance() {
    return Math.floor(Math.random() * 100000);
}
//#endregion
// initial
appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));
output.innerText = `Pen Size: ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))} px`;
