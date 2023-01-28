import { changeLanguage, changeDoc } from "./toolbar.js"
import { changeTabNamePopup } from "./toolbar.js"

var extension_dict = {
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

var languageComments = {
    "assembly": "//",
    "clojure": ";",
    "cpp": "//",
    "css": "/*",
    "elixir": "#",
    "erlang": "%",
    "go": "//",
    "haskell": "--",
    "html": "<!--",
    "java": "//",
    "javascript": "//",
    "kotlin": "//",
    "objective-c": "//",
    "perl": "#",
    "php": "//",
    "python": "#",
    "ruby": "#",
    "rust": "//",
    "swift": "//",
    "typescript": "//"
};

export class Tab {
    constructor(id, name, extension) {
        this.id = id;
        this.name = name;
        this.extension = extension;
        this.selected = false;
        this.setlanguage = Object.keys(extension_dict).find(key => extension_dict[key] === extension);
        this.session = ace.createEditSession(languageComments[Object.keys(extension_dict).find(key => extension_dict[key] === extension)]+" Edit Session " + name);
        this.createTab();
    }

    createTab() {
        var tabList = document.getElementById("tab-list");
        var el = document.createElement("button");
        el.id = "tab-" + this.id;
        el.innerHTML = "<span id=\"" + this.id + "\">file_" + this.id + "." + this.extension + "</span><span class='spacer'></span><a id=\"close-" + this.id + "\"><i class=\"fa-solid fa-xmark tab-close-icon\"></i></a>";
        tabList.appendChild(el);
    }

    setName(name) {
        this.name = name;
        document.getElementById(this.id).innerHTML = name + '.' + this.extension;
        document.getElementById("tab-rename").placeholder = this.name;
        changeTabNamePopup(name);
    }

    changeLanguage(language) {
        this.language = language;
        this.setlanguage = language;
    }

    setExtension(extension) {
        this.extension = extension;
        document.getElementById(this.id).innerHTML = this.name + '.' + this.extension;
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
            document.getElementById("tab-rename").placeholder = this.name;
            this.selected = true;
            // Change the Sesssion of the Ace Editor
            var editor = ace.edit("editor");
            editor.setSession(this.session);
            var lang = editor.session.$modeId;
            var langName = lang.split("/").pop();
            changeDoc(langName);
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

    getLanguage() {
        return this.setlanguage;
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
    var extension = extension_dict[localStorage.getItem("language").toLowerCase()];
    if (extension == null) { extension = "js" }
    var tab = new Tab((tabs.length + 1), "file_" + (tabs.length + 1), extension);
    tab.getTab().addEventListener("click", function () {
        tab.changeTab(tabs)
    });
    document.getElementById("close-" + tab.getId()).addEventListener("click", function () {
        closeTab(tab.getId(), tabs, "cancel");
    });
    tab.getElem
    tabs.push(tab);
    tab.changeTab(tabs);
    if (localStorage.getItem("language") == null) {
        localStorage.setItem("language", "JavaScript");
    }
    changeLanguage(localStorage.getItem("language"), "true", tabs);
    document.getElementById("tab-rename").placeholder = tab.getName();
}

export function closeTab(id, tabs, type) {
    console.log("Closing Tab " + id);
    var tabToClose = getTabById(id, tabs);
    if (tabToClose.getSession().getValue() != "" && type != "confirm") {
        document.getElementById("close-tab-warning").style.display = "flex";
        return
    }
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

export function changeTabName(tabs, name) {
    var currTab = getCurrentTab(tabs);
    if (currTab != null) {
        currTab.setName(name);
    }
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

function getTabById(id, tabs) {
    for (var index in tabs) {
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
    disabledLang.innerHTML = language.toUpperCase();
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
        if (tabs[index].isSelected()) {
            return tabs[index];
        }
    }
    return null;
}