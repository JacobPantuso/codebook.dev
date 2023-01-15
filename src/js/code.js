
import * as toolbar from "./toolbar.js";
import { Tab } from "./editor-tab.js";

export function initialize() {
    toolbar.themeToggle();
    new Tab(0, "Untitled");
    // grab language from local storage
    var language = localStorage.getItem("language");
    if (language == null) {
        language = "javascript";
    } else {
        toolbar.changeLanguage(language);
    }
    //encrpytConnection();
    // grab first name from netlify identity
    //var name = netlifyIdentity.currentUser().user_metadata.full_name.split(" ")[0];
    //document.getElementById("hey-there-code").innerHTML = "Hey " + name + "!<i class='fa-solid fa-hands-clapping'></i></i>";
}

export function encrpytConnection() {
    scannerText = document.getElementById("scanner-text");
    checkmark = document.getElementById("checkmark");
    webpage = document.getElementById("webpage");
    webpage.style.pointerEvents = "none";
    scannerText.innerHTML = "Verifying your browser before you can fully access <span class=\"color\">codebook.dev</span>";
    scannerWindow = document.getElementById("scanner");
    // wait 2 seconds then change text in scannerText
    setTimeout(function () {
        document.getElementById("scanner-container").style.width = "40%";
        scannerText.innerHTML = "A few more seconds, encrypting your connection.";
    }, 3000);
    setTimeout(function () {
        document.getElementById("scanner-container").style.width = "20%";
        checkmark.style.display = "block";
        document.getElementById("loader").style.display = "none";
        scannerText.innerHTML = "Welcome to <span class='color'>codebook.dev</span>";
        webpage.style = "";
    }, 4500);
    setTimeout(function () {
        // animate the scanenrWindows opacity
        scannerWindow.animate([{
            opacity: 1
        }, {
            opacity: 0
        }], {
            duration: 1000,
            iterations: 1
        });
    }, 5500);
    setTimeout(function () {
        scannerWindow.style.display = "none";
    }, 6500);
}