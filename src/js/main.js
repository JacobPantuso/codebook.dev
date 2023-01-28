import * as code from "./code.js";
import * as toolbar from "./toolbar.js";
import * as tabfunc from "./editor-tab.js";
import * as validation from "./validation.js";

// redirect to login page if href contains # but append the # to the href in the login page
if (window.location.href.indexOf("#") > -1) {
    window.location.href = "login.html#" + window.location.href.split("#")[1];
}

if (document.getElementsByClassName("index.html")[0]) {
    document.getElementById("index-form").addEventListener("keyup", () => { validation.checkSubmit() });
}

if (document.getElementsByClassName("contact.html")[0]) {
    document.getElementById("contact").addEventListener("change", () => { validation.checkContact() });
}

if (document.getElementsByClassName("code.html")[0]) {
    document.getElementsByClassName("code.html")[0].addEventListener("onload",
        code.initialize()
    );
    document.getElementById("font-size-up").addEventListener('click', () => {
        toolbar.changeFontSize("up")
        localStorage.setItem("fontSize", document.getElementById("font-size").innerHTML);
    });
    document.getElementById("font-size-down").addEventListener('click', () => {
        toolbar.changeFontSize("down")
        localStorage.setItem("fontSize", document.getElementById("font-size").innerHTML);
    });
    document.getElementById("settings-btn").addEventListener('click', () => { toolbar.toggleSetting("settings") });
    document.getElementById("lang-btn").addEventListener('click', () => { toolbar.toggleSetting("language") });
    document.getElementById("myInput").addEventListener('keyup', () => { toolbar.search("input") });
    document.getElementById("theme-btn").onclick = function () { toolbar.toggleSetting("theme") };
    document.getElementById("input-toggle").addEventListener('click', () => {
        console.log("toggle");
        toolbar.allowInput();
    });
    document.getElementById("toggle").addEventListener('click', () => {
        toolbar.toggleTheme();
    });
    document.getElementById("stdin-info-btn").addEventListener('click', () => {
        document.getElementById("stdin-help").style.display = "flex";
        document.getElementById("landing-info-cont").style.display = "none";
    });
    document.getElementById("close-info").addEventListener('click', () => {
        document.getElementById("stdin-help").style.display = "none";
        document.getElementById("landing-info-cont").style.display = "flex";
    });
    // wait for file upload
    // Tab Switching
    var tabs = [];
    tabfunc.createNewTab(tabs);
    document.getElementById("run-btn").addEventListener('click', () => { code.compile(tabs) });
    document.getElementById("new-tab").addEventListener('click', () => {
        tabfunc.createNewTab(tabs);
    });
    //
    document.getElementById("assembly").addEventListener('click', () => { toolbar.changeLanguage("assembly", "false", tabs) });
    document.getElementById("clojure").addEventListener('click', () => { toolbar.changeLanguage("clojure", "false", tabs) });
    document.getElementById("cpp").addEventListener('click', () => { toolbar.changeLanguage("cpp", "false", tabs) });
    document.getElementById("elixir").addEventListener('click', () => { toolbar.changeLanguage("elixir", "false", tabs) });
    document.getElementById("erlang").addEventListener('click', () => { toolbar.changeLanguage("erlang", "false", tabs) });
    document.getElementById("go").addEventListener('click', () => { toolbar.changeLanguage("go", "false", tabs) });
    document.getElementById("haskell").addEventListener('click', () => { toolbar.changeLanguage("haskell", "false", tabs) });
    document.getElementById("java").addEventListener('click', () => { toolbar.changeLanguage("java", "false", tabs) });
    document.getElementById("python").addEventListener('click', () => { toolbar.changeLanguage("python", "false", tabs) });
    document.getElementById("kotlin").addEventListener('click', () => { toolbar.changeLanguage("kotlin", "false", tabs) });
    document.getElementById("lisp").addEventListener('click', () => { toolbar.changeLanguage("lisp", "false", tabs) });
    document.getElementById("objective-c").addEventListener('click', () => { toolbar.changeLanguage("objective-c", "false", tabs) });
    document.getElementById("perl").addEventListener('click', () => { toolbar.changeLanguage("perl", "false", tabs) });
    document.getElementById("php").addEventListener('click', () => { toolbar.changeLanguage("php", "false", tabs) });
    document.getElementById("ruby").addEventListener('click', () => { toolbar.changeLanguage("ruby", "false", tabs) });
    document.getElementById("rust").addEventListener('click', () => { toolbar.changeLanguage("rust", "false", tabs) });
    document.getElementById("typescript").addEventListener('click', () => { toolbar.changeLanguage("typescript", "false", tabs) });
    document.getElementById("swift").addEventListener('click', () => { toolbar.changeLanguage("swift", "false", tabs) });
    document.getElementById("html").addEventListener('click', () => { toolbar.changeLanguage("HTML", "false", tabs) });
    document.getElementById("css").addEventListener('click', () => { toolbar.changeLanguage("CSS", "false", tabs) });
    document.getElementById("javascript").addEventListener('click', () => { toolbar.changeLanguage("JavaScript", "false", tabs) });
    document.getElementById("close-tab-cancel").addEventListener('click', () => {
        document.getElementById("close-tab-warning").style.display = "none";
    });
    document.getElementById("close-tab-confirm").addEventListener('click', () => {
        tabfunc.closeTab(tabfunc.getCurrentTab(tabs).getId(), tabs, "confirm");
        document.getElementById("close-tab-warning").style.display = "none";
    });
    document.getElementById("import-code").addEventListener('change', () => {
        toolbar.uploadFile(tabs);
    });
    document.getElementById("save").addEventListener('click', () => {
        toolbar.saveFile(tabs);
    });
    document.getElementById("copy").addEventListener('click', () => {
        toolbar.copyCode(tabs);
    });
    document.getElementById("editor-mode").addEventListener('click', () => {
        toolbar.changeEditorMode();
        document.getElementById("editor-mode").classList.add("clicked");
    });
    document.getElementById("rename-button").addEventListener('click', () => {
        tabfunc.changeTabName(tabs, document.getElementById("tab-rename").value);
        document.getElementById("tab-rename").value = "";
    });
}


if (window.location.href.match('login.html') != null) {
    var urlParams = new URLSearchParams(window.location.search);
    var display = urlParams.get('name');
    localStorage.setItem("name", display);
    document.getElementById("name").innerHTML = "Hey, " + display + " 👋🏼";
}

/*window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
  };*/
// export all functions in the file

