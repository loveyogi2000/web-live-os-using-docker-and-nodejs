// js for for windows splitter
$(document).ready(function() {
  $(".panel-left").resizable({
    handleSelector: ".splitter",
    resizeHeight: false
  });

  $(".panel-top").resizable({
    handleSelector: ".splitter-horizontal",
    resizeWidth: false
  });
});



$(document).ready(function() {
  const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  // Get the login and register links
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");

  // Hide the login and register links if the auth-token cookie is present
  if (authToken) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  }
});




function copyEvent(id) {
  var str = document.getElementById(id).textContent;
  var el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}



