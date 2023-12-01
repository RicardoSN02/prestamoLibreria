
// Función para establecer una cookie
function setCookie(token) {
    document.cookie = "token=" + token ;
}
  
  // Función para obtener el valor de una cookie por su nombre
 function getCookie(token) {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        .split('=')[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
}
  //de aqui
  // Función para verificar si el usuario está logueado
  export function checkLogin(token) {
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
               alert("sigue activo"); 
            }else{
               alert("no esta activo")
            }
        });
   }
  
