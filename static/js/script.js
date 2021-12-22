function loadFile(filepath) {
    var raw = new XMLHttpRequest();
    raw.open("GET", "./data/"+filepath, false);
    
    var data = "";
    raw.onreadystatechange = function () {
        if (raw.readyState === 4) {
            if (raw.status === 200 || raw.status == 0) {
                data = raw.responseText;
            }
        }
    }
    raw.send(null);
    return data;
}