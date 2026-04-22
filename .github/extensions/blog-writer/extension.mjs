// Extension: blog-writer
// Blog writing assistant with SEO, structure, distribution expertise.
// Encodes learnings from analyzing a Medium blog post with 80 impressions / 46 reads
// and the patterns that drive discovery, engagement, and distribution.

import { joinSession } from "@github/copilot-sdk/extension";

// ─── Core framework ──────────────────────────────────────────────────────────

const BLOG_FRAMEWORK = `
## Blog Writing Framework (Hard-Won Learnings)

### The #1 Rule
If impressions are low → it's a DISCOVERY problem (title, tags, distribution).
If read-ratio is low (<40%) → it's a CONTENT QUALITY problem.
Fix these separately. Never confuse them.

### Title
- Title must serve the SEARCHER, not the author
- Avoid personal milestone titles ("I did X in Y days") — nobody searches for those
- Lead with benefit, counterintuitive insight, or concrete number
- Templates that work:
  · "N Lessons I Learned From [Thing] That Changed How I [Outcome]"
  · "Why [Common Belief] Is Wrong (And What to Do Instead)"
  · "The [Thing] That Every [Audience] Should Know But Doesn't"
  · "I [Did Unusual Thing] for [Time Period] — Here's What Actually Happened"
- Avoid emoji in the title (hurts SEO on external search engines)

### Structure
- Lead with VALUE, not backstory — the personal story is the seasoning, not the meal
- Lessons-first format outperforms diary format for shareability
- Each section should answer: "What does the reader LEARN or FEEL here?"
- Keep sections tight. If a section doesn't add value, cut it.
- End with a CTA that invites engagement: a question, a challenge, or a prediction

### Content Depth
- Go DEEP on fewer things rather than shallow on many
- Generic bullet points kill credibility — back each insight with a specific example
- The most re-shared content answers: "Why does this matter to ME right now?"
- The "lessons" or "takeaways" section is the most shareable part — invest disproportionately there
- Write for readers who DON'T know the topic yet — don't assume context

### SEO & Medium Tags
- Target one specific search query per post — ask: "What would someone type to find this?"
- High-traffic Medium tags: Productivity, Self Improvement, Technology, Startup, Leadership, Life Lessons
- Avoid niche/low-traffic tags like topic-specific ones (#TechHistory, #AcquiredPodcast)
- Use 4–5 tags, mix broad (Productivity) and specific (Podcasts)

### Distribution (often more important than content)
- Post link in relevant communities: Reddit (r/podcasts, r/entrepreneur), LinkedIn, Twitter/X
- Engage in the comments of related posts to get organic discovery
- Twitter/X thread version of the post drives more clicks than a single link tweet
- Share in Slack communities, Discord servers, newsletters where the target reader hangs out
- Time of posting matters: Tue–Thu mornings (reader's timezone) perform best

### What a Strong Post Looks Like
1. Title: Benefit-led, searchable, no personal milestone framing
2. Hook (first 3 sentences): Speaks to the READER's pain/curiosity, not the author's journey
3. Body: Lessons or insights with specific evidence — not just summaries
4. Visuals: Real images > placeholder descriptions (they significantly affect scroll depth)
5. CTA: One clear ask — comment, follow, share, or try something
6. Tags: 4–5, mix of broad and specific

### Metrics Interpretation
- Impressions < 200 on Medium = virtually no external distribution; fix this first
- Read ratio 55%+ = content is good, discovery is the bottleneck
- Read ratio < 40% = hook or structure needs work
- Claps are a vanity metric; comments and shares are real signals
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
            lines.push("- 🚨 Impressions are very low — this is a **discovery problem**, not content quality.");
            lines.push("  → Fix title, tags, and distribution before rewriting the content.");
        }
        if (ratio >= 55) {
            lines.push("- ✅ Read ratio is strong — people who find the post, like it.");
        } else if (ratio < 40) {
            lines.push("- ⚠️ Read ratio is low — the hook or opening section needs work.");
        }
        lines.push("");
    }

    // ── Title ──
    lines.push("## 🏷️ Title Analysis");
    const titleIssues = [];
    if (/\d+ (episode|day|week|month|year)/i.test(title)) {
        titleIssues.push("Contains a personal milestone ('N episodes/days') — this doesn't serve searchers.");
    }
    if (/[^\x00-\x7F]/.test(title)) {
        titleIssues.push("Contains emoji — these hurt SEO on external search engines.");
    }
    if (title.length < 30) {
        titleIssues.push("Title is short — consider adding a benefit or hook phrase.");
    }
    if (!/lesson|why|how|what|guide|mistake|secret|truth|real|best|worst|should|never|always/i.test(title)) {
        titleIssues.push("Title lacks a benefit/value signal — add 'why', 'how', 'lesson', or a concrete outcome.");
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
        lines.push(`- Word count: ~${wordCount} words`);

        if (wordCount < 500) {
            lines.push("- ⚠️ Post is short — Medium posts under 500 words rarely get recommended.");
        } else if (wordCount > 1800) {
            lines.push("- ℹ️ Long post — make sure each section earns its place.");
        }

        // Check for personal story dominance
        const firstThird = content.slice(0, Math.floor(content.length / 3));
        const iWords = (firstThird.match(/\bI\b/g) || []).length;
        if (iWords > 10) {
            lines.push("- ⚠️ Opening section is heavy on 'I' — consider leading with reader value instead of personal narrative.");
        }

        // Check for lessons/takeaways section
        if (!/lesson|takeaway|learn|key insight|what i (discovered|found|realized)/i.test(content)) {
            lines.push("- ⚠️ No explicit 'lessons' or 'takeaways' section found — this is the most shareable part; add one.");
        }

        // Check for CTA
        if (!/comment|share|follow|what do you|what's your|let me know|try this|challenge/i.test(content.slice(-500))) {
            lines.push("- ⚠️ No call-to-action at the end — add an engaging question or challenge.");
        }

        // Check for image placeholders
        if (/\[IMAGE:/i.test(content)) {
            lines.push("- 🚨 Post contains image placeholders — replace with real images before publishing. Placeholders hurt scroll depth.");
        }

        lines.push("");
    }

    // ── Distribution ──
    lines.push("## 📣 Distribution Checklist");
    lines.push("- [ ] Shared in relevant subreddits (r/podcasts, r/entrepreneur, r/selfimprovement, etc.)");
    lines.push("- [ ] Twitter/X thread (not just a link — thread format gets 3-5x more clicks)");
    lines.push("- [ ] LinkedIn post with first insight as a hook");
    lines.push("- [ ] Shared in relevant Slack/Discord communities");
    lines.push("- [ ] Posted Tue–Thu morning for best reach");
    lines.push("");

    // ── Tags ──
    lines.push("## 🏷️ Tag Recommendations");
    lines.push("Use 4–5 tags mixing broad + specific:");
    lines.push("- Broad (high-traffic): Productivity, Self Improvement, Technology, Leadership, Life Lessons");
    lines.push("- Specific: match your topic (Podcasts, Startup, Tech History)");
    lines.push("- Avoid very niche tags with <10K followers on Medium");

    return lines.join("\n");
}

// ─── Tool: blog_title_ideas ───────────────────────────────────────────────────

function generateTitleIdeas(topic, audience, angle) {
    const audienceStr = audience || "curious professionals";
    const angleStr = angle || "lessons and insights";

    return `## 💡 Title Ideas for: "${topic}"

