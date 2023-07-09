// ------------- DOM Elements ---------------

const main = document.querySelector('#main') as HTMLDivElement;
const options = document.querySelector('#options') as HTMLDivElement;
const paint = document.querySelector('#paint') as HTMLDivElement;
const slider = document.querySelector('#slider') as HTMLInputElement;
const output = document.querySelector('output') as HTMLOutputElement;

// ------------- Elements Atributtes --------

slider.addEventListener('change', onSliderValueChange)

// ------------- Functions ------------------

function getArea(dimension: number){
    let area: number = dimension*dimension;
    return area;
}

function getCanvasElements(area: number){

    const divisArr: HTMLDivElement[] = []

    for (let i = 0; i<area; i++){
        let i = document.createElement('div') as HTMLDivElement; 
        i.classList.add('paint-divis');
        i.addEventListener('mouseover', (e:MouseEvent)=> checkMouse(e));
        divisArr.push(i);
    }

    return divisArr;
}

function appendAllDivis(arr: HTMLDivElement[]){
    arr.forEach(div => paint.appendChild(div));
}

function drawCanvas(){
    appendAllDivis(getCanvasElements(getArea(+slider.value)));
}
function cleanCanvas(){
    while (paint.firstChild){
        paint.removeChild(paint.firstChild)
    }
}

function checkMouse(e: MouseEvent){

    if ((e.buttons === 1) ){

        (e.target as HTMLDivElement).classList.add('colored')
    }
}

function onSliderValueChange(){
    output.innerText = `${slider.value} x ${slider.value}`;
    cleanCanvas();
    drawCanvas();
}











// initial
output.innerText = `${slider.value} x ${slider.value}`
appendAllDivis(getCanvasElements(getArea(+slider.value)));

