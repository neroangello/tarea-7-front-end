console.log('Prueba de que el archivo js está funcionando');


// Funcion que realiza la peticion a la pokeapi
// Retorna el nombre del pkemon y la ruta de los datos adicionales
function getDataPokeheader(){

    // Se crea una promesa
    return new Promise((resolver, reject)=>{
        const url = 'https://pokeapi.co/api/v2/pokemon';

        fetch(url)
        .then(response => {

            return response.json();


        })
        .then(data => {
            resolver(data);
        }
        ).catch(error =>{
            reject(error);
        })

    })

}

// Funcion que realiza la peticion a la API (Contenido)
// Obtiene los datos adicionales, en los que se incluye la imagen
function getDataPokeContent(parUrl){
    return new Promise((resolver, reject)=>{
        const url = parUrl;

        fetch(url)
        .then(response => {

            return response.json();

        })
        .then(data => {
            resolver(data);
        }
        ).catch(error =>{
            reject(error);
        })

    }) 
}


// Funcion que genera las tarjetas con la información
// para incluirla en la página web
function domData(data){

    try {
        const contenedor = document.getElementById("cards");
        
        data.forEach(resultado => {
            contenedor.appendChild(crearTarjeta(resultado.nombre, resultado.imagen, resultado.tipo));
        });

    } catch (error) {
        console.log(data);
    }

}

// Funcion que llama a las funciones que traen la información
// de forma asíncrona y con await
async function showData(){
    
    try{

        const pokemons = [];

        const data = await getDataPokeheader();

        for(let i=0; i<data.results.length; i++){

            let data2 = await getDataPokeContent(data.results[i].url);
            let pokemon = {
                "nombre": data.results[i].name,
                "imagen": data2.sprites.front_default,
                "tipo": data2.types[0].type.name                
            }

            pokemons.push(pokemon);

        }

        domData(pokemons);

    }catch(error){
        console.log("error: " , error);
    }
}

// Se crea la estructura de la tarjeta con los datos 
// que vienen del servicio
function crearTarjeta(nombreTarjeta, rutaImagen, tipo){

    tarjeta = document.createElement("article");
    tarjeta.className = "card"
    tarjeta.classList.add(validarTipo(tipo));    
    div_t = document.createElement("div");
    div_t.className = "text"
    img = document.createElement("img");
    img.src = rutaImagen;
    nombre = document.createElement("h3");
    nombre.innerHTML = nombreTarjeta;

    div_t.appendChild(nombre);
    div_t.appendChild(img);
    tarjeta.appendChild(div_t);   

    return tarjeta;

}

function validarTipo(parTipo){
    const tipos = ['grass', 'water', 'fire', 'bug', 'normal']

    if (tipos.includes(parTipo) === true){
        return parTipo;
    }else{
        return 'default';
    }


}


showData();





