# Image prompts for the LoRA journey post

## 1. Overall concept infographic
- File: `lora-overall-concept.png`
- Goal: explain LoRA as a frozen base model plus tiny trainable adapters.
- Style: clean infographic, light background, minimal, technical, easy to read on mobile.
- Show: base model block, adapter block, arrow into output JSON, small note on “train tiny adapter, keep base frozen”.

## 2. Model choice comparison
- File: `lora-foundry-vs-qwen-selection.png`
- Goal: show why Qwen2.5-0.5B-Instruct was chosen over Foundry/Phi options.
- Style: comparison table or decision grid.
- Show: Mu blocked by weights/runtime, Phi too heavy, Qwen small + downloadable + instruction-tuned.

## 3. v1 → v4 timeline
- File: `lora-v1-v4-timeline.png`
- Goal: show the one-week iteration path from proof-of-concept to stronger evals.
- Style: simple horizontal timeline with v1, v2, v3, v4 markers.
- Show: v1 no eval, v2 gold set, v3 intent label gap, v4 labeler fix.

## 4. Corpus coverage chart
- File: `lora-corpus-coverage-chart.png`
- Goal: visualize labeled coverage improvement.
- Style: bar chart, clean and readable.
- Show: v3 61% labeled vs v4 96.9% labeled.

## 5. Fuzzy strictness chart
- File: `lora-fuzzy-strictness-chart.png`
- Goal: show strictness improvement on unseen prompts.
- Style: two bars, before/after.
- Show: v3 14% vs v4 28%.

## 6. Eval loss chart
- File: `lora-eval-loss-chart.png`
- Goal: show the loss improvement alongside the behavior metric.
- Style: clean bar or line chart.
- Show: v3 0.071 vs v4 0.060.

