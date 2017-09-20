var ASQ = require("asynquence");

var audioContext = null;

var filesLoaded = 0,
    numberOfFiles = 0,
    context = new AudioContext(),
    buffers = [];

function getFileFactory( buffer ) {
    return function(done){
        getBufferFile(buffer, done);
    };
}

export function init (passedAudioContext, bufferFiles, callback) {

    audioContext = passedAudioContext ? passedAudioContext : new AudioContext();

    let bufferFileFunctions = [];
    for(let bufferFileName in bufferFiles)
    {
        if (bufferFiles.hasOwnProperty(bufferFileName)){
            bufferFileFunctions.push(getFileFactory( { name: bufferFileName, path: bufferFiles[bufferFileName] }));
        }

    }

    console.log(bufferFileFunctions);

    ASQ("message")
        .all(...bufferFileFunctions)
        .val(function(...buffers){
            callback(buffers);

        });

};

var size = function(obj) {
    var size = 0;

    for (var key in obj) {

        if (obj.hasOwnProperty(key)){
            size++;
        }
    }
    return size;
};

var getBufferFile = function (buffer, callback) {

    var request = new XMLHttpRequest();

    request.open('GET', '/static'+buffer.path, true);
    request.responseType = 'arraybuffer';
    //request.responseType = 'json';

    request.onload = function () {

        audioContext.decodeAudioData(request.response, function (decodedBuffer) {

            callback({ buffer: decodedBuffer, name: buffer.name });

        });

    };

    request.send();
};