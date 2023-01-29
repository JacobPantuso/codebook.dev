import * as toolbar from "./toolbar.js";
import * as tabFunc from "./editor-tab.js";
import API_KEY from "./api.js";

// language to id from supported langs
var languageToId = new Object();
var languageToId = {
    "assembly": "45",
    "clojure": "86",
    "cpp": "76",
    "elixir": "57",
    "erlang": "58",
    "go": "22",
    "haskell": "61",
    "java": "26",
    "javascript": "63",
    "kotlin": "78",
    "objective-c": "79",
    "perl": "85",
    "php": "68",
    "python": "71",
    "ruby": "72",
    "rust": "73",
    "swift": "83",
    "typescript": "74"
};

export function compile(tabs) {
    var currTab = tabFunc.getCurrentTab(tabs);
    var code = currTab.getSession().getValue();
    console.log(code);
    var input = document.getElementById("stdin").value;
    var language = currTab.getLanguage();
    language = language.toLowerCase();
    console.log(languageToId[language])
    document.getElementById("code-compile-status").style.display = "flex";
    document.getElementById("compile-loader").style.display = "flex";
    document.getElementById("compile-success").style.display = "none";
    document.getElementById("compile-error").style.display = "none";
    document.getElementById("compile-status-text").className = "";
    document.getElementById("compile-status-text").innerHTML = "Compiling Code...";
    const submit = async (e) => {
        console.log("Creating Submission ...\n");
        const response = await fetch(
            "https://judge0-ce.p.rapidapi.com/submissions",
            {
                method: "POST",
                headers: {
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                    "x-rapidapi-key": API_KEY, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    source_code: code,
                    stdin: input,
                    language_id: languageToId[language],
                }),
            }
        );

        console.log("Submission Created ...\n");
        const jsonResponse = await response.json();
        let jsonGetSolution = {
            status: { description: "Queue" },
            stderr: null,
            compile_output: null,
        };
        while (
            jsonGetSolution.status.description !== "Accepted" &&
            jsonGetSolution.stderr == null &&
            jsonGetSolution.compile_output == null
        ) {
            console.log(`Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`);
            if (jsonResponse.token) {
                let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
                const getSolution = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": API_KEY, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
                        "content-type": "application/json",
                    },
                });
                jsonGetSolution = await getSolution.json();
            }
        }

        if (jsonGetSolution.stdout) {
            const output = atob(jsonGetSolution.stdout);
            document.getElementById("compile-loader").style.display = "none";
            document.getElementById("compile-success").style.display = "flex";
            document.getElementById("compile-status-text").innerHTML = "Execution Successful";
            document.getElementById("compile-status-text").className = "compile-success-text";
            var elem = document.getElementById("compile-bar");
            var execWidth = jsonGetSolution.time * 100;
            console.log(execWidth);
            var width = 0;
            var id = setInterval(timeFrame, 10);
            function timeFrame() {
                if (width >= execWidth) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
            var ramWidth = (jsonGetSolution.memory / 10000) * 100;
            console.log(ramWidth);
            var elem = document.getElementById("ram-bar");
            var width = 1;
            var id = setInterval(memoryFrame, 10);
            function memoryFrame() {
                if (width >= Math.round(ramWidth)) {
                    clearInterval(id);
                } else {
                    console.log(width);
                    width++;
                    elem.style.width = width + "%";
                }
            }
            document.getElementById("compile-usage").innerHTML = jsonGetSolution.time;
            document.getElementById("ram-usage").innerHTML = jsonGetSolution.memory;
            var stats = document.getElementById("code-stats");
            stats.innerHTML = '';
            var terminal = ace.edit("terminal");
            terminal.setValue("▶ user.io@shell: ~$\n" + output + "\n▶ user.io@shell: ~$");
            console.log(`Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`);
        } else if (jsonGetSolution.stderr) {
            const error = atob(jsonGetSolution.stderr);
            document.getElementById("compile-loader").style.display = "none";
            document.getElementById("compile-error").style.display = "flex";
            document.getElementById("compile-status-text").innerHTML = "Execution Failed";
            document.getElementById("compile-status-text").className = "compile-error-text";
            var stats = document.getElementById("code-stats");
            stats.innerHTML = 'Your code failed to execute. Check the console for more details. This may be due to a syntax error or a runtime error.'
            var terminal = ace.edit("terminal");
            terminal.setValue("▶ user.io@shell: ~$\n" + error + "\n▶ user.io@shell: ~$");
            console.log(`\n Error :${error}`);
        } else {
            const compilation_error = atob(jsonGetSolution.compile_output);
            document.getElementById("compile-loader").style.display = "none";
            document.getElementById("compile-error").style.display = "flex";
            document.getElementById("compile-status-text").className = "compile-error-text";
            document.getElementById("compile-status-text").innerHTML = "Execution Failed";
            var stats = document.getElementById("code-stats");
            stats.innerHTML = '<span class="color">codebook.dev</span> compiler failed to understand your code. Did you submit valid code for the selected language? If you are still having issues please visit our <a href="https://www.codebook.dev/docs/index.html"><span class="accent">Docs</span></a> for more support.'
            var terminal = ace.edit("terminal");
            terminal.setValue("▶ user.io@shell: ~$\n" + compilation_error + "\n▶ user.io@shell: ~$");
            console.log(`\n Error :${compilation_error}`);
        }
    };
    submit();
}

export function initialize() {
    if (localStorage.length > 1 && localStorage.getItem("name")) {
        // restore all tabs from local storage
        encrpytConnection(true);
        toolbar.toggleTheme();
    } else {
        encrpytConnection(false);
        toolbar.toggleTheme();
    }
    // grab first name from netlify identity
    //var name = netlifyIdentity.currentUser().user_metadata.full_name.split(" ")[0];
    document.getElementById("hey-there-code").innerHTML = "Hey " + localStorage.getItem("name") + "!<i class='fa-solid fa-hands-clapping'></i></i>";
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
            toolbar.changeFontSize("set", localStorage.getItem("fontSize"));
            if (localStorage.getItem("theme") != null) toolbar.changeTheme(localStorage.getItem("theme"), localStorage.getItem("theme-name"), localStorage.getItem("theme-type"));
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