// when all elements in contact are filled out, set the submit button to green
function checkContact() {
    var name = document.getElementById("name").value;
    var problem = document.getElementById("problem").value;
    var problem_type = document.getElementById("problem_type").value;
    var submit = document.getElementById("submit");
    if (name != "" && problem_type != "Select a Problem" && problem != "") {
        submit.style.backgroundColor = "#4CAF50";
        submit.style.pointerEvents = "all";
        console.log("green");
    }
}