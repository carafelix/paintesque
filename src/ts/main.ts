// ------------- DOM Elements ---------------

const main = document.querySelector('#main') as HTMLDivElement;
const options = document.querySelector('#options') as HTMLDivElement;
const paint = document.querySelector('#paint') as HTMLDivElement;
const slider = document.querySelector('#slider') as HTMLInputElement;
const output = document.querySelector('output') as HTMLOutputElement;

// ------------- Elements Atributtes --------

const sliderValues: number[] = [8,16,24,32,40,48,64];

slider.addEventListener('change', onSliderValueChange);


// ------------- Functions ------------------

//#region ------ create and append paint divis 

    function getArea(n: number){
        return n*n;
    }

    function getCanvasElements(area: number){

        const divisArr: HTMLDivElement[] = []

        for (let i = 0; i<area; i++){
            let i = document.createElement('div') as HTMLDivElement; 
            i.classList.add('paint-divis');
            i.addEventListener('mouseover', (e:MouseEvent)=> checkMouseDown(e));
            i.addEventListener('mousedown', (e:MouseEvent)=> clickMouse(e));
            divisArr.push(i);
        }

        return divisArr;
    }

    function appendAllDivisAndSizeThem(arr: HTMLDivElement[]){

        let divSize:string = `${getDivisSize(getNumberFromArr(+slider.value, sliderValues))}px`;

        arr.forEach(div => div.style.width = divSize);
        arr.forEach(div => div.style.height = divSize);

        arr.forEach(div => paint.appendChild(div));
    }

    

//#endregion


//#region ------ Canvas Draw and Size -------------

    function getNumberFromArr(index: number,arr: number[]){
        return arr[index]
    }

    function drawCanvas(){

        appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));

    }

    function getDivisSize(wide:number){
        return 640/wide;
    }




    function cleanCanvas(){
        while (paint.firstChild){
            paint.removeChild(paint.firstChild)
        }
    }



    function onSliderValueChange(){

        cleanCanvas();
        drawCanvas();
        output.innerText = `Pen Size: ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))} px`;
    }

//#endregion




//#region ------ Mouse paint -----------------

function clickMouse(e: MouseEvent){
    (e.target as HTMLDivElement).classList.add('colored');
}

function checkMouseDown(e: MouseEvent){

    if ((e.buttons === 1) ){

        (e.target as HTMLDivElement).classList.add('colored')
    }
}














// initial

appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));

output.innerText = `Pen Size: ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))} px`;



