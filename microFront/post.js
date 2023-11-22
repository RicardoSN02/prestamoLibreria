class Post extends HTMLElement {
	#palabraBuscar = null;
	#buscador = null;
	#resultados = null;
	constructor() {
		super();
	}
	connectedCallback() {
	
		const shadow = this.attachShadow({ mode: "open" });		 
		this.#agregaEstilo(shadow);	
		this.#render(shadow);

		this.#resultados = this.shadowRoot.getElementById('resultadosBusqueda');
		this.#palabraBuscar = shadow.getElementById("busquedaInput");
        this.#buscador = shadow.getElementById("buscador");
        this.#buscador.onclick = () => this.#buscar();

	}
	#render(shadow){
		shadow.innerHTML += `
		<div class="containerBusqueda custom-search">
		<input class="inputBusqueda" type="text" placeholder="Búsqueda en categoría" id="busquedaInput">
		<button class="btn btn-dark" onclick="buscar()" id="buscador">Buscar</button>
	  </div>
	  
	  <div class="containerRadioButton">
		<div class="form-check">
		  <input class="form-check-input tipo-busqueda" type="radio" name="Titulo" id="palabraClave" value="a">
		  <label class="form-check-label" for="palabraClave">Palabra clave</label>
		</div>
	  
		<div class="form-check">
		  <input class="form-check-input tipo-busqueda" type="radio" name="Titulo" id="titulo" value="a">
		  <label class="form-check-label" for="titulo">Título</label>
		</div>
	  
		<div class="form-check">
		  <input class="form-check-input tipo-busqueda" type="radio" name="Titulo" id="autor" value="a">
		  <label class="form-check-label" for="autor">Autor</label>
		</div>
	  
		<div class="form-check">
		  <input class="form-check-input tipo-busqueda" type="radio" name="Titulo" id="editorial" value="a">
		  <label class="form-check-label" for="editorial">Editorial</label>
		</div>
	  </div>
	  
	  <div id="resultadosBusqueda" class="resultadosBusqueda">
	   
	  </div>
		  
		`;	
	}
	#agregaEstilo(shadow){		
		let link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href", "../../microFront/css/post.css");	
		shadow.appendChild(link);
	}
	#buscar(){
		var busquedaInput = this.#palabraBuscar.value.toLowerCase();
	
		fetch('http://localhost:8082/libros/') 
			.then(response => response.json())
			.then(data => {
				var resultadosFiltrados = data.filter(function (item) {
					return item.titulo.toLowerCase().includes(busquedaInput) || 
					item.autor.toLowerCase() === busquedaInput || 
					item.editorial.toLowerCase() === busquedaInput; 
				});
	
				if (!this.#validarBusqueda(busquedaInput, resultadosFiltrados)) {
					return;
				}
	
				var tipoBusqueda = this.shadowRoot.querySelector('.tipo-busqueda:checked');
	
				if (tipoBusqueda) {
					tipoBusqueda = tipoBusqueda.id;
				}
	
				if (tipoBusqueda === 'titulo') {
					this.#mostrarTitulos(resultadosFiltrados);
				} else if (tipoBusqueda === 'autor') {
					this.#mostrarPorAutor(resultadosFiltrados);
				} else if (tipoBusqueda === 'editorial'){
					this.#mostrarEditorial(resultadosFiltrados);
				} else {
					this.#mostrarPalabraClave(resultadosFiltrados);
				}
			})
			.catch(error => console.error('Error al obtener datos de la API:', error));
	}
	
	#mostrarPalabraClave(resultados) {
		var contenedorResultados = this.#resultados;
		contenedorResultados.innerHTML = '';
	
		var busqueda = this.shadowRoot.getElementById('busquedaInput').value.toLowerCase();
	
		var resultadosLimitados = resultados.slice(0, 15);
	
		resultadosLimitados.forEach(libro => {
			var divResultado = document.createElement('div');
			divResultado.classList.add('form-check');
	
			var resaltadoPalabraClave = document.createElement('label');
			resaltadoPalabraClave.classList.add('form-check-label');
			resaltadoPalabraClave.innerHTML = libro.titulo.replace(new RegExp(`(${busqueda})`, 'gi'), '<span class="resaltadoPalabraClave">$1</span>');
	
			var imgResultado = document.createElement('img');
			imgResultado.src = 'data:image/png;base64,' + libro.imagen; 
			imgResultado.alt = libro.titulo;
			imgResultado.classList.add('imagenResultado');
	
			divResultado.appendChild(resaltadoPalabraClave);
			divResultado.appendChild(imgResultado);
	
			divResultado.addEventListener('click', () => this.#abrirBusquedaLibro(libro.idlibro));
	
			contenedorResultados.appendChild(divResultado);
		});
	}
	
	#mostrarTitulos(resultados) {
		var contenedorResultados = this.#resultados;
		contenedorResultados.innerHTML = '';
	
		var resultadosLimitados = resultados.slice(0, 15);
	
		resultadosLimitados.forEach(libro => {
			var divResultado = document.createElement('div');
			divResultado.classList.add('form-check');
	
			var titulo = document.createElement('label');
			titulo.classList.add('form-check-label');
			titulo.innerText = libro.title;
	
			var imagen = document.createElement('img');
			imagen.src = libro.url;
			imagen.alt = libro.title;
			imagen.classList.add('imagenResultado');
	
			divResultado.appendChild(titulo);
			divResultado.appendChild(imagen);

			//divResultado.id = 'resultado-' + libro.id;
	

			divResultado.addEventListener('click', () => this.#abrirBusquedaLibro(libro.id));
	
			contenedorResultados.appendChild(divResultado);
		});
	}
	
	#mostrarPorAutor(resultados) {
		var contenedorResultados = this.#resultados;
		contenedorResultados.innerHTML = '';
	
		var resultadosLimitados = resultados.slice(0, 15);
	
		resultadosLimitados.forEach(libro => {
			var divResultado = document.createElement('div');
			divResultado.classList.add('form-check');
	
			var autor = document.createElement('label');
			autor.classList.add('form-check-label');
			autor.innerText = ` ${libro.title}`;
	
			var imagen = document.createElement('img');
			imagen.src = libro.url;
			imagen.alt = libro.title;
			imagen.classList.add('imagenResultado');
	
			divResultado.appendChild(autor);
			divResultado.appendChild(imagen);
	
			
			//divResultado.id = 'resultado-' + libro.id;
	
		
			divResultado.addEventListener('click', () => this.#abrirBusquedaLibro(libro.id));
	
			contenedorResultados.appendChild(divResultado);
		});
	}
	
	#mostrarEditorial(resultados) {
		var contenedorResultados = this.#resultados;
		contenedorResultados.innerHTML = '';
	
		if (resultados.length > 0) {
			var divResultado = document.createElement('div');
			divResultado.classList.add('form-check');
	
			var inputRadio = document.createElement('input');
			inputRadio.classList.add('form-check-input');
			inputRadio.type = 'radio';
			inputRadio.name = 'Resultado';
			inputRadio.value = resultados[0].title;
	
			var editorial = document.createElement('label');
			editorial.classList.add('form-check-label');
			editorial.innerText = ` ${resultados[0].title}`;
	
			var imagen = document.createElement('img');
			imagen.src = resultados[0].url;
			imagen.alt = resultados[0].title;
			imagen.classList.add('imagenResultado');
	
			divResultado.appendChild(inputRadio);
			divResultado.appendChild(editorial);
			divResultado.appendChild(imagen);
	

			//divResultado.id = 'resultado-' + resultados[0].id;
	
			divResultado.addEventListener('click', () => this.#abrirBusquedaLibro(resultados[0].id));
	
			contenedorResultados.appendChild(divResultado);
		}
	}
	
	#abrirBusquedaLibro(id) {
		
		window.location.href = 'infoLibro.html?id=' + id;
		console.log(`Abrir busquedaLibro con ID: ${id}`);
	}
	#validarBusqueda(busquedaInput, resultados) {
		var tipoBusquedaSeleccionada = this.shadowRoot.querySelector('.tipo-busqueda:checked');
	
		if (!tipoBusquedaSeleccionada || !tipoBusquedaSeleccionada.id) {
			alert('Por favor, seleccione una opción de búsqueda.');
			return false;
		}
	
		var tipoBusqueda = tipoBusquedaSeleccionada.id;
	
		var tipoBusqueda = tipoBusquedaSeleccionada.id;
	
		if (tipoBusqueda === 'titulo') {
		   
			if (busquedaInput.trim() === '') {
				alert('Por favor, ingrese un título para buscar.');
				return false;
			}
	
			if (!resultados.some(item => item.title.toLowerCase() === busquedaInput.toLowerCase())) {
				alert('No se encontraron resultados para el libro con ese título.');
				return false;
			}
		}else if (tipoBusqueda === 'autor'){
			if (busquedaInput.trim() === ''){
				alert('Por favor, ingrese un autor para buscar.');
				return false;
			}
			if (!resultados.some(item => item.albumId.toString() === busquedaInput.toLowerCase())) {
				alert('No se encontraron libros con el autor ingresado.');
				return false;
			}
			
		} else if (tipoBusqueda === 'editorial'){
			if (busquedaInput.trim() === ''){
				alert('Por favor, ingrese un editorial para buscar.');
				return false;
			}
	
			if(!resultados.some(item => item.id.toString () === busquedaInput.toLowerCase())){
				alert('No se encontraron libros con la editorial ingresada.');
				return false;
			}
		}
		 else {
		
			if (busquedaInput.trim() === '') {
				alert('Por favor, ingrese una palabra clave para buscar.');
				return false;
			}
			
			var palabraClaveRegex = /^\S+$/;
			if (!palabraClaveRegex.test(busquedaInput)) {
				alert('La palabra clave no debe contener espacios.');
				return false;
			}
	
			if (resultados.length === 0) {
				alert('No se encontraron resultados de libros con la palabra clave ingresada.');
				return false;
			}
			
		}
	
		return true;
	}
	
}
window.customElements.define('busqueda-filtro', Post);


