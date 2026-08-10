#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function flatten(value, prefix = '', result = {}) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, result);
    }
  } else {
    result[prefix] = value;
  }
  return result;
}

const en = flatten(readJson('messages/en.json'));
const hi = flatten(readJson('messages/hi.json'));

const missingHi = Object.keys(en).filter((key) => !(key in hi)).sort();
const missingEn = Object.keys(hi).filter((key) => !(key in en)).sort();

const requiredDemos = [
  'demo-erp-full.html',
  'demo-erp.html',
  'demo-fms.html',
  'demo-ims.html',
  'demo-pms.html',
  'demo-analytics.html',
  'demo-performance.html',
  'demo-certificates.html'
];

const missingDemos = requiredDemos.filter(
  (name) => !fs.existsSync(path.join(root, 'public', 'demos', name))
);

console.log(`English translation leaves: ${Object.keys(en).length}`);
console.log(`Hindi translation leaves:   ${Object.keys(hi).length}`);

if (missingHi.length) {
  console.log('\nMissing in Hindi:');
  missingHi.forEach((key) => console.log(`  - ${key}`));
}

if (missingEn.length) {
  console.log('\nMissing in English:');
  missingEn.forEach((key) => console.log(`  - ${key}`));
}

if (missingDemos.length) {
  console.log('\nMissing demo files:');
  missingDemos.forEach((name) => console.log(`  - public/demos/${name}`));
}

if (!missingHi.length && !missingEn.length && !missingDemos.length) {
  console.log('\n✅ Translation structure and required demo files look consistent.');
  process.exit(0);
}

process.exit(1);
