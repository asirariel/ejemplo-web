let numero1 = 1;

let numero2 = 2;

let numero3 = 3;  

let numero4 = 4;

let numero5 = 5;

let numero6 = 6;

let numero7 = 7;  

let numero8 = 8;

let numero9 = 9;

let numero10 = 10;  


function escribir(valor){
 let resultado = document.getElementById("resultado");

 if (resultado.value == "0") {
  resultado.value = valor;
 }
 else { 
    resultado.value += valor;   
 }
}

function borrar (){
 let resultado = document.getElementById("resultado");
 resultado.value = "0";
}

function igual () { 
    let resultado = document.getElementById("resultado");   

}