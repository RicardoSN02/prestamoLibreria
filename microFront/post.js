class Post extends HTMLElement {
	
	constructor() {
		super();
	}
	connectedCallback() {
	
		const shadow = this.attachShadow({ mode: "open" });		 
		this.#agregaEstilo(shadow);	
		this.#render(shadow);

	}
	#render(shadow){
		shadow.innerHTML += `
		<div class="containerBusqueda custom-search">
		<input class="inputBusqueda" type="text" placeholder="Búsqueda en categoría" id="busquedaInput">
		<button class="btn btn-dark" onclick="buscar()">Buscar</button>
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
	
}
window.customElements.define('busqueda-filtro', Post);
