// Set up audio context
var audioContext = new AudioContext();

const visualizeAudio = async (url) => {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer();
  console.log(arrayBuffer);
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  process(audioBuffer);
}

const process = (buffer) => {

  let newSamples = [];
  const rawDataL = buffer.getChannelData(0);
  const rawDataR = buffer.getChannelData(1);
  for (let i=0; i < rawDataL.length && i < rawDataR.length; i++)
  {
    //Mono sample = L + R / 2
    newSamples.push((rawDataL[i] + rawDataR[i]) / 2.0);
  }
  
  //put samples into blob
  const blob = new Blob([JSON.stringify({'samples': newSamples})], {type : 'application/json'});
  const url = URL.createObjectURL(blob);
  const samplesUrl = document.createElement('div');
  samplesUrl.id = 'samplesurl';
  samplesUrl.dataset.samples = url;
  document.body.appendChild(samplesUrl);
  const event = new Event('fileprocessed');
  document.dispatchEvent(event);
  //SendMessage('UI', 'WebFileProcessed', URL.createObjectURL(JSON.stringify({'samples': newSamples})));
  return newSamples;
}

document.addEventListener('fileselect', (event) => {
  const url = document.getElementById('rawurl').dataset.url;
  visualizeAudio(url);
});