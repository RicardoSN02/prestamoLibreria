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
  