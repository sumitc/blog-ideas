// Extension: blog-writer
// Blog writing assistant with SEO, structure, distribution expertise.
// Encodes learnings from 3 published Medium posts (149 total reads across ~200 presentations)
// and a full post-performance analysis covering titles, CTAs, tags, length, and distribution.
//
// Blog repo: https://github.com/sumitc/blog-ideas
// Store all drafts and published posts in the blog-ideas repo for easy access and review.

import { joinSession } from "@github/copilot-sdk/extension";

// ─── Core framework ──────────────────────────────────────────────────────────

const BLOG_FRAMEWORK = `
## Blog Writing Framework (Hard-Won Learnings from 3 Published Posts)

### The #1 Rule
If impressions/presentations are low → it's a DISCOVERY problem (title, tags, distribution).
If read-ratio is low (<40%) → it's a CONTENT QUALITY or HOOK problem.
Fix these separately. Never confuse them.

Also track: Presentations → Views click-through. A strong title pulls 2–3x views vs presentations.
Weak titles get <1x (people see it but don't click).

### Title
- Title must serve the SEARCHER, not the author
- Titles that describe WHAT HAPPENED underperform. Lead with what the reader will LEARN or FEEL.
  ❌ "I tested ChatGPT, Claude, and Gemini on Chess" (describes the event)
  ✅ "All 3 AI Models Got My Chess Position Wrong — But Only One Admitted It" (leads with the outcome)
- Avoid personal milestone titles ("N episodes/days") — nobody searches for those
- Question-format titles work well when they voice a universal frustration:
  ✅ "Who Will Water My Plants While We Travel?" — immediately relatable
- Lead with benefit, counterintuitive insight, concrete number, or credibility signal ("still works 5 years later")
- Templates that work:
  · "[Surprising outcome] — But Only [Twist]"
  · "What [Experience] Taught Me About [Universal Skill]"
  · "N [Lessons/Things] From [Topic] That Every [Audience] Should Know"
  · "[Question readers are already asking]? Here's the [Time-tested / Surprising] Answer"
  · "I [Did Thing] — Here Are the [N] Lessons That Stuck"
- Avoid emoji in the title (hurts SEO on external search engines)
- No typos in tags — a single bad character (e.g. "Startupş") breaks indexing silently

### Post Length
- 2-min posts underperform across every metric vs 4–6 min posts
- Proof from real data: the only 5-min post had the best views (110), reads (61), and read ratio (55%)
- Short posts feel like teasers — readers feel cheated, don't follow
- Target 4–6 min by expanding the "so what" layer: more context, one extra anecdote, a practical checklist
- Never summarize in 4 bullets what deserves a full walkthrough

### Structure
- Formula that works: **Personal moment → Universal problem → Insight/Solution → Broadly applicable takeaway**
  This is the author's natural voice — lean into it on every post
- Lead with a SPECIFIC personal moment (a family chess game, a travel worry, a hallway conversation)
- Let the story carry the reader to the insight — don't announce the lesson before earning it
- Include at least one "scannable, quotable" section: a list, a comparison table, or numbered lessons
- Add a "recommended [X]" section when relevant — makes posts useful, saveable, and shareable
- Tease a follow-up when applicable: "I'm now at 40 episodes — Part 2 coming, follow to get it"
- Each section should answer: "What does the reader LEARN or FEEL here?"

### CTAs — Two Types Required
Every post needs BOTH:
1. **Engagement CTA** (comment question): "What's your travel-proofing hack?" — drives comments ✅ already doing this
2. **Follow CTA** (audience growth): "I write about [themes] — follow me so you don't miss the next one"
   → 149 reads across 3 posts = ZERO new followers because follow CTA was missing every time
   → Add one line before the tags on every post

### Content Depth
- Go DEEP on fewer things rather than shallow on many
- Generic bullet points kill credibility — back each insight with a specific example
- Include the actual details readers came for: the real chess position, the actual build photo, the specific episodes
- The "lessons" or "takeaways" section is the most shareable part — invest disproportionately there
- Write for readers who DON'T know the topic yet — don't assume context

### SEO & Medium Tags
- Target one specific search query per post — ask: "What would someone type to find this?"
- High-traffic Medium tags: Productivity, Self Improvement, Technology, Startup, Leadership, Life Lessons, Travel, Artificial Intelligence, ChatGPT
- Avoid niche/low-traffic tags (e.g. #TechHistory, #AcquiredPodcast, #SmartPlant)
- Use 4–5 tags, mix broad + specific
- ALWAYS proofread tags — a single typo (e.g. "Startupş") silently breaks indexing
- Topic-specific high-value tags by category:
  · AI/Tech: "Artificial Intelligence", "ChatGPT", "Machine Learning", "LLM"
  · Gardening/Home: "Travel", "Smart Home", "Home Improvement", "Gardening"
  · Business/Podcasts: "Startups", "Leadership", "Entrepreneurship", "Podcasts"

### Distribution (often more important than content)
- 90% internal Medium traffic = Medium is doing all the work and keeping it small
- 90% external traffic (like Post 2 / Chess post) = the ceiling is much higher
- Reddit is the #1 untapped channel — organic traction without any effort is a strong signal; act on it deliberately
  · r/chess, r/ChatGPT, r/artificial for AI posts
  · r/india, r/IndianGardening, r/DIY for home/garden posts
  · r/podcasts, r/entrepreneur for business/learning posts
- Pinterest explodes for DIY/home/garden content — underused and high-traffic
- LinkedIn post with first insight as hook (not just a link)
- Twitter/X thread format gets 3–5x more clicks than a single link tweet
- Indian Facebook groups for travel/home topics
- Time of posting: Tue–Thu mornings perform best

### What a Strong Post Looks Like
1. Title: Leads with outcome/lesson/surprise — not the event itself
2. Hook (first 3 sentences): Voices the reader's exact frustration or curiosity
3. Length: 4–6 min — enough to go deep, not so long it loses momentum
4. Body: Personal story → insight → practical takeaway with specific evidence
5. Scannable section: bullets, table, or numbered list somewhere in the middle
6. Visuals: Real photos > no images (scroll depth drops significantly without visuals)
7. Engagement CTA: A comment question at the end
8. Follow CTA: One line before tags — "follow me for more [topic]"
9. Tags: 4–5, proofread, mix of broad and specific — no typos

### Metrics Interpretation
- Presentations → Views ratio: 2x+ = strong title; <1x = title is invisible
- Read ratio 55%+ = content is good, discovery is the bottleneck
- Read ratio 40–55% = decent; hook could be stronger
- Read ratio <40% = hook or structure needs work
- 90% internal traffic = Medium is your only distributor; go find external audiences
- 90% external traffic = you have real organic pull; double down on that topic and community
- Claps are a vanity metric; comments, follows, and external referrals are real signals
- Zero followers after 149 reads = follow CTA was missing — fix this on all future posts
`;

