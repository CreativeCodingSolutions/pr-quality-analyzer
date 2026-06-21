# PR Quality Analyzer

[![PR Quality: A (100%)](https://img.shields.io/badge/PR%20Quality-A%20(100%25)-brightgreen)](https://creativecodingsolutions.github.io/pr-quality-analyzer/?pr=https%3A%2F%2Fgithub.com%2FCreativeCodingSolutions%2Fpr-quality-analyzer%2Fpull%2F1)

Analyze any public GitHub pull request for quality. Get a score (A-F), detailed metrics, actionable improvements, and a README badge.

**No sign-up. No install. Just paste a URL.**

## Features

- **Quality Score** — A-F grade with percentage based on description quality, PR size, labels, review thoroughness, and engagement
- **Detailed Metrics** — See exactly what's good and what needs improvement
- **README Badge** — Generate a shields.io badge to show PR quality in your README
- **Share Links** — Share any analysis on X/Twitter, LinkedIn, or via permalink
- **Free & Open Source** — Zero cost, zero limits, open source

## Usage

1. Go to https://creativecodingsolutions.github.io/pr-quality-analyzer/
2. Paste a GitHub PR URL (e.g., `https://github.com/owner/repo/pull/123`)
3. Get your score and actionable feedback

## How It Works

The analyzer checks:

- **Description** — Is the PR body at least 50 characters? Does it reference issues?
- **Labels** — Are appropriate labels applied?
- **PR Size** — Is the PR reasonably scoped for review?
- **Title** — Is the title descriptive enough?
- **Status** — Is the PR ready for review or still a draft?
- **Linked Issues** — Does the description reference related issues?

## Badge

Show off your PR quality in your README:

```markdown
[![PR Quality](https://img.shields.io/badge/PR%20Quality-A%20(100%25)-brightgreen)](https://creativecodingsolutions.github.io/pr-quality-analyzer/?pr=YOUR_PR_URL)
```

## Development

This is a vanilla HTML/CSS/JS app. No build step needed.

```bash
# Serve locally
npx serve .
```

## License

MIT
