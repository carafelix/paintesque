// ------------- DOM Elements ---------------
var paint = document.querySelector('#paint');
var slider = document.querySelector('#slider');
var output = document.querySelector('output');
var pencil = document.querySelector('#pencil');
var opacityCheckbox = document.querySelector('#opacity');
// ------------- Elements Atributtes --------
var sliderValues = [8, 16, 24, 32, 40, 48, 64];
slider.addEventListener('change', onSliderValueChange);
opacityCheckbox.addEventListener('change', function () { return onSliderValueChange(); });
// ------------- Functions ------------------
//#region ------ create and append paint divis 
function getArea(n) {
    return n * n;
}
function getCanvasElements(area) {
    var divisArr = [];
    for (var i = 0; i < area; i++) {
        var i_1 = document.createElement('div');
        i_1.classList.add('paint-divis');
        if (!checkToggleMode()) {
            i_1.addEventListener('mouseover', function (e) { return checkMouse(e); });
            i_1.addEventListener('mousedown', function (e) { return checkMouse(e); });
        }
        if (checkToggleMode()) {
            i_1.addEventListener('mouseover', function (e) { return checkMouseModeTwo(e); });
            i_1.addEventListener('mousedown', function (e) { return checkMouseModeTwo(e); });
        }
        i_1.addEventListener('contextmenu', function (e) { return e.preventDefault(); });
        i_1.setAttribute('data-opa', '0');
        divisArr.push(i_1);
    }
    return divisArr;
}
function appendAllDivisAndSizeThem(arr) {
    var divSize = "".concat(getDivisSize(getNumberFromArr(+slider.value, sliderValues)), "px");
    arr.forEach(function (div) { return div.style.width = divSize; });
    arr.forEach(function (div) { return div.style.height = divSize; });
    arr.forEach(function (div) { return paint.appendChild(div); });
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
    output.innerText = "Pen Size: ".concat(Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues))), " px");
}
//#endregion
//#region ------ Mouse paint -----------------
function checkMouse(e) {
    if (e.buttons === 1) {
        e.target.style.backgroundColor = "".concat(pencil.value);
    }
    else if (e.buttons === 2) {
        e.target.style.backgroundColor = "#f9f9f9";
    }
}
// ----------- Opacity mode ------------------
function getHexOpacity(hex) {
    return hexObject[hex];
}
var hexObject = {
    '100': 'a0',
    '110': 'b0',
    '120': 'c0',
    '130': 'd0',
    '140': 'e0'
};
function checkMouseModeTwo(e) {
    if (e.buttons === 1) {
        if (e.target !== null) {
            var target = e.target;
            if (target.dataset.opa !== undefined) {
                if (+(target.dataset.opa) < 80) {
                    target.dataset.opa = "".concat((+(target.dataset.opa) + 20));
                    target.style.backgroundColor = "".concat(pencil.value).concat(target.dataset.opa);
                }
                else if ((+(target.dataset.opa) >= 80) && ((+(target.dataset.opa) < 140))) {
                    target.dataset.opa = "".concat((+(target.dataset.opa) + 20));
                    target.style.backgroundColor = "".concat(pencil.value).concat(getHexOpacity(target.dataset.opa));
                }
                else {
                    target.style.backgroundColor = "".concat(pencil.value);
                }
            }
        }
    }
    else if (e.buttons === 2) {
        if (e.target !== null) {
            var target = e.target;
            if (target.dataset.opa !== undefined) {
                if ((+(target.dataset.opa) <= 100) && (+(target.dataset.opa) > 20)) {
                    target.dataset.opa = "".concat((+(target.dataset.opa) - 20));
                    target.style.backgroundColor = "".concat(pencil.value).concat(target.dataset.opa);
                }
                else if ((+(target.dataset.opa) >= 80) && ((+(target.dataset.opa) <= 140))) {
                    target.style.backgroundColor = "".concat(pencil.value).concat(getHexOpacity(target.dataset.opa));
                    target.dataset.opa = "".concat((+(target.dataset.opa) - 20));
                }
                else {
                    target.dataset.opa = '0';
                    target.style.backgroundColor = '#f9f9f9';
                }
            }
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
//#endregion
// initial
appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));
output.innerText = "Pen Size: ".concat(Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues))), " px");
