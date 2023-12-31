// ------------- DOM Elements ---------------
const paint = document.querySelector('#paint') as HTMLDivElement;
const slider = document.querySelector('#slider') as HTMLInputElement;
const output = document.querySelector('output') as HTMLOutputElement;
const pencil = document.querySelector('#pencil') as HTMLInputElement;
const opacityCheckbox = document.querySelector('#opacity') as HTMLInputElement;

// ------------- Elements Atributtes --------

const sliderValues: number[] = [8,16,24,32,40,48,64];

slider.addEventListener('change', onSliderValueChange);

opacityCheckbox.addEventListener('change', ()=> onSliderValueChange() );

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
            if (!checkToggleMode()){
                i.addEventListener('mouseover', (e:MouseEvent)=> checkMouse(e));
                i.addEventListener('mousedown', (e:MouseEvent)=> checkMouse(e));
            }
            if (checkToggleMode()){
                i.addEventListener('mouseover', (e:MouseEvent)=> checkMouseModeTwo(e));
                i.addEventListener('mousedown', (e:MouseEvent)=> checkMouseModeTwo(e));
            }
            i.addEventListener('contextmenu', (e)=> e.preventDefault());
            i.setAttribute('data-opa','0');
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

function checkMouse(e: MouseEvent){

    if (e.buttons === 1){

        (e.target as HTMLDivElement).style.backgroundColor = `${pencil.value}`;

    } else if (e.buttons === 2) {

    (e.target as HTMLDivElement).style.backgroundColor = `#f9f9f9`;

    }
}


// ----------- Opacity mode ------------------

function getHexOpacity(hex:string):string{
    return hexObject[hex as keyof object];
}

const hexObject = {
    '100': 'a0',
    '110': 'b0',
    '120': 'c0',
    '130': 'd0',
    '140': 'e0'
};

function checkMouseModeTwo(e: MouseEvent){

    if (e.buttons === 1){

        if(e.target !== null){

            const target = e.target as HTMLDivElement;

            if(target.dataset.opa !== undefined){

                if (+(target.dataset.opa) < 80){

                    target.dataset.opa = `${(+(target.dataset.opa)+20)}`;

                    (target as HTMLDivElement).style.backgroundColor = `${pencil.value}${target.dataset.opa}`;

                } else if ((+(target.dataset.opa) >= 80) && ((+(target.dataset.opa) < 140))) {

                    target.dataset.opa = `${(+(target.dataset.opa)+20)}`;

                    (target as HTMLDivElement).style.backgroundColor = `${pencil.value}${getHexOpacity(target.dataset.opa)}`;

                } else {
                    (target as HTMLDivElement).style.backgroundColor = `${pencil.value}`;
        }}}

        

    } else if (e.buttons === 2) {

        if(e.target !== null){
            
            const target = e.target as HTMLDivElement;

            if(target.dataset.opa !== undefined){

                if ((+(target.dataset.opa) <= 100) && (+(target.dataset.opa) > 20 )){

                    target.dataset.opa = `${(+(target.dataset.opa)-20)}`;

                    (target as HTMLDivElement).style.backgroundColor = `${pencil.value}${target.dataset.opa}`;


                } else if ((+(target.dataset.opa) >= 80) && ((+(target.dataset.opa) <= 140))) {

                    (target as HTMLDivElement).style.backgroundColor = `${pencil.value}${getHexOpacity(target.dataset.opa)}`;
                    target.dataset.opa = `${(+(target.dataset.opa)-20)}`;


                } else {
                    target.dataset.opa = '0';
                    (target as HTMLDivElement).style.backgroundColor = '#f9f9f9';
                }

    }}}
}

function checkToggleMode(){
    
    if (opacityCheckbox.checked) {

        return true

    } else return false
}



//#endregion


// initial

appendAllDivisAndSizeThem(getCanvasElements(getArea(getNumberFromArr(+slider.value, sliderValues))));

output.innerText = `Pen Size: ${Math.floor(getDivisSize(getNumberFromArr(+slider.value, sliderValues)))} px`;



