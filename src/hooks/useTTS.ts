import { useState, useCallback, useEffect, useRef } from 'react';

interface UseTTSOptions {
  onEnd?: () => void;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseTTSReturn {
  isSpeaking: boolean;
  speak: (text: string, lang?: string) => void;
  speakChinese: (text: string) => void;
  speakEnglish: (text: string) => void;
  stop: () => void;
}

export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const { onEnd, rate = 1, pitch = 1, volume = 1 } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!synthRef.current) return;

    // Stop any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [rate, pitch, volume, onEnd]);

  const speakChinese = useCallback((text: string) => {
    speak(text, 'zh-CN');
  }, [speak]);

  const speakEnglish = useCallback((text: string) => {
    speak(text, 'en-US');
  }, [speak]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return {
    isSpeaking,
    speak,
    speakChinese,
    speakEnglish,
    stop,
  };
}
