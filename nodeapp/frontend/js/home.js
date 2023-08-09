document.addEventListener("DOMContentLoaded", function() {

  const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // Get the login and register links
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutlink=document.getElementById("logout-link");
  // Hide the login and register links if the auth-token cookie is present
  if (authToken) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  }
  if (!authToken) {
    logoutlink.style.display="none";
  }
  
});


