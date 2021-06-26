import * as Tone from 'tone'

var audioCtx = new (window.AudioContext || window.webkitAudioContext);
var mediaElem = document.querySelector('video');
var stream = audioCtx.createMediaElementSource(mediaElem);
var gainNode = audioCtx.createGain();

// This a normal connection between to native AudioNodes.
stream.connect(gainNode);

// Set the context used by Tone.js
Tone.setContext(audioCtx);

var pitchShift = new Tone.PitchShift();

// Use the Tone.connect() helper to connect native AudioNodes with the nodes provided by Tone.js
Tone.connect(gainNode, pitchShift);
Tone.connect(pitchShift, audioCtx.destination);
pitchShift.pitch = -12;