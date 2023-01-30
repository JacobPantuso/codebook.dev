import * as validation from './validation.js';


document.getElementById("index-form").addEventListener("keyup", () => { validation.checkSubmit() });
document.getElementById("code-btn").addEventListener("click", () => { 
    document.getElementById("index-body").style.overflow = "hidden";
    document.getElementById("name-overlay").style.display = "flex";
});
document.getElementById("close").addEventListener("click", () => {
    document.getElementById("name-overlay").style.display = "none";
    document.getElementById("index-body").style.overflow = "auto";
});