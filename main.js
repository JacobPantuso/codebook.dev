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
    if (name == "language") {
        var language = document.getElementById("language");
        var tooltip = document.getElementById("lang-tooltip");
        var icon = document.getElementsByClassName("fa-solid fa-file-code")[0];

        if (language.style.display == "") {
            language.style.display = "flex";
            tooltip.style.visibility = "hidden";
            icon.setAttribute('id', 'icon-solid-click');
        } else {
            language.style.display = "";
            icon.removeAttribute('id');
            tooltip.style.visibility = "";
        }
    }
}

function changeLanguage(selection) {
    var language = document.getElementById("language");
    var currLang = document.getElementById("selected-lang");
    var icon = document.getElementsByClassName("fa-solid fa-file-code")[0];
    var editor = ace.edit("editor");
    var langdoc = document.getElementById("lang-doc");
    var langicon = document.getElementById("lang-icon");
    var text = document.getElementById("lang-change-text");
    if (currLang.innerHTML == selection) {
        text.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> ' + selection + ' is already selected'; 
        animateLangChange('error');
        language.style.display = "none";
        icon.removeAttribute('id');
        return;
    }

    switch (selection) {
        case "ASP":
            currLang.innerHTML = "ASP";
            langdoc.href = "https://learn.microsoft.com/en-us/previous-versions/iis/6.0-sdk/ms524929(v=vs.90)";
            langicon.src = "images/icons/asp.png";
            editor.session.setMode("ace/mode/asp");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to ASP'; 
            animateLangChange('success');
            break;
        case "C":
            currLang.innerHTML = "C";
            langdoc.href = "https://devdocs.io/c/";
            langicon.src = "images/icons/c.svg";
            editor.session.setMode("ace/mode/c_cpp");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to C'; 
            animateLangChange('success');
            break;
        case "CPP":
            currLang.innerHTML = "C++";
            langdoc.href = "https://devdocs.io/cpp/";
            langicon.src = "images/icons/cpp.svg";
            editor.session.setMode("ace/mode/c_cpp");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to C++'; 
            animateLangChange('success');
            break;
        case "CSS":
            currLang.innerHTML = "CSS";
            langdoc.href = "https://developer.mozilla.org/en-US/docs/Web/CSS";
            langicon.src = "images/icons/css.svg";
            editor.session.setMode("ace/mode/css");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to CSS'; 
            animateLangChange('success');
            break;
        case "HTML":
            currLang.innerHTML = "HTML";
            langdoc.href = "https://developer.mozilla.org/en-US/docs/Web/HTML";
            langicon.src = "images/icons/html.svg";
            editor.session.setMode("ace/mode/html");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to HTML'; 
            animateLangChange('success');
            break;
        case "Java":
            currLang.innerHTML = "Java";
            langdoc.href = "https://docs.oracle.com/en/java/javase/19/";
            langicon.src = "images/icons/java.svg";
            editor.session.setMode("ace/mode/java");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to Java'; 
            animateLangChange('success');
            break;
        case "JavaScript":
            currLang.innerHTML = "JavaScript";
            langdoc.href = "https://developer.mozilla.org/en-US/docs/Web/JavaScript";
            langicon.src = "images/icons/js.svg";
            editor.session.setMode("ace/mode/javascript");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to JavaScript'; 
            animateLangChange('success');
            break;
        case "Python":
            currLang.innerHTML = "Python";
            langdoc.href = "https://docs.python.org/3/";
            langicon.src = "images/icons/python.svg";
            editor.session.setMode("ace/mode/python");
            language.style.display = "none";
            icon.removeAttribute('id');
            text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to Python'; 
            animateLangChange('success');
            break;
        case "Swift":
            currLang.innerHTML = "Swift";
            langdoc.href = "https://www.swift.org/documentation/";
            langicon.src = "images/icons/swift.svg";
            editor.session.setMode("ace/mode/swift");
            language.style.display = "none";
            icon.removeAttribute('id');
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