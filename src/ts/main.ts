// ------------- DOM elements ---------------

const main = document.querySelector('#main') as HTMLDivElement;
const options = document.querySelector('#options') as HTMLDivElement;
const paint = document.querySelector('#paint') as HTMLDivElement;
const slider = document.querySelector('#slider') as HTMLInputElement;

// ----------- functions -------------------

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

}

function checkMouse(e: MouseEvent){

    if ((e.buttons === 1) ){

        (e.target as HTMLDivElement).classList.add('colored')
    }
}

appendAllDivis(getCanvasElements(getArea(8)));

