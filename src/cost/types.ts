export type PricingId = `${string}/v${number}`;

export interface TokenRates {
  inputUsdPerMTokens: number;
  outputUsdPerMTokens: number;
  cachedInputUsdPerMTokens?: number;
}

export interface ModelPricingRule {
  modelPrefix: string;
  rates: TokenRates;
}

export interface ProviderPricingTable {
  pricingId: PricingId;
  models: ModelPricingRule[];
}

export interface CostEstimationInput {
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

export interface CostEstimationResult {
  costUsd: number;
  pricingId: PricingId;
}
