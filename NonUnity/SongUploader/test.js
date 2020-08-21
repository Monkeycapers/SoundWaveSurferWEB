// Set up audio context
var audioContext = new AudioContext();

function visualizeAudio(url) {
  fetch(url)
  .then(function(response) {
    response.arrayBuffer();
  })
  .then(function(arrayBuffer) {
    audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function(audioBuffer) {
    process(audioBuffer);
  });
}

function process(buffer) {

  var newSamples = [];
  var rawDataL = buffer.getChannelData(0);
  var rawDataR = buffer.getChannelData(1);
  for (let i=0; i < rawDataL.length && i < rawDataR.length; i++)
  {
    //Mono sample = L + R / 2
    newSamples.push((rawDataL[i] + rawDataR[i]) / 2.0);
  }
  SendMessage('UI', 'WebFileProcessed', URL.createObjectURL(JSON.stringify({'samples': newSamples})));
  return newSamples;
}