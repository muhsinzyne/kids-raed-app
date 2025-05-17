/// <reference types="vite/client" />

// Extend Window interface to include SpeechSynthesis
interface Window {
  speechSynthesis: SpeechSynthesis;
}

interface SpeechSynthesisUtterance {
  voice: SpeechSynthesisVoice | null;
  volume: number;
  rate: number;
  pitch: number;
  text: string;
  lang: string;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: Event) => void;
}

interface SpeechSynthesisEvent extends Event {
  readonly utterance: SpeechSynthesisUtterance;
}

interface SpeechSynthesisVoice {
  readonly voiceURI: string;
  readonly name: string;
  readonly lang: string;
  readonly localService: boolean;
  readonly default: boolean;
}

interface SpeechSynthesis {
  readonly speaking: boolean;
  readonly pending: boolean;
  readonly paused: boolean;
  onvoiceschanged: (event: Event) => void;
  speak(utterance: SpeechSynthesisUtterance): void;
  cancel(): void;
  pause(): void;
  resume(): void;
  getVoices(): SpeechSynthesisVoice[];
}