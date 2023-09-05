

const tituloTarea = document.getElementById('titulo-tarea');
const descripcionTarea = document.getElementById('descripcion-tarea');
const fecha = document.getElementById('fecha');
const listaPendiente = document.getElementById('lista-pendiente');
const botonEnviar = document.getElementById('boton-enviar');

let tareaArray = [];
let tituloTareaEdicion;
// ARREGLO PARA GUARDAR LAS TAREAS EN EL LOCALSTORAGE

window.addEventListener('load', () => {
    console.log('Esto se ejecuta al finalizar la carga de todos los scripts y todo el html')
    tituloTareaEdicion = document.getElementById('titulo-tarea-edicion');
})

const crearTareaArray = (tituloTarea,descripcionTarea, fecha) =>{
    let itemArray = {
        tituloTarea : tituloTarea,
        descripcionTarea : descripcionTarea,
        fecha : fecha,
        estado : "Pendiente", 
    }
    tareaArray.push(itemArray);
    return itemArray;
}

const guardarDB = () =>{
    localStorage.setItem('tarea',JSON.stringify(tareaArray));
    imprimirDB();
}

imprimirDB = () =>{
    listaPendiente.innerHTML ='';

    const tareaArrayString = localStorage.getItem('tarea');
    tareaArray = tareaArrayString ? JSON.parse(tareaArrayString):[];


    if(tareaArray.length === 0){
        tareaArray = [];
    }else{
        tareaArray.forEach((tarea, index) =>{

            const titulo = document.createElement('h2')
            titulo.className = 'titulo text-center';
            titulo.textContent = 'Pendiete';

            const card = document.createElement('div');
            card.className = 'card mt-4 ';
            card.id = index;
            card.draggable = true;
            card.ondragstart = dragStartHandler; 

            const cardHeader = document.createElement('h5');
            cardHeader.className = 'card-header fw-bold text-center';
            cardHeader.textContent = tarea.tituloTarea;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.textContent = tarea.descripcionTarea;

            const cardTextFecha = document.createElement('p');
            cardTextFecha.className = 'card-text';
            cardTextFecha.textContent = tarea.fecha;



            const buttonModificar = document.createElement('button');
            buttonModificar.className = 'btn btn-primary me-2 ';
            buttonModificar.textContent = 'Modificar';
            buttonModificar.addEventListener('click', () => {

                tituloTareaEdicion.value = tarea.tituloTarea;
                document.getElementById('descripcion-tarea-edicion').value =tarea.descripcionTarea;
                document.getElementById('fecha-edicion').value = tarea.fecha;

                document.getElementById('guardarCambios').addEventListener('click', () =>{
                    

                    tarea.tituloTarea = tituloTareaEdicion.value;
                    tarea.descripcionTarea = document.getElementById('descripcion-tarea-edicion').value;
                    tarea.fecha = document.getElementById('fecha-edicion').value;

                    localStorage.setItem('tarea', JSON.stringify(tareaArray));

                    imprimirDB();

                    const modal = new bootstrap.Modal(document.getElementById('editarTareaModal'));
                    modal.hide();
                });
                document.getElementById('cerrar').addEventListener('click', () =>{
                    modal.hide();
                });

                 const modal = new bootstrap.Modal(editarTareaModal);
                 modal.show();
 
            });

            const buttonEliminar = document.createElement('button');
            buttonEliminar.className = 'btn btn-primary';
            buttonEliminar.textContent = 'Eliminar';
            buttonEliminar.addEventListener('click', () =>{
                tareaArray.splice(index,1);

                localStorage.setItem('tarea', JSON.stringify(tareaArray));
                imprimirDB();
            });

            cardBody.appendChild(cardText);
            cardBody.appendChild(cardTextFecha);
            cardBody.appendChild(buttonModificar);
            cardBody.appendChild(buttonEliminar);

            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            listaPendiente.appendChild(card);

        });
    }
}

botonEnviar.addEventListener('click', (e) => {

    e.preventDefault();
    
    let tituloTareaValue = tituloTarea.value.trim();
    let descripcionTareaValue = descripcionTarea.value.trim();
    let fechaValue = fecha.value.trim();

    if(tituloTareaValue && descripcionTareaValue && fechaValue){
        crearTareaArray(tituloTareaValue, descripcionTareaValue, fechaValue);
        crearTarea();
        guardarDB();
    }else{
        alert('¡Por favor ingrese una tarea!');
    }
});

 document.addEventListener('DOMContentLoaded', imprimirDB);

  listaPendiente.addEventListener('click', (e) =>{

      e.preventDefault();
  });

function crearTarea(){
    if(tituloTarea.value && descripcionTarea.value && fecha.value){

        let nuevaTarea = document.createElement('h2');
        nuevaTarea.className = 'text-center fs-3 fw-bold';
        nuevaTarea.textContent = 'Pendiente';
        

        let card = document.createElement('div');
        card.className = 'card mt-5 p-5';
        card.draggable = true;
        card.ondragstart ='drag(event)';
        

        let cardHeader = document.createElement('h5');
        cardHeader.className = 'card-header bg-danger';
        cardHeader.textContent = tituloTarea.value;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = descripcionTarea.value;

        let cardTextFecha = document.createElement('p');
        cardTextFecha.className = 'card-text';
        cardTextFecha.textContent = fecha.value;

        let buttonModificar = document.createElement('button');
        buttonModificar.className = 'btn btn-primary me-2';
        buttonModificar.textContent = 'Modificar';

        let buttonEliminar = document.createElement('button');
        buttonEliminar.className = 'btn btn-primary';
        buttonEliminar.textContent = 'Eliminar';

        cardBody.appendChild(cardText);
        cardBody.appendChild(cardTextFecha);
        cardBody.appendChild(buttonModificar);
        cardBody.appendChild(buttonEliminar);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        listaPendiente.appendChild(card);
        listaPendiente.appendChild(nuevaTarea);

        tituloTarea.value = '';
        descripcionTarea.value = '';
        fecha.value = '';
        
    }else{
        alert('¡Por favor ingrese una tarea!')
    }
}

  
function dragStartHandler(event){
    const data = event.target.id;
    event.dataTransfer.setData("tarjeta", data);
  }
  
  function dragOverHandler(event){
    event.preventDefault();
    
  }
  
  function dropHandler(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("tarjeta");
    const target = event.target;
  
    if (target.classList.contains("drop_zone")) {
      const tareaId = parseInt(data);
  
      if (!isNaN(tareaId) && tareaArray[tareaId]) {
        const tarea = tareaArray[tareaId];
  
        if (target.id === "progreso") {
          tarea.estado = "En progreso";
        } else if (target.id === "terminado") {
          tarea.estado = "Terminado";
        }
  
        const tareaElement = document.getElementById(data);
  
        if (tareaElement) {
          tareaElement.classList.remove("pendiente", "en-progreso", "terminado");
        }
  
        localStorage.setItem("tarea", JSON.stringify(tareaArray));
        target.appendChild(tareaElement);
      }
    }
  }
   
    






