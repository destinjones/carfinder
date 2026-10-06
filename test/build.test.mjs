// The committed carfinder.html must match what src/ and data/ build to, and the page must be a complete document.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('carfinder.html is the build of the current sources (run `node src/build.js` after editing src/ or data/)', () => {
  const r = spawnSync(process.execPath, ['src/build.js', '--check'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr || r.stdout);
});

test('the built page is a complete, self-contained document', () => {
  const html = fs.readFileSync(path.join(ROOT, 'carfinder.html'), 'utf8');
  assert.ok(html.startsWith('<!doctype html>'));
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<link rel="stylesheet" href="brand\/fonts\/fonts\.css">/);
  assert.ok(!/fonts\.googleapis\.com/.test(html), 'the website build makes no request to Google Fonts');
  assert.ok(!/__CARS_|__STATES_/.test(html), 'every data placeholder was filled');
  for (const f of html.match(/href="brand\/[^"]+"/g).map(m => m.slice(6, -1))) assert.ok(fs.existsSync(path.join(ROOT, f)), `${f} exists`);
});

test('every page links to files that exist', () => {
  for (const page of ['index.html', 'about.html']) {
    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const refs = [...html.matchAll(/(?:href|src|srcset|poster)="([^"#?]+)/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:|data:)/.test(u));
    for (const u of refs) for (const part of u.split(',')) { const f = part.trim().split(' ')[0]; if (f) assert.ok(fs.existsSync(path.join(ROOT, f)), `${page} -> ${f}`); }
  }
});
