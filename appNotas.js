const tituloNota = document.getElementById("titulo-nota");
const nota = document.getElementById("nota");
const boton = document.getElementById("boton");
const listaNotas = document.getElementById("lista-notas");
const formulario = document.getElementById("formulario");

let arrayNotas = [];

// ARREGLO PARA GUARDAR LAS NOTAS PARA EL LOCALSTORAGE
const crearNotaArray = (tituloNota, nota) =>{
  let itemArray = {
    tituloNota :tituloNota,
    nota:nota,
    
  }  
  arrayNotas.push(itemArray);
  return itemArray;
}

const guardarDB = () => {

  localStorage.setItem('nota',JSON.stringify(arrayNotas));
  imprimirDB();


}

const imprimirDB = () =>{
  listaNotas.innerHTML = '';
   

  if(arrayNotas === null){
    
    arrayNotas = [];


  }else{
    arrayNotas.forEach((nota, index) => {  
      const card = document.createElement('div');
      card.className = 'card me-4 mt-4';

      const cardHeader = document.createElement('h5');
      cardHeader.className = 'card-header';
      cardHeader.textContent = nota.tituloNota;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = nota.nota;

      const buttonModificar = document.createElement('button');
      buttonModificar.className = 'btn btn-primary me-2';
      buttonModificar.textContent = 'Modificar';
      buttonModificar.addEventListener('click',() =>{
        // logica del boton modificar
     

        document.getElementById('titulo-nota-edicion').value = nota.tituloNota;
        document.getElementById('nota-edicion').value = nota.nota;

        document.getElementById('guardarCambios').addEventListener('click', () =>{

          nota.tituloNota = document.getElementById('titulo-nota-edicion').value;
          nota.nota = document.getElementById('nota-edicion').value;

          localStorage.setItem('nota', JSON.stringify(arrayNotas));

          imprimirDB();

          const modal = new bootstrap.Modal(document.getElementById('editarNotaModal'));
          modal.hide();
        });

        document.getElementById('cerrar').addEventListener('click',() =>{
          modal.hide();
        })


        const modal = new bootstrap.Modal(document.getElementById('editarNotaModal'));
        modal.show();

      });

      const buttonEliminar = document.createElement('button');
      buttonEliminar.className = 'btn btn-primary ';
      buttonEliminar.textContent = 'Eliminar';
      buttonEliminar.addEventListener('click', () =>{
        // Logica del boton eliminar
        arrayNotas.splice(index, 1);

        localStorage.setItem('nota', JSON.stringify(arrayNotas));

        imprimirDB();
      });

      cardBody.appendChild(cardText);
      cardBody.appendChild(buttonModificar);
      cardBody.appendChild(buttonEliminar);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      listaNotas.appendChild(card);
    });
  }
}

boton.addEventListener('click',(e) => {
  e.preventDefault();
  let tituloNotaValue = tituloNota.value.trim();
  let notaValue = nota.value.trim();


  if (tituloNotaValue && notaValue) {
    crearNotaArray(tituloNotaValue, notaValue);
    crearNota();
    guardarDB();
  } else {
    alert("¡Por favor ingrese una nota!");
  }

});

document.addEventListener('DOMContentLoaded',imprimirDB);

listaNotas.addEventListener('click', (e) =>{

  e.preventDefault();

});




function crearNota() {
  if (tituloNota.value && nota.value) {
    let nuevaNota = document.createElement("div");
    nuevaNota.className = "card me-4 mt-4";

    let cardHeader = document.createElement("h5");
    cardHeader.className = "card-header";
    cardHeader.textContent = tituloNota.value;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = nota.value;

    let buttonModificar = document.createElement("button");
    buttonModificar.className = " btn btn-primary me-2";
    buttonModificar.textContent = "Modificar";

    let buttonEliminar = document.createElement("button");
    buttonEliminar.className = "btn btn-primary";
    buttonEliminar.textContent = "Eliminar";


    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonModificar);
    cardBody.appendChild(buttonEliminar);

    nuevaNota.appendChild(cardHeader);
    nuevaNota.appendChild(cardBody);

   listaNotas.appendChild(nuevaNota);

   tituloNota.value = "";
   nota.value = "";

  } else {
    alert("¡Por favor ingrese una nota!");
  }
}



