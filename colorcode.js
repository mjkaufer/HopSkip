function savetext() {
    var s = document.getElementById("col").value;
    if (s != localStorage.cc) {
        localStorage.cc = s;
    }
}

function startup() {
    console.log('startup');

    if (localStorage.cc == undefined) {
        localStorage.cc = "";
    }
    document.getElementById("col").value = localStorage.cc;
    self.setInterval(function () { savetext() }, 500); //call every second

}
console.log('debug');