// ─── Tool: blog_critique ─────────────────────────────────────────────────────

function generateCritique(title, content, impressions, reads) {
    const lines = [];

    // ── Metrics ──
    if (impressions != null && reads != null) {
        const ratio = Math.round((reads / impressions) * 100);
        lines.push("## 📊 Metrics Analysis");
        lines.push(`- Impressions: **${impressions}** | Reads: **${reads}** | Read ratio: **${ratio}%**`);
        if (impressions < 200) {
            lines.push("- 🚨 Very low impressions — this is a **discovery problem**, not content quality.");
            lines.push("  → Fix title, tags, and actively distribute before rewriting content.");
        }
        if (ratio >= 55) {
            lines.push("- ✅ Read ratio is strong — people who find it, finish it. Focus energy on distribution.");
        } else if (ratio >= 40) {
            lines.push("- ⚠️ Read ratio is okay but could be stronger — tighten the hook and opening paragraph.");
        } else {
            lines.push("- 🚨 Read ratio is low — the hook or structure needs work before distributing further.");
        }
        lines.push("");
    }

    // ── Title ──
    lines.push("## 🏷️ Title Analysis");
    const titleIssues = [];
    if (/\d+ (episode|day|week|month|year)s? in/i.test(title)) {
        titleIssues.push("Describes a personal milestone ('N episodes/days') — reframe around what the reader will *learn or gain*.");
    }
    if (/here'?s? what happened/i.test(title)) {
        titleIssues.push("'Here's what happened' is vague — replace with the actual surprising outcome.");
    }
    if (/[^\x00-\x7F]/.test(title)) {
        titleIssues.push("Contains emoji — these hurt SEO on external search engines.");
    }
    if (title.length < 30) {
        titleIssues.push("Title is short — consider adding a benefit, twist, or outcome phrase.");
    }
    if (!/lesson|why|how|what|guide|hack|mistake|secret|truth|real|best|worst|should|never|always|wrong|taught|still works|years later/i.test(title)) {
        titleIssues.push("Title lacks a value/outcome signal — add 'why', 'how', 'what X taught me', or a result.");
    }
    if (titleIssues.length === 0) {
        lines.push("- ✅ Title looks solid.");
    } else {
        titleIssues.forEach(i => lines.push(`- ⚠️ ${i}`));
    }
    lines.push("");

    // ── Content ──
    if (content) {
        lines.push("## 📝 Content Analysis");
        const wordCount = content.split(/\s+/).length;
        const estReadMin = Math.round(wordCount / 200);
        lines.push(`- Word count: ~${wordCount} words (~${estReadMin} min read)`);

        if (wordCount < 600) {
            lines.push("- 🚨 Post is too short — real data shows 2-min posts underperform 5-min posts on every metric. Aim for 4–6 min (800–1200 words).");
        } else if (wordCount < 800) {
            lines.push("- ⚠️ Post is on the shorter side — consider expanding the 'so what' layer with one more anecdote or a practical checklist.");
        } else if (wordCount > 1800) {
            lines.push("- ℹ️ Long post — make sure each section earns its place.");
        } else {
            lines.push("- ✅ Good length for depth and Medium recommendations.");
        }

        // Check for personal story dominance in opening
        const firstThird = content.slice(0, Math.floor(content.length / 3));
        const iWords = (firstThird.match(/\bI\b/g) || []).length;
        if (iWords > 12) {
            lines.push("- ⚠️ Opening is heavy on 'I' — lead with the reader's pain or curiosity first, then bring in the personal story.");
        }

        // Check for lessons/takeaways section
        if (!/lesson|takeaway|learn|key insight|what i (discovered|found|realized)|taught me/i.test(content)) {
            lines.push("- ⚠️ No explicit lessons/takeaways section — this is the most shareable part; add one.");
        }

        // Check for image placeholders
        if (/\[IMAGE:/i.test(content)) {
            lines.push("- 🚨 Post contains image placeholders — replace with real photos before publishing. Missing visuals hurt scroll depth significantly.");
        }

        // Check for follow CTA
        if (!/follow|subscribe/i.test(content.slice(-600))) {
            lines.push("- 🚨 No follow CTA — real data: 149 reads across 3 posts = 0 new followers because this was missing. Add: 'I write about [X] — follow me so you don't miss the next one.'");
        }

        // Check for engagement CTA
        if (!/comment|what'?s? your|what do you|drop a|let me know|have you/i.test(content.slice(-600))) {
            lines.push("- ⚠️ No engagement CTA — add a comment question at the end to drive signals to Medium's algorithm.");
        }

        lines.push("");
    }

    // ── Distribution ──
    lines.push("## 📣 Distribution Checklist");
    lines.push("- [ ] Identify the right subreddit(s) for this topic and post manually with a sharp title");
    lines.push("  · AI/tech → r/ChatGPT, r/artificial, r/MachineLearning");
    lines.push("  · Home/garden/DIY → r/india, r/DIY, r/IndianGardening");
    lines.push("  · Business/learning → r/podcasts, r/entrepreneur, r/selfimprovement");
    lines.push("- [ ] LinkedIn post — lead with the first insight, not just a link");
    lines.push("- [ ] Twitter/X thread (thread format gets 3–5x more clicks than a link tweet)");
    lines.push("- [ ] Pinterest for DIY/home/garden content (high organic reach)");
    lines.push("- [ ] Posted Tue–Thu morning for best reach");
    lines.push("");

    // ── Tags ──
    lines.push("## 🏷️ Tag Recommendations");
    lines.push("Use 4–5 tags — mix broad + specific. PROOFREAD every tag (a single typo breaks indexing silently):");
    lines.push("- Broad (high-traffic): Productivity, Self Improvement, Technology, Leadership, Life Lessons, Travel");
    lines.push("- AI posts: Artificial Intelligence, ChatGPT, Machine Learning, LLM");
    lines.push("- Home/garden: Smart Home, Gardening, DIY, Home Improvement, Travel");
    lines.push("- Business/learning: Startups (not 'Startupş'!), Leadership, Entrepreneurship, Podcasts");

    return lines.join("\n");
}

// ─── Tool: blog_title_ideas ───────────────────────────────────────────────────

function generateTitleIdeas(topic, audience, angle) {
    const audienceStr = audience || "curious professionals";
    const angleStr = angle || "lessons and insights";

    return `## 💡 Title Ideas for: "${topic}"

### Outcome-Led (strongest for click-through)
1. "All [N] [Things] Got It Wrong — But Only One [Twist]"
2. "What ${topic} Taught Me About [Universal Skill] That I Didn't Expect"
3. "I [Did Thing Related to ${topic}] — Here Are the [N] Lessons That Stuck"
4. "[Surprising result from ${topic}] — And Why It Changes Everything"

### Question Format (works when it voices a universal frustration)
5. "Who Will [Universal Problem]? Here's the [Time-tested] Answer"
6. "Why Does [Common Assumption about ${topic}] Keep Failing [${audienceStr}]?"
7. "Still Struggling With [Problem ${topic} solves]? Try This"

### Benefit-Led
8. "The ${topic} ${angleStr} Every ${audienceStr} Should Know"
9. "N Things About ${topic} That [Industry] Gets Wrong"
10. "What Nobody Tells You About ${topic} (Until It's Too Late)"

---
💡 **The test:** Can you answer "What would someone TYPE to find this post?"
If yes — that's your title. If not — keep going.

⚠️ **Avoid:** Titles that only describe the event ("I did X") without signaling what the reader gains.`;
}

// ─── Extension session ────────────────────────────────────────────────────────

const session = await joinSession({
    tools: [
        {
            name: "blog_critique",
            description: "Critique a blog post draft and get structured feedback on title, content, SEO, and distribution. Encodes learnings from real blog performance analysis.",
            skipPermission: true,
            parameters: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "The blog post title",
                    },
                    content: {
                        type: "string",
                        description: "The full blog post content (markdown or plain text). Optional but recommended.",
                    },
                    impressions: {
                        type: "number",
                        description: "Number of impressions/presentations the post received (if published). Optional.",
                    },
                    reads: {
                        type: "number",
                        description: "Number of reads the post received (if published). Optional.",
                    },
                },
                required: ["title"],
            },
            handler: async ({ title, content, impressions, reads }) => {
                return generateCritique(title, content, impressions, reads);
            },
        },
        {
            name: "blog_title_ideas",
            description: "Generate strong, outcome-led, searchable title ideas for a blog post topic. Applies proven title frameworks that improve discoverability.",
            skipPermission: true,
            parameters: {
                type: "object",
                properties: {
                    topic: {
                        type: "string",
                        description: "The subject or topic of the blog post",
                    },
                    audience: {
                        type: "string",
                        description: "Who the target reader is (e.g., 'startup founders', 'software engineers', 'curious professionals'). Optional.",
                    },
                    angle: {
                        type: "string",
                        description: "The angle or lens of the post (e.g., 'lessons learned', 'book review', 'how-to guide'). Optional.",
                    },
                },
                required: ["topic"],
            },
            handler: async ({ topic, audience, angle }) => {
                return generateTitleIdeas(topic, audience, angle);
            },
        },
        {
            name: "blog_framework",
            description: "Return the full blog writing framework: title rules, structure, length, CTAs, SEO, distribution checklist, and metrics interpretation. Use this as a reference when writing or reviewing any blog post.",
            skipPermission: true,
            parameters: { type: "object", properties: {} },
            handler: async () => BLOG_FRAMEWORK,
        },
    ],
    hooks: {
        onUserPromptSubmitted: async ({ prompt }) => {
            const blogKeywords = /\b(blog|post|article|medium|write|writing|draft|publish|title|headline)\b/i;
            if (blogKeywords.test(prompt)) {
                return {
                    additionalContext: `The user is working on blog content. Key rules from real post-performance data:
- Titles must lead with OUTCOME or LESSON, not describe the event ("Here's what happened" = weak)
- Every post needs TWO CTAs: (1) a comment question + (2) a follow CTA — zero followers came from 149 reads because follow CTA was missing
- Target 4–6 min (800–1200 words) — the only 5-min post was the best performer by every metric
- Low impressions = discovery problem (title/tags/distribution); low read ratio = content/hook problem
- Reddit is the #1 untapped channel — post manually to the right subreddit with a sharp title
- Always proofread tags — a single typo (e.g. "Startupş") silently breaks indexing
- Use blog_critique, blog_title_ideas, or blog_framework tools when helpful`,
                };
            }
        },
    },
});
