export class AudioManager {

    constructor() {
        this.contexteAudio;
        this.buffer;
        this.globalGain;
    }

    createAudioContext() {
        this.contexteAudio = new (window.AudioContext || window.webkitAudioContext)();
        this.buffer = this.contexteAudio.createBuffer(
            1,
            this.contexteAudio.sampleRate * 1,
            this.contexteAudio.sampleRate
        );
        this.globalGain = this.contexteAudio.createGain();
        this.globalGain.gain.setValueAtTime(1, 0);
        console.log("audio context created");
    }

    getContextAudio() {
        return this.contexteAudio;
    }

    setGlobalGain(newGain) {
        this.globalGain.gain.setValueAtTime(newGain, this.contexteAudio.currentTime);
    }

    getGlobalGain() {
        return this.getGlobalGain;
    }

    getGlobalGainValue() {
        return Math.round(this.globalGain.gain.value * 100) / 100;
    }

    checkGlobalGain() {
        console.log("Volume global: " + Math.round(this.globalGain.gain.value * 100) / 100);
    }

    setAudioSource(url) {
        // const url_sound = new FileReader(url)
        // const soundBuffer = url_sound.arrayBuffer();
        // const soundPlayingBuffer = this.contexteAudio.decodeAudioData(url);
        // const soundPlayingSource = this.contexteAudio.createBufferSource();
        // soundPlayingSource.buffer = soundPlayingBuffer;
        const audio = new Audio(url);
        const source = this.contexteAudio.createMediaElementSource(audio);
        console.log(source)
        source.connect(this.globalGain);
        audio.play()
    }
}

export const audioManagerClass = new AudioManager();