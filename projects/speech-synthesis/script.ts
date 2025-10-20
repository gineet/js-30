(function initialize() {
  const utterance = new SpeechSynthesisUtterance();
  const voicesDropdown = document.querySelector('[name="voice"]') as HTMLSelectElement;
  const speakButton = document.querySelector('#speak') as HTMLButtonElement;
  const stopButton = document.querySelector('#stop') as HTMLButtonElement;
  const options = document.querySelectorAll('[type="range"], [name="text"]') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
  let voices: SpeechSynthesisVoice[] = [];

  utterance.text = (document.querySelector('[name="text"]') as HTMLTextAreaElement).value;

  function populateVoices(this: SpeechSynthesis) {
    voices = this.getVoices()
      .filter(voice => voice.lang.startsWith('en-'));

    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`)
      .join('');
  }

  function setVoice(this: HTMLSelectElement) {
    const voice = voices.find(voice => voice.name === this.value);
    if (voice) {
      utterance.voice = voice;
      toggle();
    }
  }

  function toggle(speakAgain = true) {
    speechSynthesis.cancel();
    speakAgain && speechSynthesis.speak(utterance);
  }

  function setOption(this: HTMLInputElement | HTMLTextAreaElement) {
    const { name: key, value } = this;
    let changed = false;

    if (key === 'text') {
      utterance[key] = value;
      changed= true;
    } else if (key === 'rate' || key === 'pitch') {
      const valueNum = Number(value);
      if (!Number.isNaN(valueNum)) {
        utterance[key] = valueNum;
        changed = true;
      }
    }

    changed && toggle();
  }


  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach((option) => {
    option.addEventListener('change', setOption);
  });
  speakButton.addEventListener('click', () => { toggle(); });
  stopButton.addEventListener('click', () => { toggle(false); });
}());