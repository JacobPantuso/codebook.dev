// redirect to login page if href contains # but append the # to the href in the login page
if (window.location.href.indexOf("#") > -1) {
    window.location.href = "login.html#" + window.location.href.split("#")[1];
}

// when all elements in contact are filled out, set the submit button to green
function checkContact() {
    var name = document.getElementById("name").value;
    var problem = document.getElementById("problem").value;
    var type = document.getElementById("mySelect").value;
    var submit = document.getElementById("submit");
    if (name != "" && type != "select" && problem != "") {
        submit.style.backgroundColor = "#4CAF50";
        submit.style.pointerEvents = "all";
    }
}

function bootUp() {
    themeToggle();
    newTab("1");
    // grab language from local storage
    var language = localStorage.getItem("language");
    console.log(language);
    if (language == null) {
        language = "javascript";
    } else {
        changeLanguage(language);
    }
    // grab first name from netlify identity
    var name = netlifyIdentity.currentUser().user_metadata.full_name.split(" ")[0];
    document.getElementById("hey-there-code").innerHTML = "Hey " + name + "!<i class='fa-solid fa-hands-clapping'></i></i>";

    /*scannerText = document.getElementById("scanner-text");
    checkmark = document.getElementById("checkmark");
    webpage = document.getElementById("webpage");
    webpage.style.pointerEvents = "none";
    scannerText.innerHTML = "Verifying your browser before you can fully access <span class=\"color\">codebook.dev</span>";
    scannerWindow = document.getElementById("scanner");
    // wait 2 seconds then change text in scannerText
    setTimeout(function() {
        document.getElementById("scanner-container").style.width = "40%";
        scannerText.innerHTML = "A few more seconds, encrypting your connection.";
    }, 3000);
    setTimeout(function() {
        document.getElementById("scanner-container").style.width = "20%";
        checkmark.style.display = "block";
        document.getElementById("loader").style.display = "none";
        scannerText.innerHTML = "Welcome to <span class='color'>codebook.dev</span>";
        webpage.style = "";
    }, 4500);
    setTimeout(function() {
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
    setTimeout(function() {
        scannerWindow.style.display = "none";
    }, 6500);*/
}

function checkSubmit() {
    var name = document.getElementById("name").value;
    var submit = document.getElementById("submit");
    if (name != "") {
        submit.style.backgroundColor = "#4CAF50";
        submit.style.pointerEvents = "all";
        submit.removeAttribute("disabled");
    } else {
        submit.style.backgroundColor = "red";
        submit.style.pointerEvents = "none";
    }
}

function hideInfoPopup() {
    var info = document.getElementById("info");
    info.style.display = "none";
    var terminal = document.getElementById("terminal");
    terminal.style.marginTop = "0px";
}

function themeToggle() {
    var themeList = document.getElementById("theme-search");
    // initiate a dictionairy where a theme and its corresponding ace theme is stored
    var themesDark = new Object();
    var themesDark = {
        "Ambiance": "ace/theme/ambiance",
        "Cobalt": "ace/theme/cobalt",
        "Clouds Midnight": "ace/theme/clouds_midnight",
        "Dracula": "ace/theme/dracula",
        "Green on Black": "ace/theme/gob",
        "Pastel on Dark": "ace/theme/pastel_on_dark",
        "Tomorrow Night Blue": "ace/theme/tomorrow_night_blue",
        "Tomorrow Night Bright": "ace/theme/tomorrow_night_bright",
        "Tomorrow Night Eighties": "ace/theme/tomorrow_night_eighties",
        "Twilight": "ace/theme/twilight",
        "Vibrant Ink": "ace/theme/vibrant_ink"
    };
    var themesLight = new Object();
    var themesLight = {
        "Chrome": "ace/theme/chrome",
        "Clouds": "ace/theme/clouds",
        "Crimson Editor": "ace/theme/crimson_editor",
        "Dawn": "ace/theme/dawn",
        "Dreamweaver": "ace/theme/dreamweaver",
        "Eclipse": "ace/theme/eclipse",
        "GitHub": "ace/theme/github",
        "iPlastic": "ace/theme/iPlastic",
        "Katzemilch": "ace/theme/katzemilch",
        "Kuroir": "ace/theme/kuroir",
        "Solarized Light": "ace/theme/solarized_light",
        "SQL Server": "ace/theme/sql_server",
        "TextMate": "ace/theme/textmate",
        "Tomorrow": "ace/theme/tomorrow",
        "Xcode": "ace/theme/xcode"
    };
    if (document.getElementById("theme-toggle").classList.contains("dark")) {
        document.getElementById("theme-toggle").classList.remove("dark")
        document.getElementById("theme-toggle").classList.add("light")
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/clouds");
        document.getElementById("selected-theme").innerHTML = "Clouds";
        themeList.innerHTML = "";
        for (const [key, value] of Object.entries(themesLight)) {
            themeList.innerHTML += '<li><a href="#" onclick="changeTheme(\'' + value + '\', \'' + key + '\')">' + key + '</a></li>';
        }
    } else if (document.getElementById("theme-toggle").classList.contains("light")) {
        document.getElementById("theme-toggle").classList.remove("light")
        document.getElementById("theme-toggle").classList.add("dark")
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/dracula");
        document.getElementById("selected-theme").innerHTML = "Dracula";
        themeList.innerHTML = "";
        for (const [key, value] of Object.entries(themesDark)) {
            themeList.innerHTML += '<li><a href="#" onclick="changeTheme(\'' + value + '\', \'' + key + '\')">' + key + '</a></li>';
        }
    }
}

