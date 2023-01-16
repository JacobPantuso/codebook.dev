import * as code from "./code.js";
import * as toolbar from "./toolbar.js";
import * as validation from "./validation.js";

// redirect to login page if href contains # but append the # to the href in the login page
if (window.location.href.indexOf("#") > -1) {
    window.location.href = "login.html#" + window.location.href.split("#")[1];
}

if (document.getElementsByClassName("index.html")[0]) {
    document.getElementById("index-form").addEventListener("change", () => {validation.checkSubmit()});
}

if (document.getElementsByClassName("contact.html")[0]) {
    document.getElementById("contact").addEventListener("change", () => {validation.checkContact()});
}

if (document.getElementsByClassName("code.html")[0]) {
    document.getElementsByClassName("code.html")[0].addEventListener("onload", code.initialize());
    document.getElementById("font-size-up").addEventListener('click', () => {
        toolbar.changeFontSize("up")
        localStorage.setItem("fontSize", document.getElementById("font-size").innerHTML);
    });
    document.getElementById("font-size-down").addEventListener('click', () => {
        toolbar.changeFontSize("down")
        localStorage.setItem("fontSize", document.getElementById("font-size").innerHTML);
    });
    document.getElementById("settings-btn").addEventListener('click', () => {toolbar.toggleSetting("settings")});
    document.getElementById("info-popup").addEventListener('click', () => {toolbar.hideInfoPopup()});
    document.getElementById("lang-btn").addEventListener('click', () => {toolbar.toggleSetting("language")});
    document.getElementById("myInput").addEventListener('keyup', () => {toolbar.search("input")});
    document.getElementById("cpp").addEventListener('click', () => {toolbar.changeLanguage("cpp", "false")});
    document.getElementById("java").addEventListener('click', () => {toolbar.changeLanguage("java", "false")});
    document.getElementById("python").addEventListener('click', () => {toolbar.changeLanguage("python", "false")});
    document.getElementById("swift").addEventListener('click', () => {toolbar.changeLanguage("swift", "false")});
    document.getElementById("html").addEventListener('click', () => {toolbar.changeLanguage("HTML", "false")});
    document.getElementById("css").addEventListener('click', () => {toolbar.changeLanguage("CSS", "false")});
    document.getElementById("javascript").addEventListener('click', () => {toolbar.changeLanguage("JavaScript", "false")});
    document.getElementById("theme-btn").onclick = function(){toolbar.toggleSetting("theme")};
    document.getElementById("toggle").addEventListener('click', () => {
        toolbar.toggleTheme();
    });
}


if (window.location.href.match('login.html') != null) {
    var urlParams = new URLSearchParams(window.location.search);
    var display = urlParams.get('name');
    document.getElementById("name").innerHTML = "Hey, " + display + " 👋🏼";
}

/*window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  };*/
// export all functions in the file

