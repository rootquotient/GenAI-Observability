# GenAI API Cost & Drift Monitor

A lightweight, provider-agnostic observability layer for GenAI APIs.

## Why?
GenAI APIs can silently become expensive, slow, or unpredictable as prompts and models change.
This tool helps teams track cost, latency, and prompt drift across GenAI providers.

## What it does
- Captures GenAI usage metrics
- Estimates API cost
- Detects prompt changes via hashing
- Works across providers
- Does not store prompt or response content by default

## What it does NOT do
- Modify or block GenAI calls
- Store sensitive data
- Evaluate output quality

## Quick start
(5-minute example)

## Architecture

Application
   ↓
GenAI Monitor (middleware)
   ↓
Provider Wrapper (OpenAI / Anthropic / Gemini)
   ↓
GenAI Provider API
   ↓
Metrics Storage (PostgreSQL)


