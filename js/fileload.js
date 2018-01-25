var notes = [];
var output = [];

var processedCount=0; // global variable
var totalFiles = 0; // global variable
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var textType = /text.*/;
    totalFiles = files.length;

    // files is a FileList of File objects. List some properties.
    var result = "";
    var note = new Object();

    for (var i = 0, f; f = files[i]; i++) {
        note = new Object();
        if (f.type.match(textType)) {

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    processedCount++;
                    result = e.target.result;
                    note = new Object();

                    var parser = new DOMParser();
                    var doc = parser.parseFromString(result, "text/html");

                    if(doc.getElementsByClassName('title').length > 0){
                        note.title = doc.getElementsByClassName('title')[0].textContent;
                    }
                    
                    if(doc.getElementsByClassName('content').length > 0){
                        note.content = doc.getElementsByClassName('content')[0].textContent;
                    }
                    
                    if(doc.getElementsByClassName('label').length > 0){
                        note.labels = Array.from(doc.getElementsByClassName('label')).map(function (e) {
                            return e.textContent;
                        });
                    }
                    output.push(note); 
                    
                    if(processedCount == totalFiles){
                        console.log('OK');
                        document.getElementById('fileDisplayArea').innerHTML = '<ul>' + output.join('') + '</ul>';
                    }
                    
                };
            })(f);

            reader.readAsText(f);

        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    }
    //fileDisplayArea.innerText = '<ul>' + output.join('') + '</ul>';
    document.getElementById('fileDisplayArea').innerHTML = '<ul>' + output.join('') + '</ul>';
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);