import React, { useState, useMemo } from 'react';
import {
  analyzeDevanagariText,
  SAMPLE_SENTENCES,
  SampleCorpusSentence,
} from '../utils/devanagariEngine';
import { Languages, Sparkles, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

interface DeepNlpResponse {
  primaryLanguage: string;
  confidence: number;
  transliteration: string;
  englishTranslation: string;
  keyLinguisticMarkers: string[];
  morphologicalExplanation: string;
}

export const LanguageClassifierLab: React.FC = () => {
  const [inputText, setInputText] = useState<string>(SAMPLE_SENTENCES[0].text);
  const [isCallingDeepAi, setIsCallingDeepAi] = useState(false);
  const [deepAiExplanation, setDeepAiExplanation] = useState<DeepNlpResponse | null>(null);

  // Instant deterministic analysis on every keystroke or sample selection
  const report = useMemo(() => analyzeDevanagariText(inputText), [inputText]);

  const handleSelectSample = (sample: SampleCorpusSentence) => {
    setInputText(sample.text);
    setDeepAiExplanation(null);
  };

  const runDeepNlpAnalysis = async () => {
    if (!inputText.trim()) return;
    setIsCallingDeepAi(true);
    try {
      const res = await fetch('/api/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.result?.primaryLanguage) {
          setDeepAiExplanation(data.result);
        }
      }
    } catch {
      // Deterministic engine is already active and displayed
    } finally {
      setIsCallingDeepAi(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (5 cols): Corpus Presets & Text Input */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <label
              htmlFor="devanagari-text-input"
              className="block text-base font-semibold text-slate-900"
            >
              1. Enter or Select Devanagari Text
            </label>
            <p className="text-xs text-slate-500 mt-0.5">
              Type or paste any sentence in Devanagari, or click a verified language sample below
            </p>
          </div>

          <textarea
            id="devanagari-text-input"
            rows={4}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setDeepAiExplanation(null);
            }}
            placeholder="यहाँ देवनागरी में कोई वाक्य लिखें..."
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3.5 text-lg font-deva text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-colors"
          />

          {/* Quick Script Metadata Line */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-lg border border-slate-200/80">
            <span>
              Script Block:{' '}
              <strong className={report.isDevanagariScript ? 'text-emerald-700' : 'text-amber-700'}>
                {report.isDevanagariScript ? 'Devanagari (U+0900–U+097F)' : 'Non-Devanagari / Mixed'}
              </strong>
            </span>
            <span className="font-mono-tabular">
              {report.devanagariRatio}% Devanagari · {report.aksharSyllables.length} Aksharas
            </span>
          </div>

          {/* Preset Language Buttons */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-700">
              Load Benchmark Corpus Sentences (5 Languages):
            </div>
            <div className="space-y-2">
              {SAMPLE_SENTENCES.map((sample) => {
                const isSelected = inputText.trim() === sample.text.trim();
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-600 text-slate-900'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 mb-1">
                      <span>{sample.language} Specimen</span>
                      <span className="text-slate-500 font-normal">Click to test</span>
                    </div>
                    <div className="text-sm font-deva font-medium text-slate-900 leading-snug">
                      {sample.text}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols): Classification Result + 4-Step NLP Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary Classification Verdict Card */}
          <div
            data-testid="language-verdict-card"
            className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PREDICTED DEVANAGARI LANGUAGE</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h3
                    data-testid="predicted-language-heading"
                    className="text-2xl font-bold text-slate-900"
                  >
                    {deepAiExplanation?.primaryLanguage || report.topLanguage}
                  </h3>
                  <span className="text-sm font-mono-tabular font-semibold text-indigo-700">
                    {deepAiExplanation
                      ? `${Math.round(
                          deepAiExplanation.confidence <= 1
                            ? deepAiExplanation.confidence * 100
                            : deepAiExplanation.confidence
                        )}% Confidence`
                      : `${report.confidence}% Score`}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-mono-tabular">
                ISO-15919 Transliteration Active
              </div>
            </div>

            {/* Transliteration & Meaning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200/80">
              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Phonetic Roman Transliteration
                </div>
                <div className="text-sm font-mono-tabular text-slate-900 mt-1">
                  {deepAiExplanation?.transliteration || report.transliteration || '—'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  English Meaning / Linguistic Context
                </div>
                <div className="text-sm text-slate-800 mt-1">
                  {deepAiExplanation?.englishTranslation || report.englishMeaningHint}
                </div>
              </div>
            </div>

            {/* Probability Distribution Across All 5 Devanagari Languages */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Language Classifier Probability Distribution
              </h4>
              <div className="space-y-3">
                {report.rankings.map((item, idx) => (
                  <div key={item.language} className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 w-20">{item.language}</span>
                        <span className="text-slate-500">
                          {item.matchedMarkers.join(' · ')}
                        </span>
                      </div>
                      <span className="font-mono-tabular font-semibold text-slate-900">
                        {item.probability}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-200 ${
                          idx === 0 ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                        style={{ width: `${Math.max(4, item.probability)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {deepAiExplanation && (
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-4 space-y-2">
                <div className="text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Deep Morphological Analysis (Gemini NLP)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {deepAiExplanation.morphologicalExplanation}
                </p>
                {deepAiExplanation.keyLinguisticMarkers?.length > 0 && (
                  <div className="text-xs text-indigo-900 pt-1">
                    <strong>Key Markers:</strong> {deepAiExplanation.keyLinguisticMarkers.join(' · ')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step-by-Step NLP Pipeline Breakdown (Syllables, Trigrams, Unicode Tokens) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                2. Step-by-Step NLP Feature Extraction Pipeline
              </h3>
              <p className="text-xs text-slate-500">
                Show your professors how raw Devanagari text is tokenized into Syllables (Aksharas) and Trigrams before classification
              </p>
            </div>

            {/* Step A: Orthographic Akshara Syllables */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  Step A · Akshara (Orthographic Syllable) Segmentation
                </span>
                <span className="text-slate-500 font-mono-tabular">
                  {report.aksharSyllables.length} syllables detected
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Unlike English where letters stand alone, Devanagari binds Consonant + Matra (vowel sign) + Halant into single phonetic blocks called <strong>Aksharas</strong>:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {report.aksharSyllables.map((akshar, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-sm font-deva font-medium text-slate-900"
                  >
                    {akshar}
                  </span>
                ))}
              </div>
            </div>

            {/* Step B: Character Trigrams (N=3) */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  Step B · Character Trigrams (N=3 Sliding Window Features)
                </span>
                <span className="text-slate-500 font-mono-tabular">TF-IDF Vector Input</span>
              </div>
              <p className="text-xs text-slate-600">
                In Machine Learning (Multinomial Naive Bayes / Linear SVM), we slide a 3-character window across the sentence to capture word endings and suffixes:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {report.charNGrams.map((gram, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-deva text-slate-700 font-mono-tabular"
                  >
                    "{gram}"
                  </span>
                ))}
              </div>
            </div>

            {/* Step C: Unicode Codepoint Inspector Table */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  Step C · Unicode Codepoint & Phonetic Token Table (First 12 Chars)
                </span>
                <span className="text-slate-500 font-mono-tabular">Range: U+0900..U+097F</span>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <th className="py-2 px-3 font-semibold">Glyph</th>
                      <th className="py-2 px-3 font-semibold">Unicode Hex</th>
                      <th className="py-2 px-3 font-semibold">Category</th>
                      <th className="py-2 px-3 font-semibold">Translit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.characterTokens
                      .filter((t) => t.char !== ' ')
                      .slice(0, 12)
                      .map((tok, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-1.5 px-3 text-base font-deva font-semibold text-slate-900">
                            {tok.char}
                          </td>
                          <td className="py-1.5 px-3 font-mono-tabular text-indigo-700">
                            {tok.codePoint}
                          </td>
                          <td className="py-1.5 px-3 text-slate-700">{tok.type}</td>
                          <td className="py-1.5 px-3 font-mono-tabular text-slate-600">
                            {tok.transliteration}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
