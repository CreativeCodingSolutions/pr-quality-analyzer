#!/usr/bin/env node
// Batch analyze seeded PRs, generate stats, and optionally comment on high-scoring ones

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
const BASE = 'https://api.github.com';
const TOOL_URL = 'https://creativecodingsolutions.github.io/pr-quality-analyzer';
const headers = { 'Accept': 'application/vnd.github+json' };
if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

// PRs from seeded-prs.md
const prs = [
  { repo: 'rails/rails', number: 57803 }, { repo: 'rails/rails', number: 57802 }, { repo: 'rails/rails', number: 57800 },
  { repo: 'vercel/next.js', number: 95001 }, { repo: 'vercel/next.js', number: 94941 }, { repo: 'vercel/next.js', number: 94997 },
  { repo: 'reactjs/react.dev', number: 8487 }, { repo: 'reactjs/react.dev', number: 8485 }, { repo: 'reactjs/react.dev', number: 8438 },
  { repo: 'twbs/bootstrap', number: 42533 }, { repo: 'twbs/bootstrap', number: 42487 }, { repo: 'twbs/bootstrap', number: 42527 },
  { repo: 'microsoft/vscode', number: 322255 }, { repo: 'microsoft/vscode', number: 322254 }, { repo: 'microsoft/vscode', number: 322249 },
  { repo: 'facebook/react', number: 36829 }, { repo: 'facebook/react', number: 36831 }, { repo: 'facebook/react', number: 36832 },
  { repo: 'angular/angular', number: 68743 }, { repo: 'angular/angular', number: 69348 }, { repo: 'angular/angular', number: 69416 },
  { repo: 'golang/go', number: 78080 }, { repo: 'golang/go', number: 80081 }, { repo: 'golang/go', number: 80002 },
  { repo: 'kubernetes/kubernetes', number: 135486 }, { repo: 'kubernetes/kubernetes', number: 139476 }, { repo: 'kubernetes/kubernetes', number: 139870 },
  { repo: 'rust-lang/rust', number: 158193 }, { repo: 'rust-lang/rust', number: 158189 }, { repo: 'rust-lang/rust', number: 158198 },
  { repo: 'python/cpython', number: 151827 }, { repo: 'python/cpython', number: 151826 }, { repo: 'python/cpython', number: 151825 },
  { repo: 'django/django', number: 21523 }, { repo: 'django/django', number: 21524 }, { repo: 'django/django', number: 21519 },
  { repo: 'helm/helm', number: 17084 }, { repo: 'helm/helm', number: 32038 }, { repo: 'helm/helm', number: 32245 },
];

