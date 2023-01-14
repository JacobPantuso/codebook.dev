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

netlifyIdentity.on("login", () => {
    if (window.href == "/login.html") {
      window.location.href = "/code.html";
    }
});

netlifyIdentity.on("logout", () => {
  window.location.href = "/index.html";
});