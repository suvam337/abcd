import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeDevanagariText,
  segmentIntoAksharas,
  transliterateDevanagari,
  computeCanvasStructuralFeatures,
  SAMPLE_SENTENCES,
  PRESET_CHARACTERS,
  DevanagariLanguage,
} from './devanagariEngine';

test('includes at least 2 preset characters for each of the 5 Devanagari languages', () => {
  const languages: DevanagariLanguage[] = ['Hindi', 'Marathi', 'Sanskrit', 'Nepali', 'Konkani'];
  for (const lang of languages) {
    const matching = PRESET_CHARACTERS.filter((p) => p.languageTag === lang);
    assert.ok(
      matching.length >= 2,
      `Expected at least 2 preset characters for ${lang}, found ${matching.length}`
    );
  }
});

test('detects Devanagari Unicode block ratio accurately', () => {
  const hindiReport = analyzeDevanagariText('भारत एक विशाल देश है');
  assert.equal(hindiReport.isDevanagariScript, true);
  assert.ok(hindiReport.devanagariRatio > 90);

  const englishReport = analyzeDevanagariText('Hello world this is Latin script');
  assert.equal(englishReport.isDevanagariScript, false);
  assert.equal(englishReport.devanagariRatio, 0);
});

test('segments Devanagari words into orthographic Akshara syllables', () => {
  const syllables = segmentIntoAksharas('नमस्ते भारत');
  // न, म, स्ते (स+्+त+े), भा, र, त
  assert.deepEqual(syllables, ['न', 'म', 'स्ते', 'भा', 'र', 'त']);
});

test('transliterates Devanagari consonants and matras with schwa handling', () => {
  const translit = transliterateDevanagari('कमल');
  assert.equal(translit, 'kamala');

  const withMatra = transliterateDevanagari('काकी');
  assert.equal(withMatra, 'kākī');
});

test('classifies Hindi, Marathi, Sanskrit, Nepali, and Konkani sample sentences accurately', () => {
  for (const sample of SAMPLE_SENTENCES) {
    const report = analyzeDevanagariText(sample.text);
    assert.equal(
      report.topLanguage,
      sample.language,
      `Expected "${sample.text}" to classify as ${sample.language}, but got ${report.topLanguage}`
    );
    assert.ok(report.confidence > 30);
  }
});

test('computes 8x8 CNN structural feature scores for Shirorekha and vertical bar', () => {
  const grid = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 8 }, (_, c) => {
      if (r === 0 && c >= 1 && c <= 6) return 1; // Top Shirorekha line
      if (c === 4 && r >= 1 && r <= 6) return 1; // Center vertical stem
      return 0;
    })
  );

  const metrics = computeCanvasStructuralFeatures(grid);
  assert.ok(metrics.shirorekhaScore >= 70, 'Shirorekha score should be high');
  assert.ok(metrics.verticalStemScore >= 70, 'Vertical stem score should be high');
  assert.ok(metrics.inkCoveragePercent > 0);
});
