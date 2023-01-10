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
    var light = ["Chrome", "Clouds", "Clouds Midnight", "Crimson Editor", "Dawn", "Dreamweaver", "Eclipse", "GitHub", "iPlastic", "Katzemilch", "Kuroir", "Solarized Light", "SQL Server", "TextMate", "Tomorrow"];
    var dark = ["Ambiance", "Cobalt", "Dracula", "Green on Black", "Pastel on Dark", "Tomorrow Night Blue", "Tomorrow Night Bright", "Tomorrow Night Eighties", "Twilight", "Vibrant Ink", "Xcode"];
    if (document.getElementById("theme-toggle").classList.contains("dark")) {
        document.getElementById("theme-toggle").classList.remove("dark")
        document.getElementById("theme-toggle").classList.add("light")
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/clouds");
        document.getElementById("selected-theme").innerHTML = "Clouds";
        themeList.innerHTML = "";
        for (var i = 0; i < light.length; i++) {
            themeList.innerHTML += '<li><a href="#" onclick="javascript:changeTheme(\'' + light[i] + '\')">' + light[i] + '</a></li>';
        }
    } else if (document.getElementById("theme-toggle").classList.contains("light")) {
        document.getElementById("theme-toggle").classList.remove("light")
        document.getElementById("theme-toggle").classList.add("dark")
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/dracula");
        document.getElementById("selected-theme").innerHTML = "Dracula";
        themeList.innerHTML = "";
        for (var i = 0; i < dark.length; i++) {
            themeList.innerHTML += '<li><a href="#" onclick="javascript:changeTheme(\'' + dark[i] + '\')">' + dark[i] + '</a></li>';
        }
    }

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
    if (menuToOpen.style.display == "") {
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
    var oldTab = document.getElementsByClassName("selectedtab").item(0);

    oldTab.classList.remove("selectedtab");
    newTab.classList.add("selectedtab");
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

// Change Selected Language
function changeLanguage(selection) {
    var language = document.getElementById("language");
    var currLang = document.getElementById("selected-lang");
    var icon = document.getElementById("nav-language");
    var editor = ace.edit("editor");
    var langdoc = document.getElementById("lang-doc");
    var langicon = document.getElementById("lang-icon");
    var text = document.getElementById("lang-change-text");
    if (currLang.innerHTML == selection) {
        text.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> ' + selection + ' is already selected';
        animateLangChange('error');
        language.style.display = "none";
        icon.classList.remove("active");
        return;
    }

    switch (selection) {
        case "C":
            currLang.innerHTML = "C";
            langdoc.href = "https://devdocs.io/c/";
            langicon.src = "images/icons/c.svg";
            editor.session.setMode("ace/mode/c_cpp");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to C';
            animateLangChange('success');
            break;
        case "CPP":
            currLang.innerHTML = "C++";
            langdoc.href = "https://devdocs.io/cpp/";
            langicon.src = "images/icons/cpp.svg";
            editor.session.setMode("ace/mode/c_cpp");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to C++';
            animateLangChange('success');
            break;
        case "CSS":
            currLang.innerHTML = "CSS";
            langdoc.href = "https://developer.mozilla.org/en-US/docs/Web/CSS";
            langicon.src = "images/icons/css.svg";
            editor.session.setMode("ace/mode/css");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to CSS';
            animateLangChange('success');
            break;
        case "HTML":
            currLang.innerHTML = "HTML";
            langdoc.href = "https://developer.mozilla.org/en-US/docs/Web/HTML";
            langicon.src = "images/icons/html.svg";
            editor.session.setMode("ace/mode/html");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to HTML';
            animateLangChange('success');
            break;
        case "Java":
            currLang.innerHTML = "Java";
            langdoc.href = "https://docs.oracle.com/en/java/javase/19/";
            langicon.src = "images/icons/java.svg";
            editor.session.setMode("ace/mode/java");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to Java';
            animateLangChange('success');
            break;
        case "JavaScript":
            currLang.innerHTML = "JavaScript";
            langdoc.href = "https://developer.mozilla.org/en-US/docs/Web/JavaScript";
            langicon.src = "images/icons/js.svg";
            editor.session.setMode("ace/mode/javascript");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to JavaScript';
            animateLangChange('success');
            break;
        case "Python":
            currLang.innerHTML = "Python";
            langdoc.href = "https://docs.python.org/3/";
            langicon.src = "images/icons/python.svg";
            editor.session.setMode("ace/mode/python");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to Python';
            animateLangChange('success');
            break;
        case "Swift":
            currLang.innerHTML = "Swift";
            langdoc.href = "https://www.swift.org/documentation/";
            langicon.src = "images/icons/swift.svg";
            editor.session.setMode("ace/mode/swift");
            language.style.display = "none";
            icon.classList.remove("active");
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to Swift';
            animateLangChange('success');
            break;
    }
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
        }
            , 6000);
    }
}

if (window.location.href.match('get-started.html') != null) {
    var urlParams = new URLSearchParams(window.location.search);
    var display = urlParams.get('name');
    document.getElementById("name").innerHTML = "Hey, " + display + " 👋🏼";
}