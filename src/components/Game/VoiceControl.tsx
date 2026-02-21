import { useEffect, useCallback } from 'react';
import { useGameStore, setListening, setRecognition, setPronunciationResult } from '../../stores/gameStore';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useTTS } from '../../hooks/useTTS';
import { checkPronunciation } from '../../services/gameEngine';
import { getWordsByLevel } from '../../data/words';

export function VoiceControl() {
  const { state, dispatch } = useGameStore();
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

  const { speakEnglish, speakChinese } = useTTS({
    onEnd: () => {
      // After TTS, start listening
      setTimeout(() => {
        startListening();
      }, 500);
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
  }

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
      setListening(false);
    } else {
      startListening();
      setListening(true);
    }
  }, [isListening, startListening, stopListening]);

  const handleSpeakWord = useCallback(() => {
    if (currentWord) {
      speakEnglish(currentWord.word);
    }
  }, [currentWord, speakEnglish]);

  useEffect(() => {
    if (isGameActive && currentWord && !isListening) {
      // Prompt the child to say the word
      setTimeout(() => {
        speakEnglish(currentWord.word);
      }, 1000);
    }
  }, [isGameActive, currentWord]);

  if (!isSupported) {
    return (
      <div className="voice-control-bar">
        <div style={{ color: 'white', textAlign: 'center' }}>
          Voice recognition is not supported in your browser.
          Please use Chrome or Edge.
        </div>
      </div>
    );
  }

  return (
    <div className="voice-control-bar">
      <button
        className={`mic-button ${isListening ? 'active' : ''}`}
        onClick={handleMicClick}
        disabled={!isGameActive}
      >
        🎤
        <span className="waves"></span>
      </button>

      {currentWord && (
        <>
          <div className="current-word-display">
            {currentWord.word}
          </div>

          <button
            className="btn btn-secondary"
            onClick={handleSpeakWord}
            disabled={!isGameActive}
            style={{ padding: '8px 16px', fontSize: '16px' }}
          >
            🔊
          </button>

          {state.lastRecognition && (
            <div className="voice-prompt">
              You said: "{state.lastRecognition}"
            </div>
          )}
        </>
      )}

      {pronunciationResult !== 'none' && (
        <div className={`pronunciation-feedback ${pronunciationResult}`}>
          {pronunciationResult === 'correct' ? '✓ Correct!' : '✗ Try Again!'}
        </div>
      )}

      <div className="voice-prompt">
        {isListening ? 'Listening...' : 'Click microphone and say the word!'}
      </div>
    </div>
  );
}
