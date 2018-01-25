var notes = []
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var textType = /text.*/;

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        var result = "";
        if (f.type.match(textType)) {
            var note = new Object()
            var reader = new FileReader();

            reader.onload = function(e) {
                result = reader.result;

                var parser = new DOMParser();
                var doc = parser.parseFromString(result, "text/html");

                note.title = doc.getElementsByClassName('title')[0].textContent;
                note.content = doc.getElementsByClassName('content')[0].textContent;
                note.labels = Array.from(doc.getElementsByClassName('label')).map(function(e){
                    return e.textContent;
                });
                output.push(note);
            }
            reader.readAsText(f);	

        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    }
    //fileDisplayArea.innerText = '<ul>' + output.join('') + '</ul>';
    document.getElementById('fileDisplayArea').innerHTML = '<ul>' + output.join('') + '</ul>';
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);