function changeTheme(theme, name) {
    var editor = ace.edit("editor");
    editor.setTheme(theme);
    document.getElementById("selected-theme").innerHTML = name;
    hideSetting();
}

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("lang-search");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function toggleSetting(name) {
    var menuToOpen = document.getElementById(name);
    var tooltip = document.getElementById(name + "-tooltip");
    var icon = document.getElementById("nav-" + name);
    if (menuToOpen.style.display != "flex") {
        hideSetting();
        menuToOpen.style.display = "flex";
        icon.classList.add("active");
        tooltip.style.visibility = "hidden";
    } else {
        hideSetting();
        menuToOpen.style.display = "";
        icon.classList.remove("active");
        tooltip.style.visibility = "";
    }
}

// Change Currently Selected Tab
function changeTab(button) {
    var newTab = document.getElementById(button);
    var oldTab = document.getElementsByClassName("selectedtab");

    if (oldTab.length == 0) {
        newTab.classList.add("selectedtab");
    } else {
        remTab = document.getElementsByClassName("selectedtab").item(0);
        remTab.classList.remove("selectedtab");
        newTab.classList.add("selectedtab");
    }
    var editor = ace.edit("editor");
    editor.setSession(sessions[button]);
    var lang = editor.session.$modeId;
    var langName = lang.split("/").pop();
    if (langName == "c_cpp") {
        langName = "cpp";
    }
    changeDoc(langName, "false");
}

var sessions = new Object();
var numOfTabs = 0;

function newTab() {
    var tabList = document.getElementById("tab-list");
    numOfTabs += 1;
    tabList.innerHTML += "<button id=\"" + numOfTabs + "\"><span onclick=\"changeTab(\'" + numOfTabs + "\')\">file.js</span><a onclick=\"closeTab(\'" + numOfTabs + "\')\"><i class=\"fa-solid fa-xmark tab-close-icon\"></i></a></button>";
    newSession(String(numOfTabs));
    changeLanguage(localStorage.getItem("language"));
    changeTab(numOfTabs, "true");
}

function newSession(name) {
    var editor = ace.edit("editor");
    var ses = ace.createEditSession("// Edit Session " + name);
    sessions[name] = ses;
    editor.setSession(ses);
}

function closeTab(id) {
    document.getElementById(id).remove();
}

function hideSetting() {
    // this function is a helper function to hide other cards if a new one is trying to be opened
    var arr = ["settings", "language", "theme"];
    for (var card in arr) {
        var menuToClose = document.getElementById(arr[card]);
        var tooltip = document.getElementById(arr[card] + "-tooltip");
        var icon = document.getElementById("nav-" + arr[card]);
        menuToClose.style.display = "";
        icon.classList.remove("active");
        tooltip.style.visibility = "";
    }
}

