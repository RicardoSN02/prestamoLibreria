function setCookie(token) {

  localStorage.setItem('token', token);

}

function getCookie() {
  const token = localStorage.getItem('token');

  return token;
}
  //de aqui
  // Función para verificar si el usuario está logueado
  function checkLogin(token,pagina) {
    let init = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    };
    fetch(
        'http://localhost:8082/auth/verificar',
        init)
        .then((response) => response.json())
        .then(function(data) {
            if(data.estado === "valido"){
               if(pagina === "login"){
                const usuarioString = 'menuAdministrador.html';
                window.location.href = usuarioString;
               }
            }else{
              if(pagina === "login"){
                  console.log("en login")
              }else{
                const usuarioString = 'login.html';
                window.location.href = usuarioString;
              }

            }
        });
   }

   function cerrarCookie(){
      localStorage.setItem('token', " ");
      const usuarioString = 'login.html';
      window.location.href = usuarioString;
   }
  
   function obtenerId(token) {
    const jwt = token;  // Reemplaza esto con tu JWT real
  
    // Dividir el JWT en sus partes: encabezado, cuerpo y firma
    const [headerEncoded, bodyEncoded, signature] = jwt.split('.');
  
    // Añadir relleno a la cadena del encabezado si es necesario
    const headerEncodedPadded = headerEncoded + '=='.slice((headerEncoded.length + 3) % 4);
  
    // Decodificar el encabezado (primera parte) desde Base64
    const header = JSON.parse(atob(headerEncodedPadded));
  
    // Acceder al ID del JWT si está presente en el encabezado
    const jwtId = header.userId;
  
    console.log('ID del JWT:', jwtId);
    return jwtId;
  }