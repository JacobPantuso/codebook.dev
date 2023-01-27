import { changeLanguage } from "./toolbar.js"
ace.require("ace/ext/language_tools");

export class Tab {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.extension = "js";
        this.selected = false;
        this.session = ace.createEditSession("// Edit Session " + name);
        this.session.setOptions({
            enableLiveAutocompletion : true
        })
        this.createTab();
    }

    createTab() {
        var tabList = document.getElementById("tab-list");
        var el = document.createElement("button");
        el.id = "tab-" + this.id;
        el.innerHTML = "<span id=\"" + this.id + "\">file_" + this.id + "." + this.extension + "</span><span class='spacer'></span><a id=\"close-" + this.id + "\"><i class=\"fa-solid fa-xmark tab-close-icon\"></i></a>";
        tabList.appendChild(el);
    }

    changeName(name) {
        this.name = name;
    }

    changeLanguage(language) {
        this.language = language;
    }

    changeTab(tabs) {
        if (!(this.selected)) {
            // Set this Tab to the Selected and Style
            for (var index in tabs) {
                if (tabs[index].isSelected()) {
                    tabs[index].getElem().classList.remove("selectedtab");
                    tabs[index].setSelected(false);
                    break;
                }
            }
            this.getElem().classList.add("selectedtab");
            this.selected = true;
            // Change the Sesssion of the Ace Editor
            var editor = ace.edit("editor");
            editor.setSession(this.session);

            var lang = editor.session.$modeId;
            var langName = lang.split("/").pop();
            if (langName == "c_cpp") {
                langName = "cpp";
            }
        }
    }

    getId() {
        return this.id;
    }

    getElem() {
        return document.getElementById("tab-" + this.id);
    }

    getTab() {
        return document.getElementById(this.id);
    }

    getName() {
        return this.name;
    }

    getExtension() {
        return this.extension;
    }

    setSelected(bool) {
        this.selected = bool;
    }

    isSelected() {
        return this.selected;
    }

    getSession() {
        return this.session;
    }
}

export function createNewTab(tabs) {
    var tab = new Tab((tabs.length + 1), "file_" + (tabs.length + 1));
    tab.getTab().addEventListener("click", function () {
        tab.changeTab(tabs)
    });
    document.getElementById("close-" + tab.getId()).addEventListener("click", function () {
        closeTab(tab.getId(), tabs);
    });
    tab.getElem
    tabs.push(tab);
    tab.changeTab(tabs);
    changeLanguage("javascript", "true")
}

export function closeTab(id, tabs) {
    console.log("Closing Tab " + id);
    var tab = null;

    for (var index in tabs) {
        if (tabs[index].getId() == id) {
            tab = tabs[index];
            var indexOfTab = index;
            tabs.splice(index, 1);
        }
    }

    if (tab != null) {
        document.getElementById("tab-" + id).remove();
    }

    tabs[0].changeTab(tabs);
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

export function getCurrentTab(tabs) {
    for (var index in tabs) {
        if (tabs[index].isSelected) {
            return tabs[index];
        }
    }
    return null;
}