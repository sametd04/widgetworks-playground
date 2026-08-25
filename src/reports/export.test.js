import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCsv, exportProject } from './export.js';

function makeIssues(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    title: `Issue ${i + 1}`,
    created: new Date('2024-01-01'),
  }));
}

function countDataRows(csv) {
  const lines = csv.split('\n');
  // first line is header
  return lines.length - 1;
}

test('toCsv includes all rows for 999 issues', () => {
  const rows = makeIssues(999);
  const csv = toCsv(rows);
  assert.equal(countDataRows(csv), 999);
});

test('toCsv includes all rows for exactly 1000 issues', () => {
  const rows = makeIssues(1000);
  const csv = toCsv(rows);
  assert.equal(countDataRows(csv), 1000);
});

test('toCsv includes all rows for 1001 issues', () => {
  const rows = makeIssues(1001);
  const csv = toCsv(rows);
  assert.equal(countDataRows(csv), 1001);
});

test('exportProject includes all issues', () => {
  const project = { issues: makeIssues(1000) };
  const csv = exportProject(project);
  assert.equal(countDataRows(csv), 1000);
});

test('toCsv has correct header', () => {
  const csv = toCsv(makeIssues(1));
  assert.ok(csv.startsWith('id,title,created\n'));
});
