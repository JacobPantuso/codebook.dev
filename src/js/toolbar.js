import * as tab from "./editor-tab.js";

document.body.addEventListener('keyup', function (e) {
    if (e.key == "Escape") {
        hideSetting();
    }
});

export function saveFile(tabs) {
    var currentTab = tab.getCurrentTab(tabs).getSession().getValue();
    var extension = tab.getCurrentTab(tabs).getExtension();
    var blob = new Blob([currentTab], { type: "text/plain;charset=utf-8" });
    saveAs(blob, 'code.' + extension);
}

export function uploadFile(tabs) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        tab.createNewTab(tabs)
        tab.getCurrentTab(tabs).getSession().setValue(reader.result);
    });
    reader.readAsText(document.getElementById('import-code').files[0]);
    hideSetting();
}

export function copyCode(tabs) {
    var currentTab = tab.getCurrentTab(tabs).getSession().getValue();
    navigator.clipboard.writeText(currentTab);
    document.getElementById("lang-change-text").innerHTML = "<i id='copy' class='fa-solid fa-copy'></i> Copied to Clipboard";
    animateLangChange("success");
}

export function allowInput() {
    console.log(document.getElementById("stdin").style.display);
    if (document.getElementById("stdin").style.display == "" || document.getElementById("stdin").style.display == "none") {
        console.log("Allowing input");
        document.getElementById("stdin-disabled").style.display = "none";
        document.getElementById("stdin").style.display = "flex";
        return;
    }
    document.getElementById("stdin").style.display = "none";
    document.getElementById("stdin-disabled").style.display = "flex";
    
}

export function changeEditorMode() {
    var editor = ace.edit("editor");
    if (!document.getElementById("editor-mode").classList.contains("clicked")) {
        editor.setKeyboardHandler("ace/keyboard/vim");
        document.getElementById("editor-mode").classList.add("clicked");
        document.getElementById("vim-mode").innerHTML = "Normal Controls";
    } else {
        editor.setKeyboardHandler("ace/keyboard/vscode");
        document.getElementById("editor-mode").classList.remove("clicked");
        document.getElementById("vim-mode").innerHTML = "VIM Controls";
    }
}

export function changeTabNamePopup(name) {
    document.getElementById("lang-change-text").innerHTML = "<i id='copy' class='fa-solid fa-copy'></i> Tab changed to " + name + "!";
    animateLangChange("success");
}

