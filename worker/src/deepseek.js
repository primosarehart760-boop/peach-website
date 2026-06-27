/**
 * 火山方舟 ARK API 调用器 · DeepSeek-V3 · 流式 + 重试
 *
 * 火山方舟 API 兼容 OpenAI 格式，endpoint ID 作为 model 参数
 * 文档：https://www.volcengine.com/docs/82379/1298454
 */

const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const ARK_ENDPOINT_ID = 'ep-20260612133014-tpthh';  // DeepSeek-V3 推理接入点
const MAX_RETRIES = 3;
const RETRY_DELAY = 1500; // ms

/**
 * 流式调用火山方舟 API
 * @param {object} env - Worker 环境（含 DEEPSEEK_API_KEY = ARK API Key）
 * @param {string} systemPrompt - 系统提示词
 * @param {string} userPrompt - 用户提示词
 * @param {object} opts - 可选参数
 * @returns {ReadableStream} SSE 流
 */
export async function callDeepSeekStream(env, systemPrompt, userPrompt, opts = {}) {
  const model = opts.model || env.ARK_ENDPOINT_ID || ARK_ENDPOINT_ID;
  const maxTokens = parseInt(opts.maxTokens || env.MAX_TOKENS || '8192');
  const temperature = opts.temperature ?? 0.7;
  const apiKey = env.DEEPSEEK_API_KEY || env.ARK_API_KEY;

  let lastError;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const resp = await fetch(ARK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          stream: true,
          max_tokens: maxTokens,
          temperature,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      if (!resp.ok) {
        const body = await resp.text();
        if (resp.status === 429 && attempt < MAX_RETRIES - 1) {
          await sleep(RETRY_DELAY * (attempt + 1));
          continue;
        }
        throw new Error(`ARK API ${resp.status}: ${body}`);
      }

      return resp.body;
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY * (attempt + 1));
      }
    }
  }
  throw lastError;
}

/**
 * 非流式调用（用于短任务如 CEO 路由判断）
 */
export async function callDeepSeek(env, systemPrompt, userPrompt, opts = {}) {
  const model = opts.model || env.ARK_ENDPOINT_ID || ARK_ENDPOINT_ID;
  const maxTokens = parseInt(opts.maxTokens || env.MAX_TOKENS || '8192');
  const temperature = opts.temperature ?? 0.7;
  const apiKey = env.DEEPSEEK_API_KEY || env.ARK_API_KEY;

  let lastError;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const resp = await fetch(ARK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          stream: false,
          max_tokens: maxTokens,
          temperature,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      if (!resp.ok) {
        const body = await resp.text();
        if (resp.status === 429 && attempt < MAX_RETRIES - 1) {
          await sleep(RETRY_DELAY * (attempt + 1));
          continue;
        }
        throw new Error(`ARK API ${resp.status}: ${body}`);
      }

      const data = await resp.json();
      return data.choices[0].message.content;
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY * (attempt + 1));
      }
    }
  }
  throw lastError;
}

/**
 * 从流中收集完整文本
 */
export async function collectStreamText(deepseekStream) {
  const reader = deepseekStream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ') || line === 'data: [DONE]') continue;
      try {
        const json = JSON.parse(line.slice(6));
        const text = json.choices?.[0]?.delta?.content || '';
        if (text) fullText += text;
      } catch (_) {}
    }
  }
  return fullText;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
