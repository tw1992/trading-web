import Cookies from 'js-cookie'
export function setEmail(email) {  
  return Cookies.set("email", email);  
}  
export function getEmail() {  
  return Cookies.get("email");  
}  
export function setToken(token) {  
  return Cookies.set("token", token);  
}  
export function getToken() {  
  return Cookies.get("token");  
}  