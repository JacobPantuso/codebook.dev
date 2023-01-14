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

// If the user is logged in and is not a new user redirect to code.html (using netlify redirect)
netlifyIdentity.on("login", () => {
    window.location.href = "/code.html";
});

netlifyIdentity.on("logout", () => {
  window.location.href = "/index.html";
});