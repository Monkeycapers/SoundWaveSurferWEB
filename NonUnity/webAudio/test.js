// Set up audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
let currentBuffer = null;

const visualizeAudio = url => {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => process(audioBuffer));
};
const process = buffer => {

  let newSamples = [];
  const rawDataL = buffer.getChannelData(0);
  const rawDataR = buffer.getChannelData(1);
  for (let i=0; i < rawDataL.length && i < rawDataR.length; i++)
  {
    //Mono sample = L + R / 2
    newSamples.push((rawDataL[i] + rawDataR[i]) / 2.0);
  }
  console.log(newSamples);
  return newSamples;
}

var fileInput = document.createElement('input');
fileInput.setAttribute('type', 'file');
fileInput.onchange = function (event) {
  visualizeAudio(URL.createObjectURL(event.target.files[0]));
  //SendMessage('UI', 'WebFileSelected', URL.createObjectURL(event.target.files[0]));
}
document.body.appendChild(fileInput);