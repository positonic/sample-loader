# Asynchronous Audio sample file loader for Web Audio

### Sample usage:

```javascript
import * as sampleLoader from './sampleLoader';
    
    let audioContext = new AudioContext();
  
    let buffers = {
        bass: '/samples/sample1.wav',
        tone: '/samples/sample2.wav'
    };
    sampleLoader.init(audioContext, buffers).then((loadedBuffers) => {
       console.log('Buffers!! are ', loadedBuffers);
    })

  
```

### Sample output:

```json
    {
       "bass" : "decodedAudioDataBufferObject",
       "tone" : "decodedAudioDataBufferObject"
   }
```
