#!/usr/bin/env node
// Seed 50+ real PRs through the PR Quality Analyzer for distribution

const repos = [
  'rails/rails', 'vercel/next.js', 'reactjs/react.dev', 'twbs/bootstrap',
  'tailwindlabs/tailwindcss', 'microsoft/vscode', 'facebook/react',
  'angular/angular', 'vuejs/core', 'nodejs/node',
  'denoland/deno', 'sveltejs/svelte', 'golang/go', 'rust-lang/rust',
  'python/cpython', 'laravel/laravel', 'django/django', 'ansible/ansible',
  'kubernetes/kubernetes', 'helm/helm', 'docker/compose', 'hashicorp/terraform',
  'prometheus/prometheus', 'grafana/grafana', 'elastic/kibana',
  'apache/spark', 'numpy/numpy', 'pandas-dev/pandas', 'scikit-learn/scikit-learn',
  'tensorflow/tensorflow', 'pytorch/pytorch', 'home-assistant/core',
  'mozilla/pdf.js', 'nwjs/nw.js', 'expressjs/express',
  'meteor/meteor', 'rustdesk/rustdesk', 'neovim/neovim',
  'signalapp/Signal-Android', 'redis/redis', 'nginx/nginx',
  'oven-sh/bun', 'sugarjs/sugar', 'preactjs/preact',
  'gatsbyjs/gatsby', 'nuxt/nuxt', 'ionic-team/ionic-framework',
  'supabase/supabase', 'prisma/prisma', 'storybookjs/storybook',
];

const TOKEN = process.env.GH_TOKEN || '';
const BASE = 'https://api.github.com';
const TOOL_URL = 'https://creativecodingsolutions.github.io/pr-quality-analyzer';
const headers = { 'Accept': 'application/vnd.github+json' };
if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

async function fetchPRs(repo, count = 3) {
  try {
    const res = await fetch(`${BASE}/repos/${repo}/pulls?state=open&per_page=${count}&sort=updated&direction=desc`, { headers });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function main() {
  console.log('# PR Quality Analyzer — Seeded PRs\n');
  console.log(`*Generated: ${new Date().toISOString()}*\n`);
  console.log('| # | Repo | PR | Title | Score Link |');
  console.log('|---|------|----|------|------------|');

  let total = 0;
  for (const repo of repos) {
    if (total >= 60) break;
    const prs = await fetchPRs(repo);
    for (const pr of prs) {
      if (total >= 60) break;
      total++;
      const prUrl = pr.html_url;
      const encoded = encodeURIComponent(prUrl);
      const shareUrl = `${TOOL_URL}/?pr=${encoded}`;
      console.log(`| ${total} | ${repo} | [#${pr.number}](${prUrl}) | ${(pr.title || '').replace(/[|]/g, '')} | [Analyze](${shareUrl}) |`);
    }
    // small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n\n**Total: ${total} PRs seeded across ${repos.length} repos**`);
  console.log(`\nShare links ready for distribution.`);
}

main().catch(console.error);