function disableCompilation(language) {
    var run_btn = document.getElementById("run-btn");
    var terminal = document.getElementById("terminal");
    var termHide = document.getElementById("terminal-hide");
    disabledLang = document.getElementById("disabled-lang");
    run_btn.classList.add("disabled");
    terminal.style.display = "none";
    disabledLang.innerHTML = language;
    termHide.style.display = "flex";
}

function enableCompilation() {
    var run_btn = document.getElementById("run-btn");
    var terminal = document.getElementById("terminal");
    var termHide = document.getElementById("terminal-hide");
    run_btn.classList.remove("disabled");
    terminal.style.display = "flex";
    termHide.style.display = "none";
}

function changeDoc(name) {
    var langdoc = document.getElementById("lang-doc");
    var langicon = document.getElementById("lang-icon");
    var doc = new Object();
    var doc = {
        "python": "https://docs.python.org/3/",
        "cpp": "https://devdocs.io/cpp/",
        "css": "https://developer.mozilla.org/en-US/docs/Web/CSS",
        "html": "https://developer.mozilla.org/en-US/docs/Web/HTML",
        "java": "https://docs.oracle.com/en/java/javase/19/",
        "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        "swift": "https://www.swift.org/documentation/"
    };
    if (name == "HTML" || name == "CSS") {
        disableCompilation(name);
    } else {
        enableCompilation();
    }
    langdoc.href = doc[name];
    selected = document.getElementById("selected-lang");
    langicon.src = "images/icons/" + name + ".svg";
}

// Change Selected Language
function changeLanguage(selection, tabChange) {
    var language = document.getElementById("language");
    var currLang = document.getElementById("selected-lang");
    var icon = document.getElementById("nav-language");
    var editor = ace.edit("editor");
    var text = document.getElementById("lang-change-text");
    currLang.innerHTML = selection;
    text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to ' + selection;
    var lang = new Object();
    var lang = {
        "cpp": "ace/mode/c_cpp",
        "css": "ace/mode/css",
        "html": "ace/mode/html",
        "java": "ace/mode/java",
        "javascript": "ace/mode/javascript",
        "python": "ace/mode/python",
        "swift": "ace/mode/swift"
    };
    if (selection == "HTML" || selection == "CSS") {
        disableCompilation(selection);
    } else {
        enableCompilation();
    }
    if (selection == "cpp") {
        currLang.innerHTML = "C++";
        text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to C++';
    }
    changeDoc(selection);
    editor.session.setMode(lang[selection.toLowerCase()]);
    localStorage.setItem("language", selection);
    language.style.display = "none";
    icon.classList.remove("active");
    if (tabChange == "false") { animateLangChange('success'); }
}

//animate lang change to slide up from bottom of screen
function animateLangChange(bool) {
    var lang = document.getElementById("lang-change");
    if (bool == "success") {
        lang.animate([
            { bottom: "-50px" },
            { bottom: "0px" }
        ], {
            duration: 1000,
            iterations: 1,
            easing: "ease-in-out"
        });
        lang.style.bottom = "0px";
        setTimeout(function () {
            lang.animate([
                { bottom: "0px" },
                { bottom: "-50px" }
            ], {
                duration: 1000,
                iterations: 1,
                easing: "ease-in-out"
            });
        }
            , 5000);
        setTimeout(function () {
            lang.style.bottom = "-50px";
        }
            , 6000);
    } else if (bool == "error") {
        var langText = document.getElementById("lang-change-text");
        langText.style.backgroundColor = "rgb(255, 102, 0)";
        lang.animate([
            { bottom: "-50px" },
            { bottom: "0px" }
        ], {
            duration: 1000,
            iterations: 1,
            easing: "ease-in-out"
        });
        lang.style.bottom = "0px";
        setTimeout(function () {
            lang.animate([
                { bottom: "0px" },
                { bottom: "-50px" }
            ], {
                duration: 1000,
                iterations: 1,
                easing: "ease-in-out"
            });
        }
            , 5000);
        setTimeout(function () {
            lang.style.bottom = "-50px";
            langText.style.backgroundColor = "rgb(56, 157, 56)";
        }
            , 6000);
    }
}

if (window.location.href.match('login.html') != null) {
    var urlParams = new URLSearchParams(window.location.search);
    var display = urlParams.get('name');
    document.getElementById("name").innerHTML = "Hey, " + display + " 👋🏼";
}

/*window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  };*/

