import "../css/popup.css";

document.addEventListener("DOMContentLoaded", function registerEventListeners() {
	const pitch_el = document.getElementById('pitch_entry');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, { type: 'getPitch' }, function(response){
	    	if (Number.isInteger(response)) {
		        pitch_el.value = String(response)
	    	} else {
	    		pitch_el.value = "0";
	    	}
	    });
	});
	document.getElementById('pitch_submit').addEventListener('click', () => {
		const tones = Number(pitch_el.value);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		    chrome.tabs.sendMessage(tabs[0].id, { type: 'pitchShift', tones: tones }, function(response){
		        console.log('response!');
		    });
		});
	});
	document.getElementById('pitch_up').addEventListener('click', () => {
		console.log(pitch_el.value);
		pitch_el.value = String(Number(pitch_el.value) + 1);
	});
	document.getElementById('pitch_down').addEventListener('click', () => {
		pitch_el.value = String(Number(pitch_el.value) - 1);
	});
});
