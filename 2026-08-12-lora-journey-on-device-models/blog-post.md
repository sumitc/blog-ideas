# What My LoRA Journey Taught Me About Building On-Device Models That Actually Work

If you want an AI model to do one very specific job well, LoRA starts to look less like a clever trick and more like a practical superpower.

I wanted a small on-device system that could turn natural-language prompts into wallpaper concepts and structured generation prompts, without a cloud call and without shipping a giant model every time I learned something new.

I considered a few model families, including Microsoft Foundry options. Microsoft Mu looked like the ideal direction, but it was blocked by runtime and weight availability constraints. The Phi models were good, but too heavy for the “runs on a laptop” requirement.

In the end, I chose **Qwen2.5-0.5B-Instruct** because it was small, instruction-tuned, and had downloadable weights that worked with the LoRA tooling I already needed.

Here’s the flow below: **concept → setup → training → evals → learnings & tips for bigger setups**.

[image: lora-overall-concept.png]

## 1) The concept — what LoRA actually does

LoRA, or Low-Rank Adaptation, works by freezing the base model and training tiny side matrices instead of the whole network. The base model keeps its general knowledge; the adapter learns the new task.

That makes it useful anywhere you want specialization without a full retrain:

- domain-specific assistants for legal, medical, or support flows
- style imitation for a particular brand voice or writing tone
- company knowledge retrieval or structured extraction
- on-device task specialists like classifiers, formatters, or prompt routers

The practical appeal is simple: you get a small adapter, faster iteration, and a way to swap behaviors without shipping a new full model every time.

My LoRA config was simple and practical: `r=8`, `alpha=16`, and target modules `q_proj, k_proj, v_proj, o_proj`. That kept the adapter tiny while still giving the model enough room to learn the structured-output behavior I wanted.

[image: lora-foundry-vs-qwen-selection.png]

## 2) Setup — the practical starting point

If you want to reproduce the workflow or adapt it for your own use case, here’s the path I’d recommend:

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

If you have a stronger machine, the setup gets more flexible: swap in the CUDA wheel for PyTorch, move to a bigger base if you have the RAM or VRAM, and use QLoRA or Unsloth if you want faster training on supported hardware.

```bash
# larger models with QLoRA / GPU support
uv pip install torch --index-url https://download.pytorch.org/whl/cu121

# try a bigger base if you have the RAM/VRAM
# Llama-3.2-1B-Instruct, Phi-2, Phi-3-mini, or even a 7B class model with QLoRA

# faster training on supported hardware
uv pip install unsloth
```

The general rule is: stronger machines let you move up a model tier, but the same LoRA idea still applies. Bigger machines give you more room; they don’t change the core tradeoff.

## 3) Training — where the real improvement came from

v1 was mostly proof that the setup worked at all. It showed that I could train a small model on-device and get the basic output shape right.

But then the real work started.

v2 gave me a first repeatable gold set: 41 cases. That turned the project from “feels okay” into “measurable.”

v3 added a harder test: fuzzy vocab strictness. That was the moment the model started revealing its actual weakness. It could still produce valid JSON, but on unseen prompts it invented field names that sounded right and were semantically close — but weren’t part of the closed vocabulary my wallpaper pipeline understood.

[image: lora-v1-v4-timeline.png]

The real fix was in the training data.

I looked at the corpus and found the real issue: too many prompts had `intent: null`, which meant the model had no positive examples for many of the field names I actually wanted it to use. So I expanded the labeler instead, covered more natural-language patterns, regenerated the corpus, and retrained.

That changed everything.

v4 pushed labeled coverage from **61% to 96.9%**, reduced eval loss, and doubled vocab strictness from **14% to 28%** on unseen prompts. It’s not perfect, but it proved the direction was right: if you want the model to learn the right vocabulary, fix the data before you add more code.

[image: lora-corpus-coverage-chart.png]

## 4) Evals — how I knew the fix worked

The evaluation layer mattered because it told me exactly what to improve.

v2 gave the first gold set.
v3 added the fuzzy vocab check.
v4 proved the data fix actually generalized.

[image: lora-fuzzy-strictness-chart.png]
[image: lora-eval-loss-chart.png]

If the model was just getting better at memorizing the training distribution, the loss might have improved without the fuzzy score moving. Instead, both moved in the right direction, which was the real signal.

## 5) Learnings & tips for bigger setups

1. Start with a narrow task.
2. Pick the smallest base model that still respects your output format.
3. Build a gold set early.
4. Add an eval that exposes the real failure mode.
5. Fix the corpus before reaching for extra runtime logic.
6. Keep serving-time prompts aligned with training-time prompts.
7. If you have stronger hardware, consider QLoRA, CUDA wheels, or a bigger base model — but keep the same evaluation discipline.
8. Use LoRA where the output structure matters more than general conversation breadth.

That’s the real lesson: LoRA is a great fit for domain assistants, style transfer, company knowledge tasks, wallpaper generators, classifiers, and formatters — anywhere the value is in reliable specialization. And a fine-tune can still look broken if the SYSTEM prompt doesn’t match what it saw during training.

For me, LoRA wasn’t just a cheaper way to fine-tune. It was the thing that made the whole system small enough to ship and specific enough to be useful.

If your use case is a wallpaper generator, a domain assistant, a formatter, a classifier, or any other narrow task where reliable structure matters, LoRA is worth a serious look.

**What would you try first with a small LoRA adapter?**

I write about practical AI builds, model tuning, and shipping local LLM systems — **follow me for more**.

*Tags: Artificial Intelligence, Machine Learning, LLM, Dev Tools, Learning*
