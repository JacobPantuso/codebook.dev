export class Tab {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.extension = "js";
        this.selected = false;
        this.session = ace.createEditSession("// Edit Session " + name);
    }
    
    changeName(name) {
        this.name = name;
    }

    changeLanguage(language) {
        this.language = language;
    }

    changeTab() {
        this.selected = true;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getExtension() {
        return this.extension;
    }

    getSelected() {
        return this.selected;
    }

    getSession() {
        return this.session;
    }
}


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

function newTab() {
    if (numOfTabs <= 9) {
        var tabList = document.getElementById("tab-list");
        var language = localStorage.getItem("language");
        if (language == "JavaScript") {
            language = "js";
        } else if (language == "Python") {
            language = "py";
        }
        idOfTabs += 1;
        numOfTabs += 1;
        tabs.push(idOfTabs);
        tabList.innerHTML += "<button id=\"" + idOfTabs + "\"><span onclick=\"changeTab(\'" + idOfTabs + "\')\">file_" + idOfTabs + "." + language.toLowerCase() + "</span><a onclick=\"closeTab(\'" + idOfTabs + "\')\"><i class=\"fa-solid fa-xmark tab-close-icon\"></i></a></button>";
        newSession(String(idOfTabs));
        changeLanguage(localStorage.getItem("language"));
        changeTab(idOfTabs, "true");
    }
}

function changeTabName(id, text) {
    var currTab = document.getElementById(id);
    currTab.innerHTML = String(text);
    changeTabExtension();
}

function changeTabExtension(id) {
    var language = localStorage.getItem("language");
    if (language == "JavaScript") {
        language = "js";
    } else if (language == "Python") {
        language = "py";
    }
    var currTab = document.getElementById(id);
    currTab.innerHTML = "<span onclick=\"changeTab(\'" + id + "\')\">file_" + id + "." + language.toLowerCase() + "</span><a onclick=\"closeTab(\'" + id + "\')\"><i class=\"fa-solid fa-xmark tab-close-icon\"></i></a>";
}

function getTabById(id) {
    for (index in tabs) {
        if (tabs[index].getId() == id) {
            return tabs[index];
        }
    }
}

function newSession(name) {
    var editor = ace.edit("editor");
    var ses = ace.createEditSession("// Edit Session " + name);
    sessions[name] = ses;
    editor.setSession(ses);
}

function closeTab(id) {
    if (numOfTabs == 1) {

    } else {
        var flag = false;
        if (document.getElementsByClassName("selectedtab")[0] == document.getElementById(id)) {
            flag = true;
        }
        document.getElementById(id).remove();
        tabs = tabs.filter(function (e) { return e != id })
        numOfTabs -= 1;
        if (flag) {
            changeTab(tabs[0]);
        }
    }
}

export function disableCompilation(language) {
    var run_btn = document.getElementById("run-btn");
    var terminal = document.getElementById("terminal");
    var termHide = document.getElementById("terminal-hide");
    var disabledLang = document.getElementById("disabled-lang");
    run_btn.classList.add("disabled");
    terminal.style.display = "none";
    disabledLang.innerHTML = language;
    termHide.style.display = "flex";
}

export function enableCompilation() {
    var run_btn = document.getElementById("run-btn");
    var terminal = document.getElementById("terminal");
    var termHide = document.getElementById("terminal-hide");
    run_btn.classList.remove("disabled");
    terminal.style.display = "flex";
    termHide.style.display = "none";
}