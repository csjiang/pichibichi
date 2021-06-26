import * as Tone from 'tone';

const state = {
	currentPitchLevel: 0
};

let pitchShift;

const shiftPitch = (tones) => {
	if (state.currentPitchLevel !== 0) {
		pitchShift.pitch = tones;
		state.currentPitchLevel = tones;
		return;
	}
	const audioCtx = new (window.AudioContext || window.webkitAudioContext);
	const mediaElem = document.querySelector('video');
	const stream = audioCtx.createMediaElementSource(mediaElem);
	const gainNode = audioCtx.createGain();

	// This a normal connection between to native AudioNodes.
	stream.connect(gainNode);

	// Set the context used by Tone.js
	Tone.setContext(audioCtx);

	pitchShift = new Tone.PitchShift();

	// Use the Tone.connect() helper to connect native AudioNodes with the nodes provided by Tone.js
	Tone.connect(gainNode, pitchShift);
	Tone.connect(pitchShift, audioCtx.destination);
	pitchShift.pitch = tones;
	state.currentPitchLevel = tones;
}

chrome.runtime.onMessage.addListener((msgObj, sender, response) => {
	if (msgObj.type === 'pitchShift') {
	    shiftPitch(msgObj.tones);
	}
	if (msgObj.type === 'getPitch') {
	    response(state.currentPitchLevel);
	}
});