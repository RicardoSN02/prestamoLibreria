// Función para establecer una cookie
function setCookie(username, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "username=" + username + ";" + expires + ";path=/";
  }
  
  // Función para obtener el valor de una cookie por su nombre
  function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name + "=") === 0) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }
  
  // Función para verificar si el usuario está logueado
  function checkLogin() {
    const username = getCookie("username");
    if (username !== "") {
      alert("Bienvenido de nuevo, " + username + "!");
    } else {
      const userInput = prompt("Introduce tu nombre de usuario:");
      if (userInput !== "" && userInput !== null) {
        setCookie(userInput, 30); // La cookie expirará en 30 días
        alert("¡Bienvenido, " + userInput + "!");
      }
    }
  }
  
  // Verificar el estado de inicio de sesión al cargar la página
  window.onload = function() {
    checkLogin();
  };