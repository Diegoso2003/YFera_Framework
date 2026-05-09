import "./carpeta1/misComponentes.comp ";
import "./carpeta2/misEstilos.styles ";

/*
     definicion de variables
*/

int variableEntera = 2;
float variableConDecimales = 10.0;
string variableDeTexto = "Holaaa";
boolean variableBooleana = True; /* or False */
char variableDeUnSoloCaracter = 'a' /* o cualquier código ASCII*/

# los arreglos pueden ser de cualquier tipo, 
# limitados a que solo pueden ser de una dimensión
int[] arregloDeEnteros = [3]; /* arreglo de 3 posiciones */
string[] pokemons = {"Bulbasaur", "Togepy", "Eevee" }; /*  arreglo de 3 dimensiones ya inicializado*/


/* 
    las funciones en este lenguaje serán simples, 
    limitándose únicamente a la interacción con la base de datos de datos, 
    solo lo que se especifica en el cuerpo de las siguientes funciones 
       son las instrucciones válidas
*/


function updatePokemon(int pp, int atack, int id, string goTo){
    # permite ejecutar instrucciones para la base de datos
    # si ocurre un error se debe dejar por defecto que se muestre
      una alerta en el navegador y detener la ejecución de lo siguiente
    # recarga la ejecución de un archivo, en este caso de una variable
    load goTo;
}

function goTo(){
    # recarga la ejecución de todo el archivo principal
    # no se pueden usar funciones dentro de funciones
    load "./main.y";
}


/*
     Esta es la función principal que se encarga de cargar componentes
*/
main {
    @header();	# los componentes se pueden invocar
    while(variableEntera < 10){
        @lineForStyle();
        variableEntera = variableEntera + 1;
    }


    if( variableBooleana ) {
        @cardForProfOak();
    } else {
        @cardForAsh(pokemons_name[i]);
    }

    @footer();
}
