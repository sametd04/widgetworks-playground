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

test('toCsv includes all rows for 999 issues', () => {
  const csv = toCsv(makeIssues(999));
  const lines = csv.split('\n');
  assert.equal(lines.length, 1000); // 1 header + 999 data rows
});

test('toCsv includes all rows for exactly 1000 issues', () => {
  const csv = toCsv(makeIssues(1000));
  const lines = csv.split('\n');
  assert.equal(lines.length, 1001); // 1 header + 1000 data rows
});

test('toCsv includes all rows for 1001 issues', () => {
  const csv = toCsv(makeIssues(1001));
  const lines = csv.split('\n');
  assert.equal(lines.length, 1002); // 1 header + 1001 data rows
});

test('exportProject returns correct row count for 1000 issues', () => {
  const project = { issues: makeIssues(1000) };
  const csv = exportProject(project);
  const lines = csv.split('\n');
  assert.equal(lines.length, 1001); // 1 header + 1000 data rows
});
