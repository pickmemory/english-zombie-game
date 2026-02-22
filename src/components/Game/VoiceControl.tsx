import { useEffect, useCallback, useRef, useState } from 'react';
import { useGameStore, setListening, setRecognition, setPronunciationResult } from '../../stores/gameStore';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useTTS } from '../../hooks/useTTS';
import { checkPronunciation } from '../../services/gameEngine';

export function VoiceControl() {
  const { state, dispatch } = useGameStore();
  const [hasStarted, setHasStarted] = useState(false);
  const hasStartedRef = useRef(false);

  const {
    isListening,
    isSupported,
    startListening,
    stopListening,
    transcript,
  } = useVoiceRecognition({
    onResult: handleSpeechResult,
    onEnd: handleSpeechEnd,
  });

  const { speakEnglish, speakChinese, isSpeaking } = useTTS({
    onEnd: () => {
      // After TTS ends, auto start listening
      if (!isListening) {
        startListening();
        setListening(true);
      }
    },
  });

  const currentWord = state.currentWord;
  const pronunciationResult = state.pronunciationResult;
  const isGameActive = state.screen === 'playing' && state.gameResult === null;

  function handleSpeechResult(spoken: string) {
    setRecognition(spoken);

    if (currentWord && spoken.trim().length > 0) {
      checkPronunciation(spoken, currentWord);
    }
  }

  function handleSpeechEnd() {
    setListening(false);
    // Auto restart listening after it ends (for continuous listening)
    if (isGameActive && currentWord) {
      setTimeout(() => {
        startListening();
        setListening(true);
      }, 300);
    }
  }

  // Auto-start when game becomes active and we have a word
  useEffect(() => {
    if (isGameActive && currentWord && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setHasStarted(true);

      // Play guidance - first try with user interaction simulation
      // On mobile, this might need to wait for first user tap
      const playGuidance = () => {
        speakChinese(`请说: ${currentWord.word}`);
        setTimeout(() => {
          speakEnglish(currentWord.word);
        }, 2500);
      };

      // Small delay then play
      setTimeout(playGuidance, 500);

      // Start listening after a bit more delay
      setTimeout(() => {
        startListening();
        setListening(true);
      }, 4000);
    }

    // Reset when game stops
    if (!isGameActive) {
      hasStartedRef.current = false;
      setHasStarted(false);
      stopListening();
      setListening(false);
    }
  }, [isGameActive, currentWord]);

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
      setListening(false);
    } else {
      startListening();
      setListening(true);
    }
  }, [isListening, startListening, stopListening]);

  // Manual trigger for mobile - needed because browsers block auto-audio
  const handleFirstInteraction = useCallback(() => {
    if (currentWord && !hasStartedRef.current) {
      hasStartedRef.current = true;
      speakChinese(`请说: ${currentWord.word}`);
      setTimeout(() => {
        speakEnglish(currentWord.word);
      }, 2500);
      setTimeout(() => {
        startListening();
        setListening(true);
      }, 5000);
    }
  }, [currentWord, speakChinese, speakEnglish, startListening]);

  if (!isSupported) {
    return (
      <div className="voice-control-bar">
        <div style={{ color: 'white', textAlign: 'center' }}>
          🎤 请使用 Chrome 或 Edge 浏览器
        </div>
      </div>
    );
  }

  return (
    <div 
      className="voice-control-bar"
      onClick={handleFirstInteraction}
    >
      {/* Auto-listening indicator */}
      <div className="auto-listen-indicator">
        {isListening ? '🎤 正在听...' : isSpeaking ? '🔊 播放中...' : '👆 点击开始'}
      </div>

      {currentWord && (
        <>
          <div className="current-word-display">
            {currentWord.word}
          </div>
        </>
      )}

      {pronunciationResult !== 'none' && (
        <div className={`pronunciation-feedback ${pronunciationResult}`}>
          {pronunciationResult === 'correct' ? '🎉 太棒了！' : '🔄 再试一次！'}
        </div>
      )}
    </div>
  );
}
