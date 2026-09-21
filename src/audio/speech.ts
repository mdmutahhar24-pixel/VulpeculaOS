let selectedVoice: SpeechSynthesisVoice | null = null;

const loadVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    selectedVoice =
        voices.find(voice =>
            voice.lang.startsWith("en") &&
            voice.name.toLowerCase().includes("david")
        ) ??
        voices.find(voice => voice.lang.startsWith("en")) ??
        voices[0] ??
        null;
};

if (typeof window !== "undefined") {
    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;
}

export const speakVulp = (text: string) => {
    if (!text.trim()) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    utterance.volume = 0.8;

    window.speechSynthesis.speak(utterance);
};

export const stopVulpSpeech = () => {
    window.speechSynthesis.cancel();
};