// ------------- DOM elements ---------------

const main = document.querySelector('#main') as HTMLDivElement;
const options = document.querySelector('#options') as HTMLDivElement;
const paint = document.querySelector('#paint') as HTMLDivElement;
const slider = document.querySelector('#slider') as HTMLInputElement;
const canvas = document.createElement('div') as HTMLDivElement; canvas.setAttribute('id','canvas');

// ----------- functions -------------------

function getArea(dimension: number){
    let area: number = dimension*dimension;
    return area;
}

function createCanvasDivs(area: number){

    for (let i = 0; i<area; i++){
        let div = document.createElement('div') as HTMLDivElement; 
        div.classList.add('paint-divis');
        div.setAttribute('id',`${i}`);
    }
}

createCanvasDivs(getArea(12));


