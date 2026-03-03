import type { ProviderPricingTable } from './types.js';

export const OPENAI_PRICING_V1: ProviderPricingTable = {
  pricingId: 'openai/v1',
  models: [
    // GPT-5 family
    { modelPrefix: 'gpt-5.2-pro', rates: { inputUsdPerMTokens: 21.0, outputUsdPerMTokens: 168.0 } },
    { modelPrefix: 'gpt-5-pro', rates: { inputUsdPerMTokens: 15.0, outputUsdPerMTokens: 120.0 } },

    {
      modelPrefix: 'gpt-5.2',
      rates: {
        inputUsdPerMTokens: 1.75,
        cachedInputUsdPerMTokens: 0.175,
        outputUsdPerMTokens: 14.0,
      },
    },
    {
      modelPrefix: 'gpt-5.1',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },
    {
      modelPrefix: 'gpt-5',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },

    {
      modelPrefix: 'gpt-5-mini',
      rates: {
        inputUsdPerMTokens: 0.25,
        cachedInputUsdPerMTokens: 0.025,
        outputUsdPerMTokens: 2.0,
      },
    },
    {
      modelPrefix: 'gpt-5-nano',
      rates: {
        inputUsdPerMTokens: 0.05,
        cachedInputUsdPerMTokens: 0.005,
        outputUsdPerMTokens: 0.4,
      },
    },

    // chat latest aliases
    {
      modelPrefix: 'gpt-5.2-chat-latest',
      rates: {
        inputUsdPerMTokens: 1.75,
        cachedInputUsdPerMTokens: 0.175,
        outputUsdPerMTokens: 14.0,
      },
    },
    {
      modelPrefix: 'gpt-5.1-chat-latest',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },
    {
      modelPrefix: 'gpt-5-chat-latest',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },

    // codex variants
    {
      modelPrefix: 'gpt-5.3-codex',
      rates: {
        inputUsdPerMTokens: 1.75,
        cachedInputUsdPerMTokens: 0.175,
        outputUsdPerMTokens: 14.0,
      },
    },
    {
      modelPrefix: 'gpt-5.2-codex',
      rates: {
        inputUsdPerMTokens: 1.75,
        cachedInputUsdPerMTokens: 0.175,
        outputUsdPerMTokens: 14.0,
      },
    },
    {
      modelPrefix: 'gpt-5.1-codex-max',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },
    {
      modelPrefix: 'gpt-5.1-codex',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },
    {
      modelPrefix: 'gpt-5-codex',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },
    {
      modelPrefix: 'gpt-5.1-codex-mini',
      rates: {
        inputUsdPerMTokens: 0.25,
        cachedInputUsdPerMTokens: 0.025,
        outputUsdPerMTokens: 2.0,
      },
    },
    {
      modelPrefix: 'codex-mini-latest',
      rates: { inputUsdPerMTokens: 1.5, cachedInputUsdPerMTokens: 0.375, outputUsdPerMTokens: 6.0 },
    },

    // GPT-4.1 family (corrected mini price)
    {
      modelPrefix: 'gpt-4.1',
      rates: { inputUsdPerMTokens: 2.0, cachedInputUsdPerMTokens: 0.5, outputUsdPerMTokens: 8.0 },
    },
    {
      modelPrefix: 'gpt-4.1-mini',
      rates: { inputUsdPerMTokens: 0.4, cachedInputUsdPerMTokens: 0.1, outputUsdPerMTokens: 1.6 },
    },
    {
      modelPrefix: 'gpt-4.1-nano',
      rates: { inputUsdPerMTokens: 0.1, cachedInputUsdPerMTokens: 0.025, outputUsdPerMTokens: 0.4 },
    },

    // GPT-4o family
    {
      modelPrefix: 'gpt-4o-2024-05-13',
      rates: { inputUsdPerMTokens: 5.0, outputUsdPerMTokens: 15.0 },
    },
    {
      modelPrefix: 'gpt-4o',
      rates: { inputUsdPerMTokens: 2.5, cachedInputUsdPerMTokens: 1.25, outputUsdPerMTokens: 10.0 },
    },
    {
      modelPrefix: 'gpt-4o-mini',
      rates: {
        inputUsdPerMTokens: 0.15,
        cachedInputUsdPerMTokens: 0.075,
        outputUsdPerMTokens: 0.6,
      },
    },

    // realtime
    {
      modelPrefix: 'gpt-4o-realtime-preview',
      rates: { inputUsdPerMTokens: 5.0, cachedInputUsdPerMTokens: 2.5, outputUsdPerMTokens: 20.0 },
    },
    {
      modelPrefix: 'gpt-4o-mini-realtime-preview',
      rates: { inputUsdPerMTokens: 0.6, cachedInputUsdPerMTokens: 0.3, outputUsdPerMTokens: 2.4 },
    },
    {
      modelPrefix: 'gpt-realtime',
      rates: { inputUsdPerMTokens: 4.0, cachedInputUsdPerMTokens: 0.4, outputUsdPerMTokens: 16.0 },
    },
    {
      modelPrefix: 'gpt-realtime-1.5',
      rates: { inputUsdPerMTokens: 4.0, cachedInputUsdPerMTokens: 0.4, outputUsdPerMTokens: 16.0 },
    },
    {
      modelPrefix: 'gpt-realtime-mini',
      rates: { inputUsdPerMTokens: 0.6, cachedInputUsdPerMTokens: 0.06, outputUsdPerMTokens: 2.4 },
    },

    // audio
    { modelPrefix: 'gpt-audio', rates: { inputUsdPerMTokens: 2.5, outputUsdPerMTokens: 10.0 } },
    { modelPrefix: 'gpt-audio-1.5', rates: { inputUsdPerMTokens: 2.5, outputUsdPerMTokens: 10.0 } },
    { modelPrefix: 'gpt-audio-mini', rates: { inputUsdPerMTokens: 0.6, outputUsdPerMTokens: 2.4 } },
    {
      modelPrefix: 'gpt-4o-audio-preview',
      rates: { inputUsdPerMTokens: 2.5, outputUsdPerMTokens: 10.0 },
    },
    {
      modelPrefix: 'gpt-4o-mini-audio-preview',
      rates: { inputUsdPerMTokens: 0.15, outputUsdPerMTokens: 0.6 },
    },

    // reasoning models
    { modelPrefix: 'o1-pro', rates: { inputUsdPerMTokens: 150.0, outputUsdPerMTokens: 600.0 } },
    {
      modelPrefix: 'o1',
      rates: { inputUsdPerMTokens: 15.0, cachedInputUsdPerMTokens: 7.5, outputUsdPerMTokens: 60.0 },
    },
    {
      modelPrefix: 'o1-mini',
      rates: { inputUsdPerMTokens: 1.1, cachedInputUsdPerMTokens: 0.55, outputUsdPerMTokens: 4.4 },
    },

    { modelPrefix: 'o3-pro', rates: { inputUsdPerMTokens: 20.0, outputUsdPerMTokens: 80.0 } },
    {
      modelPrefix: 'o3',
      rates: { inputUsdPerMTokens: 2.0, cachedInputUsdPerMTokens: 0.5, outputUsdPerMTokens: 8.0 },
    },
    {
      modelPrefix: 'o3-mini',
      rates: { inputUsdPerMTokens: 1.1, cachedInputUsdPerMTokens: 0.55, outputUsdPerMTokens: 4.4 },
    },
    {
      modelPrefix: 'o3-deep-research',
      rates: { inputUsdPerMTokens: 10.0, cachedInputUsdPerMTokens: 2.5, outputUsdPerMTokens: 40.0 },
    },

    {
      modelPrefix: 'o4-mini',
      rates: { inputUsdPerMTokens: 1.1, cachedInputUsdPerMTokens: 0.275, outputUsdPerMTokens: 4.4 },
    },
    {
      modelPrefix: 'o4-mini-deep-research',
      rates: { inputUsdPerMTokens: 2.0, cachedInputUsdPerMTokens: 0.5, outputUsdPerMTokens: 8.0 },
    },

    // search / tools
    {
      modelPrefix: 'gpt-5-search-api',
      rates: {
        inputUsdPerMTokens: 1.25,
        cachedInputUsdPerMTokens: 0.125,
        outputUsdPerMTokens: 10.0,
      },
    },
    {
      modelPrefix: 'gpt-4o-search-preview',
      rates: { inputUsdPerMTokens: 2.5, outputUsdPerMTokens: 10.0 },
    },
    {
      modelPrefix: 'gpt-4o-mini-search-preview',
      rates: { inputUsdPerMTokens: 0.15, outputUsdPerMTokens: 0.6 },
    },
    {
      modelPrefix: 'computer-use-preview',
      rates: { inputUsdPerMTokens: 3.0, outputUsdPerMTokens: 12.0 },
    },

    // image models
    {
      modelPrefix: 'gpt-image-1.5',
      rates: { inputUsdPerMTokens: 5.0, cachedInputUsdPerMTokens: 1.25, outputUsdPerMTokens: 10.0 },
    },
    {
      modelPrefix: 'chatgpt-image-latest',
      rates: { inputUsdPerMTokens: 5.0, cachedInputUsdPerMTokens: 1.25, outputUsdPerMTokens: 10.0 },
    },
    {
      modelPrefix: 'gpt-image-1',
      rates: { inputUsdPerMTokens: 5.0, cachedInputUsdPerMTokens: 1.25, outputUsdPerMTokens: 0.0 },
    },
    {
      modelPrefix: 'gpt-image-1-mini',
      rates: { inputUsdPerMTokens: 2.0, cachedInputUsdPerMTokens: 0.2, outputUsdPerMTokens: 0.0 },
    },

    // embeddings
    {
      modelPrefix: 'text-embedding-3-large',
      rates: { inputUsdPerMTokens: 0.13, outputUsdPerMTokens: 0.0 },
    },
    {
      modelPrefix: 'text-embedding-3-small',
      rates: { inputUsdPerMTokens: 0.02, outputUsdPerMTokens: 0.0 },
    },
    {
      modelPrefix: 'text-embedding-ada-002',
      rates: { inputUsdPerMTokens: 0.1, outputUsdPerMTokens: 0.0 },
    },
  ],
};