export function hideSetting() {
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

export function updateThemes(type) {
    var themeList = document.getElementById("theme-search");
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
    if (type == "light") {
        themeList.innerHTML = "";
        for (const [key, value] of Object.entries(themesLight)) {
            themeList.innerHTML += '<li><a href="#" id=\'' + key + '\'>' + key + '</a></li>';
        }
        for (const [key, value] of Object.entries(themesLight)) {
            document.getElementById(key).addEventListener('click', () => {
                changeTheme(value, key, "light")
            });
        }
        if (localStorage.getItem("light-theme") == null) {
            changeTheme("ace/theme/chrome", "Chrome", "light");
        } else {
            changeTheme(localStorage.getItem("light-theme"), localStorage.getItem("light-theme-name"), "light");
        }
    } else if (type == "dark") {
        themeList.innerHTML = "";
        for (const [key, value] of Object.entries(themesDark)) {
            themeList.innerHTML += '<li><a href="#" id=\'' + key + '\'>' + key + '</a></li>';
        }
        for (const [key, value] of Object.entries(themesDark)) {
            document.getElementById(key).addEventListener('click', () => {
                changeTheme(value, key, "dark")
            });
        }
        if (localStorage.getItem("dark-theme") == null) {
            changeTheme("ace/theme/dracula", "Dracula", "dark");
        } else {
            changeTheme(localStorage.getItem("dark-theme"), localStorage.getItem("dark-theme-name"), "dark");
        }
    }
}

export function toggleTheme() {
    if (localStorage.getItem("theme-type") != null) {
        if (document.getElementById("toggle").checked) {
            updateThemes("light");
        } else {
            updateThemes("dark");
        }
    } else {
        updateThemes("dark");
    }
}

export function changeTheme(theme, name, type) {
    console.log("Changing theme to " + name);
    localStorage.removeItem("theme-name");
    var editor = ace.edit("editor");
    editor.setTheme(theme);
    document.getElementById("selected-theme").innerHTML = name;
    if (type == "light") {
        localStorage.setItem("light-theme", theme);
        localStorage.setItem("light-theme-name", name);
    } else if (type == "dark") {
        localStorage.setItem("dark-theme", theme);
        localStorage.setItem("dark-theme-name", name);
    }
    localStorage.setItem("theme-type", type);
    if (type == "") {
        hideSetting();
    }
}

export function search() {
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

export function toggleSetting(name) {
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

export function changeFontSize(operation, amount) {
    var editor = ace.edit("editor");
    if (amount != null && operation == "set") {
        document.getElementById("font-size").innerHTML = amount;
        editor.setOptions({ fontSize: amount + "px" })
        return;
    }
    var fontSize = document.getElementById("font-size").innerHTML;
    if (fontSize == 10 && operation == "down") {
        document.getElementById("font-size-down").style.color = "red";
        return;
    } else if (fontSize == 30 && operation == "up") {
        document.getElementById("font-size-up").style.color = "red";
        return;
    } else {
        document.getElementById("font-size-down").style.color = "white";
        document.getElementById("font-size-up").style.color = "white";
    }
    if (operation == "up") {
        fontSize++;
    } else if (operation == "down") {
        fontSize--;
    }
    document.getElementById("font-size").innerHTML = fontSize;
    editor.setOptions({ fontSize: fontSize + "px" });
}

export function changeDoc(name) {
    console.log("Changing doc to " + name);
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
    if (name.toLowerCase() == "html" || name.toLowerCase() == "css") {
        tab.disableCompilation(name);
    } else {
        console.log("Enabling compilation");
        tab.enableCompilation();
    }
    langdoc.href = doc[name.toLowerCase()];
    var selected = document.getElementById("selected-lang");
    if (name == "c_cpp") {
        langicon.src = "images/icons/cpp.svg";
        return;
    }
    langicon.src = "images/icons/" + name + ".svg";
}

// Change Selected Language
export function changeLanguage(selection, tabChange, tabs) {
    var language = document.getElementById("language");
    var currLang = document.getElementById("selected-lang");
    var icon = document.getElementById("nav-language");
    var editor = ace.edit("editor");
    var text = document.getElementById("lang-change-text");
    // Uppercase first letter
    selection = selection.charAt(0).toUpperCase() + selection.slice(1);
    if (selection.toLowerCase() == "javascript") {
        selection = "JavaScript";
    }
    currLang.innerHTML = selection;
    text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to ' + selection;
    var lang = new Object();
    var lang = {
        "assembly": "ace/mode/assembly_x86",
        "clojure": "ace/mode/clojure",
        "cpp": "ace/mode/c_cpp",
        "css": "ace/mode/css",
        "elixir": "ace/mode/elixir",
        "erlang": "ace/mode/erlang",
        "go": "ace/mode/golang",
        "haskell": "ace/mode/haskell",
        "html": "ace/mode/html",
        "java": "ace/mode/java",
        "javascript": "ace/mode/javascript",
        "kotlin": "ace/mode/kotlin",
        "objective-c": "ace/mode/objectivec",
        "perl": "ace/mode/perl",
        "php": "ace/mode/php",
        "python": "ace/mode/python",
        "ruby": "ace/mode/ruby",
        "rust": "ace/mode/rust",
        "swift": "ace/mode/swift",
        "typescript": "ace/mode/typescript"
    };
    var extension = new Object();
    var extension = {
        "assembly": "asm",
        "clojure": "clj",
        "cpp": "cpp",
        "css": "css",
        "elixir": "ex",
        "erlang": "erl",
        "go": "go",
        "haskell": "hs",
        "html": "html",
        "java": "java",
        "lisp": "lisp",
        "javascript": "js",
        "kotlin": "kt",
        "objective-c": "m",
        "perl": "pl",
        "php": "php",
        "python": "py",
        "ruby": "rb",
        "rust": "rs",
        "swift": "swift",
        "typescript": "ts"
    };
    if (selection == "HTML" || selection == "CSS") {
        tab.disableCompilation(selection);
    } else {
        tab.enableCompilation();
    }
    if (tab.getCurrentTab(tabs) == undefined) {
        return;
    }
    if (selection == "cpp") {
        currLang.innerHTML = "C++";
        text.innerHTML = '<i class="fa-solid fa-retweet"></i> Language Changed to C++';
    }
    console.log("Changing language to " + selection);
    changeDoc(selection);
    tab.getCurrentTab(tabs).changeLanguage(selection);
    tab.getCurrentTab(tabs).setExtension(extension[selection.toLowerCase()]);
    editor.session.setMode(lang[selection.toLowerCase()]);
    localStorage.setItem("language", selection);
    language.style.display = "none";
    icon.classList.remove("active");
    if (tabChange == "false") { animateLangChange('success'); }

}

//animate lang change to slide up from bottom of screen
export function animateLangChange(bool) {
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

export function hideInfoPopup() {
    var info = document.getElementById("info");
    info.style.display = "none";
    var terminal = document.getElementById("terminal");
    terminal.style.marginTop = "0px";
}