function analyzePR(data) {
  let score = 100;
  const breakdown = [];

  if (!data.body || data.body.trim().length < 50) {
    score -= 25;
    breakdown.push({ check: 'Description', status: 'FAIL', detail: 'Too short' });
  } else {
    score = Math.min(100, score + 5);
    breakdown.push({ check: 'Description', status: 'PASS', detail: `${data.body.trim().length} chars` });
  }

  if (!data.labels || data.labels.length === 0) {
    score -= 15;
    breakdown.push({ check: 'Labels', status: 'FAIL', detail: 'No labels' });
  } else {
    score += 5;
    breakdown.push({ check: 'Labels', status: 'PASS', detail: `${data.labels.length} labels` });
  }

  const fileCount = data.changed_files || 0;
  if (fileCount > 20) {
    score -= 10;
    breakdown.push({ check: 'Size', status: 'WARN', detail: `${fileCount} files` });
  } else if (fileCount === 0) {
    score -= 10;
    breakdown.push({ check: 'Size', status: 'FAIL', detail: 'No files changed' });
  } else {
    score = Math.min(100, score + 5);
    breakdown.push({ check: 'Size', status: 'PASS', detail: `${fileCount} files` });
  }

  const additions = data.additions || 0;
  const deletions = data.deletions || 0;
  if (additions + deletions > 2000) score -= 10;
  else if (additions + deletions < 10 && fileCount > 0) score -= 5;
  else score += 3;

  if (data.title && data.title.length < 10) {
    score -= 10;
    breakdown.push({ check: 'Title', status: 'FAIL', detail: `Too short (${data.title.length} chars)` });
  } else {
    score += 3;
    breakdown.push({ check: 'Title', status: 'PASS', detail: `${data.title?.length || 0} chars` });
  }

  if (data.draft) {
    score -= 5;
    breakdown.push({ check: 'Status', status: 'WARN', detail: 'Draft PR' });
  }
  if (data.milestone) score += 5;
  if (data.body && data.body.match(/(?:close|fix|resolve|shut|#)\s*\d+/i)) score += 5;

  score = Math.max(0, Math.min(100, Math.round(score)));
  return { score, breakdown };
}

function getGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function getBadgeColor(score) {
  if (score >= 80) return 'brightgreen';
  if (score >= 60) return 'yellow';
  return 'red';
}

async function fetchPR(repo, number) {
  const res = await fetch(`${BASE}/repos/${repo}/pulls/${number}`, { headers });
  if (!res.ok) return null;
  const pr = await res.json();

  let labels = [];
  try {
    const issueRes = await fetch(`${BASE}/repos/${repo}/issues/${number}`, { headers });
    if (issueRes.ok) {
      const issue = await issueRes.json();
      labels = issue.labels || [];
    }
  } catch {}

  return {
    repo, number,
    title: pr.title || '',
    body: pr.body || '',
    state: pr.state,
    draft: pr.draft || false,
    user: pr.user?.login || 'unknown',
    labels,
    milestone: pr.milestone,
    comments: pr.comments || 0,
    changed_files: pr.changed_files || 0,
    additions: pr.additions || 0,
    deletions: pr.deletions || 0,
    created_at: pr.created_at,
    merged: !!pr.merged,
    html_url: pr.html_url,
  };
}

async function postComment(repo, number, body) {
  const res = await fetch(`${BASE}/repos/${repo}/issues/${number}/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  });
  return res.ok;
}

async function main() {
  const shouldComment = process.argv.includes('--comment');
  console.log('PR Quality Analyzer — Batch Report\n');
  console.log(`Scanned ${prs.length} seeded PRs\n`);

  const results = [];

  for (let i = 0; i < prs.length; i++) {
    const { repo, number } = prs[i];
    const data = await fetchPR(repo, number);
    if (!data) {
      console.log(`  [${i + 1}/${prs.length}] ${repo}#${number} — FAILED to fetch`);
      continue;
    }
    const { score, breakdown } = analyzePR(data);
    const grade = getGrade(score);
    results.push({ ...data, score, grade, breakdown });

    const fullName = `${repo}#${number}`;
    console.log(`  [${i + 1}/${prs.length}] ${fullName.padEnd(35)} ${grade} (${score}%) — ${data.title?.slice(0, 50)}`);

    if (shouldComment && score >= 80) {
      const badgeMd = `[![PR Quality: ${grade} (${score}%)](https://img.shields.io/badge/PR%20Quality-${grade}%20(${score}%25)-${getBadgeColor(score)})](${TOOL_URL}/?pr=${encodeURIComponent(data.html_url)})`;
      const comment = [
        `**PR Quality Score: ${grade} (${score}%)** 🎉`,
        '',
        'I ran this PR through the [PR Quality Analyzer](https://creativecodingsolutions.github.io/pr-quality-analyzer/) — a free tool that checks description quality, labels, size, title, and more. Great work!',
        '',
        badgeMd,
        '',
        '> Want to track PR quality in your repo? Add the badge to your README (click the badge above for markdown).',
      ].join('\n');

      const ok = await postComment(repo, number, comment);
      console.log(`         → Comment posted: ${ok ? '✅' : '❌'}`);
    }

    await new Promise(r => setTimeout(r, 200));
  }

  // Summary stats
  const graded = results.filter(r => r.score);
  const avg = graded.reduce((s, r) => s + r.score, 0) / graded.length;
  const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  graded.forEach(r => grades[r.grade]++);

  const report = `
## Aggregate Results

| Grade | Count | Percentage |
|-------|-------|------------|
${Object.entries(grades).map(([g, c]) => `| ${g} | ${c} | ${(c / graded.length * 100).toFixed(0)}% |`).join('\n')}

**Average Score:** ${avg.toFixed(1)}%
**Total PRs Analyzed:** ${graded.length}

### Top Scorers (A grade)
${results.filter(r => r.grade === 'A').map(r => `- [${r.repo}#${r.number}](${r.html_url}) — ${r.score}%`).join('\n') || 'None'}

### Bottom Scorers (F grade)
${results.filter(r => r.grade === 'F').map(r => `- [${r.repo}#${r.number}](${r.html_url}) — ${r.score}%`).join('\n') || 'None'}
`;

  console.log('\n' + report);
}

main().catch(console.error);
