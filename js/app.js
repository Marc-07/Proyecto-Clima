const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document. querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);

})

function buscarClima (e){
    e.preventDefault();

    //Validar

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector ('#pais').value;

    if( ciudad ===''     || pais === ''){

        //Hubo un error

        mostrarError('Ambos campos son aobligatorios');

        return;
        
    }

    //Consultar API
    consultarAPI(ciudad, pais);
};

function mostrarError(mensaje){
        
    const alerta = document.querySelector('.bg-red-200');

    if ( !alerta){

        // Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class ='font-bold'>Error!</strong>
        <span class = 'block'>${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove(mensaje);
        }, 3000);   
    }
};

function consultarAPI(ciudad, pais){
    const appId = '60fe984ab2f4ba4ff7dbd42f1bfe2693';
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;


    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {


            limpiarHTML();//Limpiar el HTML previo

            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
                return;
            } 
            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        });
}

function mostrarClima(datos){
    
    const{name, main: {temp, temp_max, temp_min}}=datos;

    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML =`Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML =`Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    

    resultado.appendChild(resultadoDiv);

}

const  kelvinCentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}