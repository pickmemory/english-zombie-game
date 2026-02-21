const MINIMAX_BASE_URL = 'https://api.minimaxi.com/anthropic';
const MINIMAX_API_KEY = 'sk-cp-QnzYrmHp98KWHg4f4bFr_nBnQRwxsp7HY7iJSRrw_dpAPb1qkMq7cFlr_LeRsdfqWKXXGCDgSS1Thi2d4S0ZN5J9Y2V49H_LjGX96PmxkPXe12olI57RWf0';

export interface MiniMaxMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface MiniMaxRequest {
  model: string;
  messages: MiniMaxMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface MiniMaxResponse {
  id: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: MiniMaxMessage;
    finish_reason: string;
  }[];
}

export async function callMiniMax(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${MINIMAX_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      } as MiniMaxRequest)
    });

    if (!response.ok) {
      throw new Error(`MiniMax API error: ${response.status}`);
    }

    const data: MiniMaxResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('MiniMax API error:', error);
    throw error;
  }
}

export async function evaluatePronunciation(spokenWord: string, targetWord: string): Promise<{ correct: boolean; score: number; feedback: string }> {
  const prompt = `Evaluate if the child pronounced the English word correctly.
Target word: "${targetWord.toLowerCase()}"
What the child said: "${spokenWord.toLowerCase()}"

Respond with a JSON object in this exact format:
{"correct": true/false, "score": 0-100, "feedback": "short feedback in Chinese for a child"}

Consider:
- Simple phonetic similarities (e.g., "æpl" for "apple", "dɔɡ" for "dog")
- Common mispronunciations by young children
- The score should be higher if the word is clearly understandable`;

  try {
    const result = await callMiniMax(prompt);
    const parsed = JSON.parse(result);
    return {
      correct: parsed.correct || false,
      score: parsed.score || 0,
      feedback: parsed.feedback || ''
    };
  } catch (error) {
    // Fallback to simple comparison
    const normalizedSpoken = spokenWord.toLowerCase().trim();
    const normalizedTarget = targetWord.toLowerCase().trim();
    const isCorrect = normalizedSpoken === normalizedTarget ||
      normalizedSpoken.includes(normalizedTarget) ||
      normalizedTarget.includes(normalizedSpoken);

    return {
      correct: isCorrect,
      score: isCorrect ? 90 : 30,
      feedback: isCorrect ? '太棒了！' : '再试一次！'
    };
  }
}

export async function generateEnglishPronunciation(word: string): Promise<string> {
  // This would ideally return an audio URL, but we'll use browser TTS as fallback
  return word;
}
