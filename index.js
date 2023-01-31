// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach((voice) => {
        let createOption = document.createElement("option");
        createOption.textContent = `${voice.name} ${voice.lang}`;
        createOption.setAttribute("data-name", voice.name);
        createOption.setAttribute("data-lan", voice.lang);
        voiceSelect.appendChild(createOption);
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}
const speak = () => {
    backgroundImage()
    if (synth.speaking) {
        console.error("already speaking")
        return
    }
    if (textInput.value.trim() === "") {
        console.log("show some error")
    }
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = e => {
        setBack()
        console.log("Speaking is done")
    }
    speakText.onerror = e => {
        console.error("error")
    }
    const selectVoice = voiceSelect.selectedOptions[0].getAttribute("data-name")
    voices.forEach(voice =>{
        if(voice.name === selectVoice){
            speakText.voice = voice;
        }

    })
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    synth.speak(speakText)
    console.log(speakText)

}

textForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    speak()
    textInput.blur()
})
rate.addEventListener("change",e => rateValue.textContent = rate.value)
pitch.addEventListener("change",e => pitchValue.textContent = pitch.value)
voiceSelect.addEventListener("change", e => speak())



function backgroundImage(){
    body.style.backgroundImage = "url(images/wave.gif)"
    body.style.backgroundRepeat = "repeat-x"
    body.style.backgroundSize = "100% 100%"
}
function setBack() {
    body.style.backgroundImage = "none"
}