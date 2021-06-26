import AudioPlayer from './vendor/AudioPlayer.js';
import { EventEmitter } from 'events';

console.log('hello world!');
var audioCtx = new (window.AudioContext || window.webkitAudioContext);
var mediaElem = document.querySelector('video');
var stream = audioCtx.createMediaElementSource(mediaElem);
var buffer = audioCtx.createBuffer(2, 22050, 44100); // stereo buffer (two channels), that, when played back on an AudioContext running at 44100Hz (very common, most normal sound cards run at this rate), will last for 0.5 seconds: 22050 frames / 44100Hz = 0.5 seconds. See https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBuffer
var gainNode = audioCtx.createGain();

var myEmitter = new EventEmitter();
var myAudioPlayer = new AudioPlayer({
	emitter: myEmitter,
	pitch: 0.85,
	tempo: 1,
	context: audioCtx
});

myAudioPlayer.setBuffer(buffer); 
mediaElem.addEventListener('play', () => myAudioPlayer.play())

// This a normal connection between two native AudioNodes.
stream.connect(gainNode);
