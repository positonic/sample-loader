var ASQ = require("asynquence");

var audioContext = null;

function getFileFactory( buffer ) {
    return function(done){
        getBufferFile(buffer, done);
        console.log('getting '+buffer.path);
    };
}

export function init (passedAudioContext, bufferFiles, callback) {

    return new Promise((resolve, reject) => {
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
                resolve(buffers);

            });
    });
    

};

var getBufferFile = function (buffer, callback) {

    var request = new XMLHttpRequest();

    request.open('GET', '/static'+buffer.path, true);
    request.responseType = 'arraybuffer';
    //request.responseType = 'json';

    request.onload = function () {

        audioContext.decodeAudioData(request.response).then(function (decodedBuffer) {

            callback({ buffer: decodedBuffer, name: buffer.name });

        });

    };

    request.send();
};