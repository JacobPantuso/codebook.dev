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
    } else {
        submit.style.backgroundColor = "red";
        submit.style.pointerEvents = "none";
    }
}

if (window.location.href.match('wip.html') != null) {
    console.log("all good");
   }