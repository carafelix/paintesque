// mostly borrowed code ;)
// https://parzibyte.me/blog/2019/07/11/html-a-imagen-html2canvas-screenshot-de-pagina-web/

const   ssBtn = document.querySelector("#screenshot"); // El botón que desencadena
const   canvas = document.querySelector("#paint"); // A qué le tomamos la foto

// Agregar el listener al botón
ssBtn.addEventListener("click", () => {

    canvas.classList.toggle('left-shadow');
    setTimeout(() => {
        canvas.classList.toggle('left-shadow');
      }, 3000);


  html2canvas(canvas) // Llamar a html2canvas y pasarle el elemento
    .then(canvas => {
      // Cuando se resuelva la promesa traerá el canvas
      // Crear un elemento <a>
      let link = document.createElement('a');
      link.download = "Your-art";
      // Convertir la imagen a Base64
      link.href = canvas.toDataURL();
      
      // Hacer click en él
      link.click();
    })
});



