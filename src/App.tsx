/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HandwritingLab } from './components/HandwritingLab';
import { LanguageClassifierLab } from './components/LanguageClassifierLab';
import { StepByStepGuide } from './components/StepByStepGuide';
import { DeploymentGuide } from './components/DeploymentGuide';
import { PresentationDeck } from './components/PresentationDeck';

type ActiveSection = 'ocr-lab' | 'nlp-classifier' | 'ppt-deck' | 'viva-guide' | 'deployment';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('ocr-lab');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('ocr-lab');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
        >
          Devanagari Studio
        </a>

        {/* Zone 2: Primary navigation links */}
        <nav aria-label="Primary Navigation" className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <a
            href="#ocr-lab"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('ocr-lab');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'ocr-lab' ? 'text-indigo-700 underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Character OCR
          </a>
          <a
            href="#nlp-classifier"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('nlp-classifier');
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'nlp-classifier' ? 'text-indigo-700 underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Language Classifier
          </a>
        </nav>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Academic Hero */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
                Devanagari Script & Multi-Language Recognition System
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                An interactive academic laboratory demonstrating how Machine Learning recognizes handwritten Devanagari glyphs (<span className="font-deva font-medium text-slate-900">क, आ, ग, म, ळ, क्ष</span>) via Convolutional Neural Network feature pooling and classifies closely related Devanagari-script languages (<strong>Hindi, Marathi, Sanskrit, Nepali, and Konkani</strong>).
              </p>
            </div>

            {/* Key Project Metrics Summary */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                <div className="text-xs text-slate-500">Script Unicode Block</div>
                <div className="text-sm sm:text-base font-bold font-mono-tabular text-slate-900 mt-0.5">
                  U+0900–097F
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Devanagari Standard</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                <div className="text-xs text-slate-500">Languages Classified</div>
                <div className="text-sm sm:text-base font-bold font-mono-tabular text-indigo-700 mt-0.5">
                  5 Languages
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">HI · MR · SA · NE · KOK</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                <div className="text-xs text-slate-500">CNN Spatial Map</div>
                <div className="text-sm sm:text-base font-bold font-mono-tabular text-slate-900 mt-0.5">
                  8 × 8 Pooling
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Shirorekha + Spine</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                <div className="text-xs text-slate-500">NLP Features</div>
                <div className="text-sm sm:text-base font-bold font-mono-tabular text-emerald-700 mt-0.5">
                  Akshara + N=3
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Character Trigrams</div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Interactive Workspace View */}
        <section aria-live="polite">
          {activeSection === 'ocr-lab' && <HandwritingLab />}
          {activeSection === 'nlp-classifier' && <LanguageClassifierLab />}
          {activeSection === 'ppt-deck' && <PresentationDeck />}
          {activeSection === 'viva-guide' && <StepByStepGuide />}
          {activeSection === 'deployment' && <DeploymentGuide />}
        </section>
      </main>
    </div>
  );
}
