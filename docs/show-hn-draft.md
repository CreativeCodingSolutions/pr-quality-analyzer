# Show HN: PR Quality Analyzer — Score any GitHub Pull Request (A-F)

**Draft for Hacker News submission**

## Title Options:

**Option A (recommended):**
Show HN: PR Quality Analyzer – Score any GitHub PR in seconds, free, no sign-up

**Option B:**
Show HN: I built a free tool that grades GitHub pull requests (A-F)

**Option C:**
Show HN: PR Quality Analyzer — paste a GitHub PR URL, get a quality score

## URL:
https://creativecodingsolutions.github.io/pr-quality-analyzer/

## First comment (if needed):

I built this because as a maintainer, I got tired of reviewing PRs with no description, no labels, and no linked issues. The tool checks:

- Description quality (length and content)
- Labels applied
- PR size (too large = hard to review)
- Title clarity
- Draft vs ready status
- Issue references

It generates a shields.io badge you can embed in your README.

I analyzed 39 open PRs from Rails, Next.js, VS Code, React, Angular, Go, Kubernetes, and other top projects. Average score was 95% — the elite projects set a high bar.

Would love feedback on the scoring algorithm and what other metrics I should add.
