/*function validateInput() {
  // Get the input values
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // check to see if email follows standard formate
  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    document.getElementById("email").style.boxShadow = "0px 0px 30px 0px rgb(255, 0, 0)";
  }
  else if (password.length < 8 || password == "") {
    console.log("Password is too short");
    document.getElementById("password").style.boxShadow = "0px 0px 30px 0px rgb(255, 0, 0)";
  }
} */

// if the url does not contain ?name=, redirect to index.html
if (window.location.href.indexOf("?name=") == -1) {
  window.location.href = "/index.html";
}

// if the user is not logged in and the url contains code.html, redirect to index.html
if (window.location.href.indexOf("code.html") != -1 && !netlifyIdentity.currentUser()) {
  window.location.href = "/index.html";
}

netlifyIdentity.on("login", () => {
  // if the url contains ?name= and the user is logged in, redirect to code.html
  if (window.location.href.indexOf("?name=") != -1) {
    window.location.href = "/code.html";
  }
});

netlifyIdentity.on("logout", () => {
  window.location.href = "/index.html";
});