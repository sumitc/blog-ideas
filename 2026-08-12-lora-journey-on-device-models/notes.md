# Notes: What My LoRA Journey Taught Me About Building On-Device Models That Actually Work

## Core story
- Personal moment: wanting a local model that can turn natural-language prompts into structured wallpaper-generation instructions.
- Big decision: choose a small instruction-tuned base model that supports downloadable weights.
- Key learning: the main bottleneck was not the adapter; it was label coverage in the training data.
- Final takeaway: fix data first, then use evals to prove the improvement.

## Broader LoRA angle to include
- Plain-English LoRA explanation: frozen base + tiny trainable adapters.
- Common use cases: domain assistants, style transfer, company knowledge, on-device task specialists.
- Better-machine options: larger base models, QLoRA, CUDA/PyTorch, and faster tooling like Unsloth.
- Goal framing: pick the smallest model that still respects the output format and the deployment target.

## Source material
- HTML concept/architecture brief: `/Users/sumitc/Downloads/lora-foundry-and-setup.html`
- HTML iteration/eval brief: `/Users/sumitc/Downloads/lora-v1-to-v4-evolution.html`
- PDF overview: `/Users/sumitc/Downloads/Deep Dive into LoRA Fine-Tuning.pdf`

## Useful numbers
- Base model: `Qwen2.5-0.5B-Instruct`
- LoRA config: `r=8`, `alpha=16`, target modules `q_proj, k_proj, v_proj, o_proj`
- Adapter size: ~17.6 MB
- v3 corpus: 854 rows, 61% labeled
- v4 corpus: 865 rows, 96.9% labeled
- v3 fuzzy strictness: 14%
- v4 fuzzy strictness: 28%

## Visual placeholders
- `lora-overall-concept.png`
- `lora-foundry-vs-qwen-selection.png`
- `lora-v1-v4-timeline.png`
- `lora-corpus-coverage-chart.png`
- `lora-fuzzy-strictness-chart.png`
- `lora-eval-loss-chart.png`

## Tags
#ArtificialIntelligence #MachineLearning #LLM #DevTools #Learning
