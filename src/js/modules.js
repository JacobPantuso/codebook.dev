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