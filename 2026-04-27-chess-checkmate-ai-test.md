# I Tested ChatGPT, Claude, and Gemini on Chess — Here's What Happened

This weekend, my daughter and I were playing chess. She's just started learning the game, and I thought it would be fun to dabble with her. One of our games ended in this position:

[IMAGE: The physical chess board photo]

To me, it was a clear checkmate. But my daughter asked me to confirm on ChatGPT before we called it—and that's when some interesting observations followed.

AI models today are remarkably good at understanding code, writing emails, and explaining complex concepts. But what happened when I tested ChatGPT, Claude, and Gemini on this chess position revealed something worth exploring.

Here's what I found.

---

## The Setup: A Chess Position We Thought Was Checkmate

My kid and I were playing chess. After several moves, we reached a position where we were certain: *This is checkmate for White.*

Being learners ourselves, we decided to verify with the leading AI models. We uploaded the image to ChatGPT, Claude, and Gemini. The question was simple: **"Is this checkmate for White?"**

What we got back was surprisingly revealing.

---

## The Failures: What Each Model Said

### ChatGPT's Response

ChatGPT gave a confident answer: **"It does not look like a true checkmate."**

The model claimed:
- White still appears to have escape squares (at least one square around the king is not fully controlled)
- There may also be a blocking or capturing option available from nearby white pieces

But here's the problem: **ChatGPT was reading the board incorrectly.** When we analyzed its response, we realized it had misidentified where pieces were positioned. When you don't read the board right, your chess analysis is built on fiction.

### Gemini's Response

Gemini was similarly confident: **"Not a Checkmate, White's Turn."**

The model stated:
- "The White King is positioned at the top of the board"
- "There are no Black pieces currently attacking the square it occupies"

Again, **Gemini was misreading piece positions from the physical board.** It was analyzing a game state that didn't exist in the image we uploaded.

### Claude's Response

Claude was the most transparent of the three:

Claude admitted: **"I cannot confidently confirm this is checkmate from this image alone."**

Why? Because Claude actually *noticed* the core problem. It listed out the specific obstacles:
- "Several pieces are hard to distinguish due to the photo angle"
- "I can't definitively confirm all escape squares are covered"
- "The black king's exact square is unclear"

Claude was honest about its limitation. ChatGPT and Gemini gave confident answers based on incorrect piece identification.

---

## What This Actually Means

This isn't a criticism. It's a genuine observation about where the seams still show.

**AI models are phenomenal at parsing structured data:** code, text, JSON, documents. They reason beautifully about abstract concepts and patterns in language. But real-world vision—interpreting a physical photograph, mapping 2D images to spatial coordinates, handling angle, lighting, perspective—is a different kind of problem.

A human child looking at that chess board instantly recognizes where every piece is. An AI model, despite billions of parameters trained on vast amounts of image data, still finds this surprisingly difficult.

This matters because we're increasingly using AI for real-world interpretation:
- Scanning documents (are all required fields filled?)
- Reading charts and dashboards (what does this data trend show?)
- Verifying physical processes (did the assembly line produce this correctly?)
- Spatial reasoning (will this furniture fit in that space?)

**In each case, we're asking AI to do something it hasn't yet fully mastered.** And there's a useful distinction: Claude was transparent about uncertainty ("I can't definitively confirm"), while ChatGPT and Gemini gave confident answers based on misread positions. When the input interpretation is wrong, even brilliant reasoning can't save you.

The insight isn't "don't trust AI." It's: **know what you're asking it to do, and verify when the task involves spatial interpretation from photos.**

---

## The Question I'm Left With

This chess board test surfaced something worth discussing: **when visual interpretation matters, how do you verify that an AI got it right?**

AI is incredible at many tasks, but spatial reasoning from physical photos clearly isn't one of them yet—at least not reliably. It's a useful reminder to understand the limits of the tool you're using before you rely on it.

Have you run into this yourself? A situation where an AI was confident but turned out to be interpreting the input differently than you expected?

---

## Publishing Notes

**Recommended Tags (4-5):**
- AI
- Machine Learning  
- Technology
- ChatGPT
- Artificial Intelligence

**Distribution Channels:**
- **Reddit:** r/MachineLearning, r/ChatGPT, r/chess, r/learnmachinelearning
- **LinkedIn:** Post with image + link, tag AI/ML communities
- **Twitter/X:** Thread format — each model's failure as separate tweets
- **Dev communities:** Hacker News, Dev.to, relevant Slack/Discord communities

**Key Quote for Social:**
*"Tested ChatGPT, Claude, and Gemini on a chess position. None read the board correctly. It's a useful reminder that spatial reasoning from photos is where current AI still has real limits—even when the models are phenomenal everywhere else."*

**Images to embed:**
1. The physical chess board photo (opener/context)
2. ChatGPT response screenshot (failure #1)
3. Gemini response screenshot (failure #2)
4. Claude response screenshot (failure #3)
