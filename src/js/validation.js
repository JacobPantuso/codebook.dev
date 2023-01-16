/* 
----[ codebook.dev  ]----
Created by: Jacob Pantuso and Teo Cristoiu
----[ codebook.dev  ]----
*/

export function checkSubmit() {
    var name = document.getElementById("name").value;
    console.log(name);
    var submit = document.getElementById("submit");
    if (name != "") {
        submit.removeAttribute("disabled");
        submit.classList.add("enabled");
    } else {
        submit.classList.remove("enabled");
    }
}

export function checkContact() {
    var name = document.getElementById("name").value;
    var problem = document.getElementById("problem").value;
    var type = document.getElementById("mySelect").value;
    var submit = document.getElementById("submit");
    if (name != "" && type != "select" && problem != "") {
        submit.style.backgroundColor = "#4CAF50";
        submit.style.pointerEvents = "all";
    }
}
