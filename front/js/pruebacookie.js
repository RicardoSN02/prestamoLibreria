import { setCookie, getCookie } from './cookieFunctions.js';

setCookie("miTokenSecreto");

const token = getCookie("token");
console.log(token);