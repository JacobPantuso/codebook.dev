
import * as toolbar from "./toolbar.js";
import * as tabFunc from "./editor-tab.js";
import axios from "./npm/node_modules/axios";
import API_KEY from "./api.js";

export function compile(tabs) {
    var currTab = tabFunc.getCurrentTab(tabs);
    console.log(currTab);
    var code = currTab.getSession().getValue();
    console.log(code);
    
    const axios = require("axios");

    const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {base64_encoded: 'true', fields: '*'},
    headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: '{"language_id":63,"source_code":'+ code +'}'
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export function initialize() {
    if (localStorage.length != 0) {
        // restore all tabs from local storage
        encrpytConnection(true);
        toolbar.toggleTheme();
    } else {
        encrpytConnection(false);
        toolbar.toggleTheme();
    }
    // grab first name from netlify identity
    //var name = netlifyIdentity.currentUser().user_metadata.full_name.split(" ")[0];
    //document.getElementById("hey-there-code").innerHTML = "Hey " + name + "!<i class='fa-solid fa-hands-clapping'></i></i>";
}

export function encrpytConnection(previousVisitor) {
    var scannerText = document.getElementById("scanner-text");
    var checkmark = document.getElementById("checkmark");
    var webpage = document.getElementById("webpage");
    webpage.style.pointerEvents = "";
    scannerText.innerHTML = "Verifying your browser before you can fully access <span class=\"color\">codebook.dev</span>";
    var scannerWindow = document.getElementById("scanner");
    // wait 2 seconds then change text in scannerText
    if (previousVisitor) {
        setTimeout(function () {
            document.getElementById("scanner-container").style.width = "39%";
            scannerText.innerHTML = "Checking your browser for <span class=\"color\">codebook.dev</span> personalization.";
            toolbar.changeFontSize("set",localStorage.getItem("fontSize"));
            if (localStorage.getItem("theme")!=null) toolbar.changeTheme(localStorage.getItem("theme"), localStorage.getItem("theme-name"), localStorage.getItem("theme-type"));
            var language = localStorage.getItem("language");
            if (language == null) {
                language = "javascript";
            } else {
                toolbar.changeLanguage(language);
            }
        }, 2000);
    }
    setTimeout(function () {
        document.getElementById("scanner-container").style.width = "33%";
        checkmark.style.display = "block";
        document.getElementById("loader").style.display = "none";
        if (previousVisitor) {
            scannerText.innerHTML = "Applied all personalization to <span class=\"color\">codebook.dev</span>";
        } else {
            document.getElementById("scanner-container").style.width = "20%";
            scannerText.innerHTML = "Welcome to <span class=\"color\">codebook.dev</span>";
        }
        webpage.style = "";
    }, 2300);
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
    }, 3300);
    setTimeout(function () {
        scannerWindow.style.display = "none";
    }, 4300);
}