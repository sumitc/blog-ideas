# How I Taught an AI Agent to Do My Expense Reports — And Reclaimed My Sunday Evenings

The flight lands, the bag finally comes off the carousel, and somewhere in your jacket pocket is a crumpled wad of coffee receipts, an airport snack bill, and three Uber emails you swore you'd sort out "later."

For most of us, the expense report is the sad, tedious epilogue to every work trip — the chore that waits until the reminder email turns red, then eats a Sunday evening of squinting at line items and re-uploading PDFs to the wrong slot twice.

A few weeks ago, after returning from a busy trip to Redmond, I decided I’d had enough. Instead of spending an hour on manual data entry, I built a custom CLI skill (`expense-receipt-attach`) that turns the entire process over to an AI agent. You can [download the complete sanitized skill package and scripts here](https://sumitc.in/download/expense-skill).

Here is how it works, how I built it, and what it taught me about the real value of agentic automation.

---

## The Real Problem: It’s Not Just Time, It’s Headspace

The worst part of expense filing isn't the 60 minutes it takes to manually match receipts. It's the **cognitive tax** that lingers after you get home.

You have a guilt-pile of receipts sitting on your desk. You tell yourself *"I'll do it tomorrow,"* which turns into next week, until the expense team sends a gentle nudge. That tiny administrative chore sits quietly at the back of your mind when you ought to be resting or catching up on real work.

I wanted a system where I could simply open my draft expense report, hand it off to an agent, and walk away.

---

## How the Skill Works Behind the Scenes

Instead of relying on fragile third-party integrations or heavy API wrappers, I built a skill that drives **Microsoft Dynamics 365 Finance & Operations (F&O)** directly through an existing, authenticated browser session via the **Chrome DevTools Protocol (CDP)** on Edge.

Here’s the step-by-step pipeline the agent executes:

1. **Connects to the Open Session**: It attaches to Edge running on debugging port `9222`, reusing my existing SSO authentication so it never touches credentials.
2. **Enumerates the Expense Lines**: It reads every line item in the draft report—capturing amounts, dates, and current receipt status.
3. **Hunts for Receipts**:
   - **From Email**: It searches my Outlook web tab for emailed receipts (Uber, airline invoices, hotel folios).
   - **From Local PDFs**: It parses local receipt PDFs (using PyMuPDF) to extract dates and total amounts.
4. **Matches by Exact Amount + Date**: It pairs each unattached line item with the corresponding receipt based on an exact match guard.
5. **Fills Required Fields & Attaches**: If a line is missing the required *"Business Purpose"* field (which disables the Attach button in Dynamics), the agent fills it using native CDP keystrokes, uploads the receipt, and handles async grid loading.
6. **Verifies Everything Turns Green**: It re-scans the grid to confirm every line displays `ReceiptsAttached = Yes` with a green checkmark.

What used to be an hour of tab-juggling is now a two-minute glance: every line green, nothing missing, ready to submit.

---

## 3 Lessons for Anyone Building AI Agent Workflows

Building this skill taught me a few broader principles about practical AI automation:

### 1. Automate the Micro-Frictions You Feel Every Month
Don't wait for enterprise software vendors to build the perfect workflow. If you perform a repetitive browser-based task more than twice a month, it's a prime candidate for a custom CLI skill.

### 2. Browser CDP Control is Surprisingly Robust
Interacting with complex web UIs (like virtualized React data grids) can be tricky. Using real CDP keystrokes (`Input.insertText`) and waiting on UI state blocking overlays (`ShellBlockingDiv`) proved much more reliable than synthetic JavaScript events or fragile web scraping.

### 3. The True ROI of Automation is Saved Headspace
The best part isn't the hour saved on Sunday night — it's the elimination of post-trip mental clutter. You get home, run the command, review the report in 60 seconds, and hit **Submit**. The trip is officially over.

---

## What Work Chore Should AI Take Off Your Plate Next?

If you could build a custom AI agent to eliminate one repetitive administrative task in your workday, what would it be? Drop your ideas in the comments below!

*I write about AI, product building, CLI tools, and automation hacks — follow me so you don't miss the next build.*

---

*Tags: Artificial Intelligence, Productivity, Automation, Dev Tools, Future of Work*