/*    #buscar(){
        var busquedaInput = this.#palabraBuscar.value.toLowerCase();

        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => {
                var resultadosFiltrados = data.filter(function (item) {
                    return item.title.toLowerCase().includes(busquedaInput) || 
                    item.albumId.toString() === busquedaInput || 
                    item.id.toString() === busquedaInput; //titulo-autor-editorial
                });
    
                if (!this.#validarBusqueda(busquedaInput, resultadosFiltrados)) {
                    return;
                }
    
                var tipoBusqueda = this.shadowRoot.querySelector('.tipo-busqueda:checked');
    
                if (tipoBusqueda) {
                    tipoBusqueda = tipoBusqueda.id;
                }
    
                if (tipoBusqueda === 'titulo') {
                    this.#mostrarTitulos(resultadosFiltrados);
                } else if (tipoBusqueda === 'autor') {
                    this.#mostrarPorAutor(resultadosFiltrados);
                } else if (tipoBusqueda === 'editorial'){
                    this.#mostrarEditorial(resultadosFiltrados);
                }else {
                    this.#mostrarPalabraClave(resultadosFiltrados);
                }
            })
            .catch(error => console.error('Error al obtener datos de la API:', error));
    }

    #mostrarPalabraClave(resultados) {
        var contenedorResultados = this.#resultados;
        contenedorResultados.innerHTML = '';
    
        var busqueda = this.shadowRoot.getElementById('busquedaInput').value.toLowerCase();
    
        var resultadosLimitados = resultados.slice(0, 15);
    
        resultadosLimitados.forEach(palabraClave => {
            var divResultado = document.createElement('div');
            divResultado.classList.add('form-check');
    
            var resaltadoPalabraClave = document.createElement('label');
            resaltadoPalabraClave.classList.add('form-check-label');
            resaltadoPalabraClave.innerHTML = palabraClave.title.replace(new RegExp(`(${busqueda})`, 'gi'), '<span class="resaltadoPalabraClave">$1</span>');
    
            var imgResultado = document.createElement('img');
            imgResultado.src = palabraClave.url;
            imgResultado.alt = palabraClave.title;
            imgResultado.classList.add('imagenResultado');
    
            divResultado.appendChild(resaltadoPalabraClave);
            divResultado.appendChild(imgResultado);
    

        //  divResultado.id = 'resultado-' + palabraClave.id;

            divResultado.addEventListener('click', () => this.#abrirBusquedaLibro(palabraClave.id));
    
            contenedorResultados.appendChild(divResultado);
        });
    }
    
*/