### Benefit-Led (recommended)
1. "The ${topic} Lesson Nobody Talks About"
2. "What ${topic} Taught Me About [Related Skill] That Changed Everything"
3. "N Things I Wish I Knew Before [Topic-related action]"
4. "Why ${topic} Is the Best [Category] for ${audienceStr} Right Now"

### Curiosity / Counterintuitive
5. "The Surprising Truth About ${topic}"
6. "Stop [Common Thing Related to Topic] — Do This Instead"
7. "I Was Wrong About ${topic} (And Here's What Actually Works)"

### Story-Driven (with value hook)
8. "I Spent [Time] With ${topic} — Here's What Actually Happened"
9. "What ${topic} Gets Right That [Industry/Field] Still Gets Wrong"

### Numbers
10. "N ${angleStr} From ${topic} That Every ${audienceStr} Should Know"

---
💡 **Pick the one where you can answer:** "What would someone TYPE to find this post?"
That's your title.`;
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
                        description: "Number of impressions the post received (if published). Optional.",
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
            description: "Generate strong, benefit-led, searchable title ideas for a blog post topic. Applies proven title frameworks that improve discoverability.",
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
            description: "Return the full blog writing framework: title rules, structure, SEO, distribution checklist, and metrics interpretation. Use this as a reference when writing or reviewing any blog post.",
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
                    additionalContext: `The user is working on blog content. Apply the blog writing framework:
- Title must be searchable and benefit-led, NOT a personal milestone
- Lead with reader value, not personal backstory
- Include an explicit lessons/takeaways section — it's the most shareable part
- End with a CTA (question or challenge)
- Low impressions = discovery problem (fix title/tags/distribution)
- Low read ratio (<40%) = content/hook problem
- Use blog_critique, blog_title_ideas, or blog_framework tools if helpful`,
                };
            }
        },
    },
});
