/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


class Hoteles {
    dom;
    modal; // login modal

    state;  // state variables: if any
    selected;

    constructor() {
        this.state = {
            hoteles: []
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#hoteles>#modal'));
        this.dom.querySelector('#search').addEventListener('click', e => this.hotelesSearch());
        this.renderHoteles();
        this.selected = null;
    }

    render = () => {
        const html = `
            ${this.renderBody()}
            ${this.renderModal()}
        `;
        var rootContent = document.createElement('div');
        rootContent.id = 'hoteles';
        rootContent.innerHTML = html;
        return rootContent;
    }

    renderBody = () => {
        var html = `
        <div id="list" class="container">     
            <div class="card bg-light">
                <div class="card-body mx-auto w-75" >
                    <form id="form">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Name</span>
                            <input id="name" type="text" class="form-control">
                          <div class="btn-toolbar">
                            <div class="btn-group me-2"><button type="button" class="btn btn-primary" id="search">Search</button> </div>
                            <div class="btn-group me-2"><button type="button" class="btn btn-primary" id="top3">Top 3</button> </div>                        
                          </div>  
                        </div>
                    </form>

                    <div class="table-responsive " style="max-height: 300px; overflow: auto">
                        <table class="table table-striped table-hover">
                            <thead><tr><th scope="col">Hoteles</th><th scope="col">Calificacion</th></tr></thead>
                            <tbody id="listbody">
                            </tbody>
                        </table>
                    </div>                 
                </div>
            </div>
        </div>         
    `;
        return html;
    }

    renderModal = () => {
        const html = `
                    <div id="modal" class="modal fade" tabindex="-1">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header" >
                       <span style='margin-left:4em;font-weight: bold;'id="modalHeaderDescription">empty</span> 
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   </div>
                        <div class="modal-body" id="modal-body">
                            <h4 class="card-title mt-3 text-center" id="card-modal">Empty</h4>  
                        </div>   
               </div>         
           </div>          
       </div>  
        `;
        return html;
    }

    renderHoteles = async() => {
        await this.listHoteles();
        var listBody = this.dom.querySelector('#listbody');
        listBody.innerHTML = "";
        this.state.hoteles.forEach(e => this.row(listBody, e));
    }

    row = (list, h) => {
        var promedio = this.calculaPromedio(h.calificaciones);
        var tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="./images/${h.id}"></td><td>${h.nombre}</td><td>${promedio}</td>
        
        `;
        tr.addEventListener('dblclick', e => this.modalCalificacion(h));
        list.append(tr);
    }

    modalCalificacion = (h) => {
        var header = this.dom.querySelector('#modalHeaderDescription');
        header.textContent = `Calificacion del hotel ${h.nombre}`;
        var modalBody = this.dom.querySelector('#modal-body');
        modalBody.replaceChildren();
        modalBody.appendChild(this.createNombreComponent());
        modalBody.appendChild(this.createComentarioComponent());
        modalBody.appendChild(this.createCalificacionValueComponent());
        modalBody.appendChild(this.createButtonElement());
        this.selected = h;
        this.modal.show();
    }

    createNombreComponent = () => {
        const container = document.createElement('div');
        container.classList.add('input-group', 'd-flex', 'w-100', 'contentInfo');

        const span = document.createElement('span');
        span.classList.add('input-group-text', 'span-expand', 'label');
        span.textContent = 'Nombre';

        const input = document.createElement('input');
        input.id = 'Nombre';
        input.type = 'text';
        input.classList.add('input-group-text', 'required');

        container.appendChild(span);
        container.appendChild(input);

        return container;
    }

    createComentarioComponent = () => {
        const container = document.createElement('div');
        container.classList.add('input-group', 'd-flex', 'w-100', 'contentInfo');

        const span = document.createElement('span');
        span.classList.add('input-group-text', 'span-expand', 'label');
        span.textContent = 'Comentario';

        const textarea = document.createElement('textarea');
        textarea.id = 'Comentario';
        textarea.classList.add('form-control');
        textarea.rows = 5; // Establece el número de filas visibles

        container.appendChild(span);
        container.appendChild(textarea);

        return container;
    }

    createCalificacionValueComponent = () => {
        const container2 = document.createElement('div');
        container2.classList.add('input-group', 'd-flex', 'w-100', 'contentInfo');
        const container = document.createElement('div');
        container.classList.add('container');

        const flexContainer = document.createElement('div');
        flexContainer.classList.add('d-flex', 'justify-content-between');

        const opciones = [
            {id: '1', value: 1, label: '1'},
            {id: '2', value: 2, label: '2'},
            {id: '3', value: 3, label: '3'},
            {id: '4', value: 4, label: '4'},
            {id: '5', value: 5, label: '5'}
        ];

        opciones.forEach(opcion => {
            const formCheck = document.createElement('div');
            formCheck.classList.add('form-check');

            const input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = 'radio';
            input.name = 'CalificacionValue';
            input.id = opcion.id;
            input.value = opcion.value;
            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.htmlFor = opcion.id;
            label.textContent = opcion.label;

            formCheck.appendChild(input);
            formCheck.appendChild(label);

            flexContainer.appendChild(formCheck);
        });
        const span = document.createElement('span');
        span.classList.add('input-group-text', 'span-expand', 'label');
        span.textContent = 'Calificacion';
        container2.appendChild(span);
        container.appendChild(flexContainer);
        container2.appendChild(container);

        return container2;
    }

    createButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'Enviar';
        button.type = 'button';
        button.classList.add('btn', 'btn-primary', 'btn-comprar');
        button.textContent = 'Enviar';

        button.addEventListener('click', e => this.sendCalificacion());

        return button;
    }

    sendCalificacion = async() => {
        var nombreValue = this.dom.querySelector('#Nombre').value;
        var comentarioValue = this.dom.querySelector('#Comentario').value;
        var selectedRadio = document.querySelector('input[name="CalificacionValue"]:checked').value;

        const Calificacion = {
            id: this.selected.id,
            nombre: nombreValue,
            comentario: comentarioValue,
            puntaje: selectedRadio
        }

        var direccion = `${backend}/hoteles/newCalificacion/${Calificacion.id}`;
        try {
            const response = await fetch(direccion, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Calificacion)
            });

            if (!response.ok) {
                // Manejar el error de la solicitud
                alert('Error al obtener las preguntas');
                return;
            }

            this.renderHoteles();
            this.modal.hide();

        } catch (error) {
            console.log('Error:', error);
        }



    }

    calculaPromedio = (calificaciones) => {
        var promedio = 0;
        calificaciones.forEach(e => {
            promedio += e.puntaje
        });
        promedio = promedio / calificaciones.length;
        // Redondear el promedio a un decimal
        promedio = promedio.toFixed(1);
        // Formatear el promedio usando toLocaleString()
        var promedioFormateado = promedio.toLocaleString();
        return promedio;
    }

    listHoteles = async() => {
        var direccion = `${backend}/hoteles/top3`;
        try {
            const response = await fetch(direccion, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Manejar el error de la solicitud
                alert('Error al obtener las preguntas');
                return;
            }

            const hoteles = await response.json();
            this.state.hoteles = hoteles;

        } catch (error) {
            console.log('Error:', error);
        }


    }

    hotelesSearch = async() => {
        var text = this.dom.querySelector('#name').value;
        if (text === "") {
            this.renderHoteles();
        } else {
            await this.listHotelesSearch(text);
            var listBody = this.dom.querySelector('#listbody');
            listBody.innerHTML = "";
            this.state.hoteles.forEach(e => this.row(listBody, e));
        }
    }

    listHotelesSearch = async(text) => {
        var direccion = `${backend}/hoteles/${text}`;
        try {
            const response = await fetch(direccion, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Manejar el error de la solicitud
                alert('Error al obtener las preguntas');
                return;
            }

            const hoteles = await response.json();
            this.state.hoteles = hoteles;

        } catch (error) {
            console.log('Error:', error);
        }


    }

}