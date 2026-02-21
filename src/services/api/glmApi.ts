const GLM_BASE_URL = 'https://open.bigmodel.cn/api/coding/paas/v4';
const GLM_API_KEY = '81b11daced5b468ca03bd2b506b4237e.Q2aypXQgHQzzGxcW';

export interface GLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GLMCompletionRequest {
  model: string;
  messages: GLMMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface GLMCompletionResponse {
  id: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: GLMMessage;
    finish_reason: string;
  }[];
}

export async function callGLM(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${GLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GLM_API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-4',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      } as GLMCompletionRequest)
    });

    if (!response.ok) {
      throw new Error(`GLM API error: ${response.status}`);
    }

    const data: GLMCompletionResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('GLM API error:', error);
    throw error;
  }
}

export async function generateChinesePrompt(word: string): Promise<string> {
  const prompt = `请用中文给一个4-10岁的孩子解释一下英语单词"${word}"是什么意思，并用一句简短的中文鼓励孩子学会这个单词。回答要简短有趣，不超过50字。`;
  return callGLM(prompt);
}
