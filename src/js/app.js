var cAudioWorkspace = require('./workspace').cAudioWorkspace;

document.getElementsByTagName('body')[0].addEventListener('resize', function(event) {
  document.getElementById('app').setAttribute("width", window.innerWidth);
  document.getElementById('app').setAttribute("height", window.innerHeight);
});

m.mount(document.getElementById('app'), cAudioWorkspace);
