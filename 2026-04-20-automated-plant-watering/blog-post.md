# Automating Plant Watering — Still Ever"green" 🌱

> *How I built a DIY smart watering system for 50+ plants — and it's still running 5 years later.*

---

Back in 2020, I posted a one-liner on LinkedIn that got more attention than most of my "serious" posts:

> "Nothing gives more satisfaction than monitoring & watering your 50+ plants from 600+ Kms away!!"

The comments poured in: *"Write a how-to blog!"*, *"I still rely on my neighbors!"*, *"We need to solve the same problem!"* Friends, colleagues — even strangers — wanted to know: how do you keep 50+ plants alive when you're not home?

Well, it took me a while, but here's the story. And the best part? **The system is still running.** Five years later. Still ever-green.

---

## The Problem

I love plants. My terrace garden in India has over 50 of them — flowering plants, herbs, a few vegetables. But I travel a lot for work. Sometimes I'm 600 km away. Sometimes across the globe.

Asking neighbors works... once. Twice. But it's not sustainable. Plants don't wait for your schedule. Miss two days in Indian summer, and it's game over.

I needed something I could rely on — something that didn't need a favor from anyone.

**[IMAGE: A lush terrace garden with visible drip irrigation lines and a small electronics box mounted on the wall]**

---

## The Build

The idea was simple: **sense the soil, water when dry, control it from my phone.**

Here's what I used:

- **Microcontroller** (ESP32) — the brain, with built-in WiFi
- **Soil moisture sensors** — one per zone, to know when plants are thirsty
- **Solenoid valve + water pump** — to control water flow
- **Relay module** — to safely switch the pump on/off from the microcontroller
- **Drip irrigation tubing** — to distribute water evenly across all plants
- **A simple mobile dashboard** — to monitor readings and trigger watering remotely

Total cost? Under ₹3,000 (~$35). Total time to set up? A weekend.

**[IMAGE: System architecture diagram — sensor → microcontroller → relay → pump → drip lines, with WiFi connecting to phone]**

---

## How It Works

1. **Soil moisture sensors** sit in the soil across different zones (sunny side, shaded side, herbs, etc.)

2. The **ESP32 reads moisture levels** every few minutes and pushes data to a simple cloud dashboard

3. When moisture drops below a threshold — or when I press a button on my phone — the **relay triggers the pump**

4. Water flows through **drip irrigation lines**, giving each plant exactly what it needs

5. After a set duration, the pump shuts off automatically

It's not rocket science. It's a weekend project with components you can buy online. But the impact? Transformative.

---

## Five Years Later

The system has survived:

- Multiple Indian summers (45°C+)
- Monsoon seasons
- Power outages (auto-resumes on reboot)
- Zero maintenance for months at a stretch

Some sensors have needed replacing (moisture sensors corrode over time — pro tip: coat them in waterproof sealant). The pump is still the original one. The ESP32 hasn't been rebooted in months.

**50+ plants. Alive and thriving. From anywhere in the world.**

**[IMAGE: Healthy green plants on a terrace with a phone screen overlay showing moisture readings and a "Water Now" button]**

---

## Why This Still Matters

We live in an age of smart everything — smart lights, smart locks, smart speakers. But smart gardening is still underrated. It's not about being lazy. It's about being reliable. Your plants don't care about your meeting schedule.

If you have a garden you love, a travel schedule you can't control, and a weekend to spare — **build this**. Your plants will thank you. Silently. In green.

---

*Still ever-green. 🌿*

---

**What's your plant care hack? Drop a comment — I'd love to hear how you keep your garden alive!**

---

*Tags: Gardening, Smart Home, IoT, DIY, Automation, Weekend Project*
