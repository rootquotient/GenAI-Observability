import { OPENAI_PRICING_V1 } from './openai.v1.js';
import type { CostEstimationInput, CostEstimationResult, ProviderPricingTable } from './types.js';

function normalizeModel(model: string): string {
  return model.trim().toLowerCase();
}

function getPricingTable(provider: string): ProviderPricingTable | null {
  if (provider === 'openai') {
    return OPENAI_PRICING_V1;
  }

  return null;
}

function resolveModelRates(table: ProviderPricingTable, model: string) {
  const normalized = normalizeModel(model);
  const sorted = [...table.models].sort((a, b) => b.modelPrefix.length - a.modelPrefix.length);
  return sorted.find((m) => normalized.startsWith(m.modelPrefix)) ?? null;
}

export function estimateCost(input: CostEstimationInput): CostEstimationResult | null {
  const table = getPricingTable(input.provider);
  if (!table) {
    return null;
  }

  const modelRule = resolveModelRates(table, input.model);
  if (!modelRule) {
    return null;
  }

  const promptTokens = Math.max(0, input.promptTokens);
  const completionTokens = Math.max(0, input.completionTokens);

  const costUsd =
    (promptTokens * modelRule.rates.inputUsdPerMTokens +
      completionTokens * modelRule.rates.outputUsdPerMTokens) /
    1_000_000;

  return { costUsd, pricingId: table.pricingId };
}
