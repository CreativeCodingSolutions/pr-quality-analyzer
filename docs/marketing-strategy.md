# PR Quality Analyzer — Marketing Strategy

## 1. Smallest Viable Audience

**Not** "all GitHub users." Specifically:

- **Solo maintainers of popular OSS repos** (100+ stars) — drowning in low-quality PRs, desperate for triage filters
- **Team leads at startups** (2-20 devs) — reviewing PRs is their bottleneck, they need objective metrics to enforce standards without being the bad guy
- **Open source contributors** submitting their first PR to a new project — anxious about rejection, want a pre-flight check before hitting submit

These three groups share the same pain: **PR anxiety**. The first wants fewer bad PRs, the second wants to justify rejections objectively, the third wants confidence their PR won't be rejected.

1000 true fans from these groups is the goal — not 1M pageviews.

## 2. Purple Cow Factor

What makes this remarkable enough to share unprompted:

- **The F-grade is the feature.** A developer pastes their colleague's PR URL and gets back a D-minus. The screenshot is inherently funny/salty. "My PR got an F" is a tweet people *want* to share.
- **Game-like scoring.** Gamification works. Developers competing for A+ grades on PRs turns code review into a leaderboard. The score is a bragging right (or a call to improve).
- **Zero friction.** No sign-up, no install, no config. Paste URL, get score, share link. This is remarkable in a world where every tool requires an account.
- **Objective arbiter.** In team disputes ("is this a good PR?"), the tool is an impartial third party. That's a social utility worth sharing.

## 3. Built-in Distribution (Viral Hooks)

The product *is* the marketing. Every usage must create an invitation to the next user:

- **Share card:** Every result page generates an OG image with the score letter (A-F) in large type, the repo name, and "Score your PRs at pr-analyzer.example.com". When shared to Twitter/LinkedIn/Slack, the preview card does the marketing.
- **Badge for README:** Generate a markdown badge: `[![PR Quality](https://pr-analyzer.example.com/badge/owner/repo/PR#)]`. Maintainers who care about quality will add this to their README — permanent backlink and organic discovery.
- **Comment bot prompt:** "Want to enforce quality standards on every PR? Add our GitHub Action." (Future upsell, but planted now.)
- **Slack/Microsoft Teams unfurl:** When someone pastes a PR URL in a channel, the tool could auto-suggest scoring it. But since it's client-side, the shareable URL approach is the primary hook.
- **Score comparison page:** "Your PR (D) ranks in the bottom 30% of all PRs. Better than 12% of repos." — competitive framing drives resharing.

## 4. SEO Strategy

Since GitHub Pages is the only available distribution channel, SEO is life support:

- **Landing page:** `/` — the tool itself (paste URL, get score). Keep it simple.
- **Programmatic pages:** `/repos/{owner}/{repo}/` — auto-generated summary of PR quality stats for that repo. If someone searches "react PR quality" or "vercel PR review standards", this page could rank. Each page is a thin content wrapper that fetches/caches aggregate data.
- **Blog posts:** `/blog/` on GitHub Pages with Jekyll:
  - "What Makes a Good PR? A Data-Driven Guide" (high-value SEO keyword)
  - "The Anatomy of a Code Review: How to Review Faster and Better"
  - "How We Score PRs: Methodology and Metrics" (transparency play, backlink bait)
  - "Top 10 Signs Your PR Needs More Work" (listicle, shareable)
- **Technical SEO:** Fast load times, semantic HTML, structured data (HowTo markup for "how to review a PR"), proper canonical URLs, sitemap.xml
- **Backlink strategy:** No outreach (it failed before). Instead, make pages that naturally attract links: a "PR Quality Glossary", a "PR Checklist Generator", embeddable widgets. Make things people *want* to link to.

## 5. Launch Sequence (This Week)

**Step 1 — Seed 50 real PRs manually**
Run 50 well-known open source PRs through the tool. Tweet each result with the score screenshot. Tag the repo maintainer. The goal: 2-3 viral tweets where a maintainer retweets their project getting an A (or an F).
*Metric:* 3 tweets with > 100 engagements.

**Step 2 — Personal outreach to 20 maintainers**
Not cold email (44/44 failed before). Instead: submit a real PR to their repo that fixes a small issue, then comment "btw I ran our PR through this tool and got an A — thought you might find it useful for your other contributors." The tool is a byproduct of genuine contribution, not a sales pitch.
*Metric:* 5 maintainers try the tool, 2 share it.

**Step 3 — Release the Badge generator**
The README badge is the only scalable distribution channel available. Build it, then add it to your own repo READMEs. Submit PRs to popular awesome-* lists adding repos that use the badge (position as quality signal).
*Metric:* 10 repos using the badge within 2 weeks.

## 6. Content Strategy

All content lives on GitHub Pages (no external platform dependency):

| Format | Topic | Distribution |
|--------|-------|-------------|
| Blog post | "Why Your PRs Are Getting Rejected (And How to Fix It)" | Hacker News (try again with different timing), Reddit self-post (not blocked if text-only) |
| Blog post | "We Analyzed 10,000 PRs — Here's What the Best Ones Have in Common" | Data-driven, backlink bait for dev blogs |
| Twitter thread | "I ran 50 open source PRs through a quality analyzer. Here are the scores." | Tag every repo, hope for retweets |
| Tool feature | "Compare your PR quality against the average" | Built-in, generates social sharing |
| Blog post | "How to Run a PR Review in 5 Minutes" | SEO target, evergreen |
| Interactive | "PR Review Checklist" (checklist widget embedded on the site) | Linkable asset, people will bookmark |

**Key constraint:** No platform dependency. GitHub Pages + Twitter (owned distribution) + word-of-mouth in GitHub Issues. Every piece of content must earn its own distribution or it didn't happen.

## Success Metrics (First 30 Days)

- 100 unique PRs analyzed (usage)
- 10 repos with the README badge (distribution)
- 5 blog posts indexed by Google (SEO foundation)
- 3 organic shares by notable developers (tribe ignition)
- 0 dollars spent (must be zero-cost)

## If This Fails

The pattern from DocuCraft is clear: if distribution is blocked on all external channels, and the product doesn't spread internally (badge/OG/share), then the distribution model is broken, not the execution. Pivot to a paid tool with a budget for ads, or kill the product.

---

*"Don't find customers for your product. Find a product for your customers."*
