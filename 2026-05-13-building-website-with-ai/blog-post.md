# Your Personal Website in 2026: The Hard Part Isn't Building It

> *How a single evening conversation with AI went from zero to a live site — and what that reveals about where the real work actually is.*

---

![Homepage of sumitc.in — the finished product](images/ss-homepage.png)

I used to think the hard part of having a personal website was the *building*. The tech stack, the hosting, the DNS records, the deployment pipeline. I was wrong. I realized this after spending a single evening conversation with GitHub Copilot CLI — and ending up with a live site at [sumitc.in](https://sumitc.in), complete with a blog that syncs titles from Medium and Substack, a kids' books section, a custom domain, and a booking page. The hard part was never the code. It was answering two questions: *Who is this for?* and *What value does it create for them?* Once I got honest about those — I write for people curious about tech, AI, and building things; I want them to read my work and reach out easily — everything else snapped into place. The site became a reflection of intent, not a technical achievement.

---

![Git log and Vercel deployment — the process from CLI to live](images/ss-terminal.png)

Once you know *why* you're building it, the *how* is surprisingly simple today. I typed a description of what I wanted into a CLI, and it scaffolded a full Next.js project, wired it to my existing markdown content, fixed a mobile overflow bug I hadn't even noticed, and caught a subtle Babel parse error in the process. Then: `git push`, `vercel --prod`, two DNS records updated in GoDaddy, and it was live. The total infrastructure cost is zero — Vercel handles SSL, CDN, and auto-deployment on every push. There are a few tricks worth knowing: use Vercel (not Render) when you have no backend APIs, always delete old A records before adding new ones, and RSS feeds from Medium and Substack are goldmines for keeping your site's metadata in sync with what you've actually published.

---

![Booking page and blog listing — features added incrementally](images/ss-connect.png)

The part that surprised me most was what came *after* the initial build. Because I'd saved all the styling preferences, architecture decisions, and gotchas into a reusable Copilot CLI skill, every incremental change became trivial. Adding a booking page connected to Google Calendar? One conversation, 20 minutes. Updating the nav, tweaking blog card tags to use a consistent color dictionary, bumping the booking CTA to a prime spot above the fold? Each was a single instruction, a build check, a `git push`. The website doesn't feel like a project I *finished* — it feels like a living thing I can keep shaping. That's the real unlock: not just building it fast, but building it in a way where *coming back* is just as easy as starting. If you're thinking about doing the same, I'd love to hear where you're at — [book a 30-min chat](https://sumitc.in/connect), weekends, free.

---

> **Are you still putting off your personal site? What's the one thing holding you back — drop it in the comments.**

*I write about AI, product building, and the things I'm making. Follow so you don't miss the next one.*
