const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document. querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);

})

function buscarClima (e){
    e.preventDefault();

    //Validar

    const ciudad = document.querySelector('#ciudad');
    const pais = document.querySelector ('#pais');

    //Consultar API9
}