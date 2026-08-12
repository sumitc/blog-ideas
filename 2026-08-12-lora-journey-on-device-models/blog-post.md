# What My LoRA Journey Taught Me About Building On-Device Models That Actually Work

If you want an AI model to do one very specific job well, LoRA starts to look less like a clever trick and more like a practical superpower.

That was the lesson from my recent LoRA journey. I wasn’t trying to build a general chat model. I wanted a small on-device system that could turn natural-language prompts into wallpaper concepts and structured generation prompts, without a cloud call and without shipping a giant model every time I learned something new.

[image: lora-overall-concept.png]

## Why LoRA made sense

The core idea is simple: freeze the base model, then train tiny adapter layers on top. Instead of updating every weight in a huge model, you teach a small side path to specialize for one task.

That matters when the job is narrow. For me, the task was turning prompts like “sunset over a rainy city skyline” or “minimal neon astronaut wallpaper” into clean structured instructions that my app could use directly.

I considered a few model families, including Microsoft Foundry options. Microsoft Mu looked like the ideal direction, but it was blocked by runtime and weight availability constraints. The Phi models were good, but too heavy for the “runs on a laptop” requirement.

In the end, I chose **Qwen2.5-0.5B-Instruct** because it was small, instruction-tuned, and had downloadable weights that worked with the LoRA tooling I already needed.

My LoRA config was simple and practical: `r=8`, `alpha=16`, and target modules `q_proj, k_proj, v_proj, o_proj`. That kept the adapter tiny while still giving the model enough room to learn the structured-output behavior I wanted.

[image: lora-foundry-vs-qwen-selection.png]

## LoRA in plain English

LoRA, or Low-Rank Adaptation, works by freezing the base model and training tiny side matrices instead of the whole network. The base model keeps its general knowledge; the adapter learns the new task.

That makes it useful anywhere you want specialization without a full retrain:

- domain-specific assistants for legal, medical, or support flows
- style imitation for a particular brand voice or writing tone
- company knowledge retrieval or structured extraction
- on-device task specialists like classifiers, formatters, or prompt routers

The practical appeal is simple: you get a small adapter, faster iteration, and a way to swap behaviors without shipping a new full model every time.

## What the first versions taught me

v1 was mostly proof that the setup worked at all. It showed that I could train a small model on-device and get the basic output shape right.

But then the real work started.

v2 gave me a first repeatable gold set: 41 cases. That turned the project from “feels okay” into “measurable.”

v3 added a harder test: fuzzy vocab strictness. That was the moment the model started revealing its actual weakness. It could still produce valid JSON, but on unseen prompts it invented field names that sounded right and were semantically close — but weren’t part of the closed vocabulary my wallpaper pipeline understood.

[image: lora-v1-v4-timeline.png]
[image: lora-fuzzy-strictness-chart.png]

## The real fix was data, not code

My first instinct was to patch the output with a runtime post-processor. That would have snapped invented fields back into the valid vocab.

But the better fix was in the training data.

I looked at the corpus and found the real issue: too many prompts had `intent: null`, which meant the model had no positive examples for many of the field names I actually wanted it to use. So I expanded the labeler instead, covered more natural-language patterns, regenerated the corpus, and retrained.

That changed everything.

v4 pushed labeled coverage from **61% to 96.9%**, reduced eval loss, and doubled vocab strictness from **14% to 28%** on unseen prompts. It’s not perfect, but it proved the direction was right: if you want the model to learn the right vocabulary, fix the data before you add more code.

[image: lora-corpus-coverage-chart.png]
[image: lora-eval-loss-chart.png]

## The setup commands I’d give anyone who wants to try this

If you want to reproduce the workflow or adapt it for your own use case, here’s the practical path:

```bash
cd training
uv sync

# serve the shipped adapter
uv run python serve.py --port 8091 --adapter output/<your-adapter-name>/final

# sanity-check the model
curl -X POST http://localhost:8091/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"cinematic wallpaper of a neon-lit mountain road at dusk"}'

# from the app side
cd ..
npm install
npm run dev

# optional: regenerate the corpus
cd training
uv run python data/build_corpus_v4.py

# optional: retrain
uv run python train_v4.py

# optional: rerun evaluation
cd ../app
node eval/run-v4-eval.mjs
node eval/fold-audit.mjs
```

If you want GPU training later, the main shift is swapping in the CUDA wheel for PyTorch and moving the batch size up. The rest of the workflow stays the same.

If you have a stronger machine, the setup gets more flexible:

```bash
# larger models with QLoRA / GPU support
uv pip install torch --index-url https://download.pytorch.org/whl/cu121

# try a bigger base if you have the RAM/VRAM
# Llama-3.2-1B-Instruct, Phi-2, Phi-3-mini, or even a 7B class model with QLoRA

# faster training on supported hardware
uv pip install unsloth
```

The general rule is: if you have a stronger machine, you can move up a model tier, but the same LoRA idea still applies. Bigger machines give you more room; they don’t change the core tradeoff.

## What I’d tell someone building their own LoRA project

1. Start with a narrow task.
2. Pick the smallest base model that still respects your output format.
3. Build a gold set early.
4. Add an eval that exposes the real failure mode.
5. Fix the corpus before reaching for extra runtime logic.
6. Keep serving-time prompts aligned with training-time prompts.

That last one matters more than it sounds. A fine-tune can look broken if the SYSTEM prompt doesn’t match what it saw during training.

For me, LoRA wasn’t just a cheaper way to fine-tune. It was the thing that made the whole system small enough to ship and specific enough to be useful.

If your use case is a wallpaper generator, a domain assistant, a formatter, a classifier, or any other narrow task where reliable structure matters, LoRA is worth a serious look.

**What would you try first with a small LoRA adapter?**

I write about practical AI builds, model tuning, and shipping local LLM systems — **follow me for more**.

*Tags: Artificial Intelligence, Machine Learning, LLM, Dev Tools, Learning*
