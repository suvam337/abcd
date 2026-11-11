import React, { useState } from 'react';
import {
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Layers,
  Cpu,
  MessageSquare,
} from 'lucide-react';

interface LearningModule {
  id: number;
  chapterTitle: string;
  subtitle: string;
  simpleAnalogy: string;
  whatHappensTechnically: string[];
  whatToSayToProfessor: string;
  visualDiagramType: 'script-vs-language' | 'cnn-ocr' | 'ngram-nlp' | 'system-architecture';
  vivaQuestions: Array<{
    question: string;
    answer: string;
  }>;
}

const LEARNING_MODULES: LearningModule[] = [
  {
    id: 1,
    chapterTitle: 'Chapter 1: What is Devanagari & Why is Recognition Challenging?',
    subtitle: 'Understanding the difference between a Script (Writing System) and a Language',
    simpleAnalogy:
      'Think of the Roman alphabet (A, B, C). English, French, Spanish, and German all use the same Roman letters, yet they are different languages. Similarly, Devanagari (देवनागरी) is a script used by over 600 million people to write Hindi, Marathi, Sanskrit, Nepali, Konkani, Bhojpuri, and Maithili!',
    whatHappensTechnically: [
      'Devanagari is an Abugida (Alphasyllabary) script: every consonant (like क = ka) carries an inherent "a" vowel sound unless modified.',
      'Shirorekha (शिरोरेखा): Words are joined at the top by a continuous horizontal line. In OCR, characters inside a word touch each other through this top bar.',
      'Three Vertical Zones: A single syllable can have a top modifier (Matra like े / ै), a middle base consonant (क / म), and a bottom modifier (like ु / ू / ृ).',
      'Conjunct Characters (Samyuktakshar): Two consonants can fuse into a brand-new shape (e.g., क् + ष = क्ष), increasing the total recognition classes beyond the basic 47 letters.',
    ],
    whatToSayToProfessor:
      '"Sir/Ma\'am, our project solves a two-stage problem: First, Optical Character Recognition (OCR) to identify handwritten or printed Devanagari glyphs despite complex Shirorekha header bars and compound letters. Second, Natural Language Processing (NLP) to classify which specific language—Hindi, Marathi, Sanskrit, Nepali, or Konkani—the Devanagari text belongs to."',
    visualDiagramType: 'script-vs-language',
    vivaQuestions: [
      {
        question: 'Q1: Is Devanagari a language or a script?',
        answer:
          'Devanagari is an Abugida script (writing system), not a single language. It is written from left to right and sits in the Unicode block U+0900 to U+097F.',
      },
      {
        question: 'Q2: How many basic characters are in the standard Devanagari dataset (DHCD)?',
        answer:
          'The standard Devanagari Handwritten Character Dataset (DHCD) has 46 primary classes: 36 consonants (Vyanjan) and 10 numerals (0–9), plus 11–12 independent vowels (Swar) in full OCR systems.',
      },
    ],
  },
  {
    id: 2,
    chapterTitle: 'Chapter 2: How the Computer Recognizes Handwritten Characters (CNN)',
    subtitle: 'Step-by-step beginner guide to Convolutional Neural Networks (OCR)',
    simpleAnalogy:
      'Imagine looking at a road sign through a grid window. First you notice straight horizontal and vertical lines; next you notice loops and curves; finally your brain combines them and says "That is the letter क (ka)!". A Convolutional Neural Network (CNN) does this exact process using simple multiplication.',
    whatHappensTechnically: [
      'Step 1 — Grayscale & Binarization: The 260×260 drawing is converted into a 2D array of numbers where 0 = white background and 1 = dark ink stroke.',
      'Step 2 — Convolutional Filters (Conv2D): Small 3×3 number grids slide over the image to detect horizontal edges (Shirorekha top bar), vertical stems (Khadi Pai), and closed loops.',
      'Step 3 — Max-Pooling (Downsampling): We shrink the image grid (e.g., into an 8×8 or 32×32 feature map) so that whether someone writes large or small, the key features stay in the same relative spots.',
      'Step 4 — Dense Layer & Softmax: The extracted features pass into a classifier formula called Softmax, which outputs a probability percentage (0% to 100%) for each Devanagari character.',
    ],
    whatToSayToProfessor:
      '"In our character recognition module, we preprocess the canvas image by binarizing pixel intensities, extract structural landmarks like the Shirorekha top bar and vertical Khadi Pai spine, pool spatial activations into an 8×8 feature matrix, and compute Softmax probabilities."',
    visualDiagramType: 'cnn-ocr',
    vivaQuestions: [
      {
        question: 'Q1: Why do we use CNN instead of a normal Artificial Neural Network (ANN) for image recognition?',
        answer:
          'A normal ANN flattens the 2D image into a 1D line immediately, losing spatial neighborhood information (which pixels form loops or horizontal bars). CNNs use 2D filters that preserve spatial structure and require far fewer parameters.',
      },
      {
        question: 'Q2: What is the role of the Softmax activation function at the output layer?',
        answer:
          'Softmax takes raw numerical scores (logits) from the final neural layer and converts them into a probability distribution where every class is between 0 and 1, and all probabilities sum to 100%.',
      },
    ],
  },
  {
    id: 3,
    chapterTitle: 'Chapter 3: How the AI Classifies Languages Sharing the Same Script (NLP)',
    subtitle: 'How we distinguish Hindi, Marathi, Sanskrit, Nepali, and Konkani',
    simpleAnalogy:
      'If someone writes "Je suis étudiant" and "I am a student", both use English/Roman letters, but you immediately spot French because of words like "suis" and accents like "é". Our NLP engine does the exact same thing for Devanagari languages!',
    whatHappensTechnically: [
      'Step 1 — Unicode Range Verification: We check if character codepoints fall inside U+0900–U+097F to confirm the script is Devanagari.',
      'Step 2 — Akshara Syllable Tokenization: We group Consonant + Virama (्) + Matra (ा, ि, ी) into orthographic syllables called Aksharas.',
      'Step 3 — Character N-Grams (Trigrams): We slice words into 3-letter sliding windows (e.g., "ष्ट्रा", "ाची", "आहे"). This captures language-specific suffixes even on unseen words.',
      'Step 4 — Lexical & Morphological Scoring: We weight signature characters (like Marathi/Konkani ळ or Sanskrit Visarga ः / terminal Halant म्) and high-frequency copula verbs (Hindi है, Marathi आहे, Sanskrit अस्ति, Nepali छ, Konkani आसा).',
    ],
    whatToSayToProfessor:
      '"Because multiple Indo-Aryan languages share the Devanagari script, simple Unicode script detection is not enough. Our project combines Character Trigram (N=3) extraction, orthographic character markers (such as retroflex ळ and Visarga ः), and morphological suffix matching to classify Hindi, Marathi, Sanskrit, Nepali, and Konkani."',
    visualDiagramType: 'ngram-nlp',
    vivaQuestions: [
      {
        question: 'Q1: What is an N-gram in Natural Language Processing?',
        answer:
          'An N-gram is a contiguous sequence of N items (characters or words) from a given text sample. A character trigram (N=3) slides a 3-letter window across words, capturing prefixes, roots, and grammatical suffixes.',
      },
      {
        question: 'Q2: Give one unique character or suffix difference between Hindi and Marathi in Devanagari.',
        answer:
          'Marathi and Konkani frequently use the retroflex lateral consonant "ळ" (U+0933, as in बाळ / मराठी), which is absent in standard modern Hindi. Grammatically, Hindi uses "है" (hai) for "is", whereas Marathi uses "आहे" (āhe).',
      },
    ],
  },
  {
    id: 4,
    chapterTitle: 'Chapter 4: Complete System Architecture & Viva Cheat Sheet',
    subtitle: 'How the Frontend, Backend Server, and AI Models connect together',
    simpleAnalogy:
      'Think of our application as a modern laboratory: The React Frontend is the microscope and notebook where the user draws or types; the Node.js + Express Backend is the lab technician that securely processes requests and talks to the neural model.',
    whatHappensTechnically: [
      'Frontend Layer (React 19 + TypeScript + Tailwind CSS): Provides the HTML5 Canvas for handwriting capture, real-time 8×8 pixel pooling, and interactive Akshara/N-gram visualizers.',
      'Deterministic Local Engine (devanagariEngine.ts): Runs instant Unicode tokenization, Akshara segmentation, and N-gram classification in milliseconds—ensuring 100% reliability even offline.',
      'Backend API Layer (Express + server.ts): Exposes POST /api/recognize-image and POST /api/analyze-text endpoints so API keys never leak to the browser.',
      'Hybrid Multimodal AI (Gemini Vision + Local CNN/N-gram): Combines deterministic feature engineering with deep neural multimodal inference.',
    ],
    whatToSayToProfessor:
      '"We built a full-stack hybrid architecture using React and TypeScript on the client and Node.js with Express on the server. It combines a fast deterministic feature extraction engine (8×8 spatial pooling and character N-gram scoring) with server-side multimodal neural inference."',
    visualDiagramType: 'system-architecture',
    vivaQuestions: [
      {
        question: 'Q1: Why did you use a full-stack architecture with a Node.js backend instead of only frontend HTML/JS?',
        answer:
          'A backend server (server.ts) keeps environment variables and AI API credentials secure on the server side, handles image payload parsing, and serves the compiled production bundle cleanly on cloud hosts like Render.',
      },
      {
        question: 'Q2: What are the real-world applications of Devanagari Script & Language Recognition?',
        answer:
          '1) Digitizing ancient Sanskrit and Marathi palm-leaf manuscripts, 2) Automated sorting of regional postal mail and bank cheques in India/Nepal, 3) Routing multilingual customer support tickets written in Devanagari to the right regional language team.',
      },
    ],
  },
];

export const StepByStepGuide: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const currentModule = LEARNING_MODULES[activeChapterIndex];

  return (
    <div className="space-y-8">
      {/* Top Educational Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-indigo-700 tracking-wide">
            STEP-BY-STEP PROFESSOR VIVA & ML CONCEPT GUIDE (NO PRIOR AI KNOWLEDGE NEEDED)
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Learn & Explain Your Project in 4 Digestible Chapters
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl">
            Do not worry if you have never studied Machine Learning or AI before. Read one chapter at a time using the stepper below. Every chapter gives you a <strong>Real-Life Analogy</strong>, <strong>How It Works Step-by-Step</strong>, and the <strong>Exact Words to Say to Your Professor</strong>.
          </p>
        </div>

        {/* Chapter Progress Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeChapterIndex === 0}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-xs font-mono-tabular font-semibold text-slate-800 px-2">
            Chapter {activeChapterIndex + 1} of {LEARNING_MODULES.length}
          </span>
          <button
            type="button"
            onClick={() =>
              setActiveChapterIndex((prev) => Math.min(LEARNING_MODULES.length - 1, prev + 1))
            }
            disabled={activeChapterIndex === LEARNING_MODULES.length - 1}
            className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-medium disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            Next Chapter
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chapter Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LEARNING_MODULES.map((mod, idx) => {
          const isCurrent = idx === activeChapterIndex;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => setActiveChapterIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-50/90 border-indigo-600 text-slate-900'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-tabular text-indigo-700 font-semibold mb-1">
                <span>CHAPTER 0{mod.id}</span>
                {idx < activeChapterIndex && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <div className="text-sm font-semibold text-slate-900 line-clamp-2">
                {mod.chapterTitle.replace(/^Chapter \d:\s*/, '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Chapter Content Card */}
      <div
        data-testid="active-chapter-card"
        className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 space-y-8"
      >
        <div className="border-b border-slate-100 pb-5 space-y-1">
          <div className="text-xs font-mono-tabular font-semibold text-indigo-700 uppercase">
            Step {currentModule.id} of 4 · Guided ML Breakdown
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{currentModule.chapterTitle}</h3>
          <p className="text-sm text-slate-600">{currentModule.subtitle}</p>
        </div>

        {/* Grid: Analogy + What to say to Professor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-indigo-700" />
              <span>1. Simple Real-World Analogy (For You to Understand)</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{currentModule.simpleAnalogy}</p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>2. Exact Script to Say to Your Professor</span>
            </div>
            <p className="text-sm text-slate-900 font-medium leading-relaxed italic">
              {currentModule.whatToSayToProfessor}
            </p>
          </div>
        </div>

        {/* Visual Architecture Diagram + Technical Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-700" />
              <span>3. Step-by-Step Technical Breakdown</span>
            </h4>
            <div className="space-y-2.5">
              {currentModule.whatHappensTechnically.map((point, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 leading-relaxed flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-mono-tabular font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Conceptual Diagram per Chapter */}
          <div className="lg:col-span-6 bg-slate-900 text-slate-100 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono-tabular border-b border-slate-800 pb-3">
              <span>VISUAL CONCEPT DIAGRAM</span>
              <span>MODULE 0{currentModule.id}</span>
            </div>

            {currentModule.visualDiagramType === 'script-vs-language' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-800 rounded-lg text-center border border-slate-700">
                  <div className="text-amber-400 font-semibold mb-1">
                    DEVANAGARI SCRIPT (देवनागरी लिपि · Unicode U+0900–U+097F)
                  </div>
                  <div className="text-slate-300">
                    Shared Shirorekha Header Line + 36 Consonants + 11 Vowels
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    { lang: 'Hindi', word: 'है / और' },
                    { lang: 'Marathi', word: 'आहे / ळ' },
                    { lang: 'Sanskrit', word: 'अस्ति / म्' },
                    { lang: 'Nepali', word: 'छ / को' },
                    { lang: 'Konkani', word: 'आसा / आनी' },
                  ].map((item) => (
                    <div
                      key={item.lang}
                      className="p-2.5 bg-slate-800/90 border border-slate-700 rounded-lg"
                    >
                      <div className="font-semibold text-white">{item.lang}</div>
                      <div className="text-amber-300 font-deva text-sm mt-1">{item.word}</div>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Diagram summary: One script branches into multiple languages. OCR identifies the characters; NLP identifies the language branch.
                </p>
              </div>
            )}

            {currentModule.visualDiagramType === 'cnn-ocr' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-indigo-400 font-mono-tabular font-semibold">STEP 1</div>
                    <div className="text-2xl font-deva my-1">क</div>
                    <div className="text-[11px] text-slate-300">260×260 Canvas</div>
                  </div>
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-indigo-400 font-mono-tabular font-semibold">STEP 2</div>
                    <div className="text-sm font-mono-tabular my-2 text-amber-300">[0, 1, 1, 0]</div>
                    <div className="text-[11px] text-slate-300">Binarize & Edges</div>
                  </div>
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-indigo-400 font-mono-tabular font-semibold">STEP 3</div>
                    <div className="text-sm font-mono-tabular my-2 text-emerald-300">8×8 Grid</div>
                    <div className="text-[11px] text-slate-300">Max-Pooling</div>
                  </div>
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-indigo-400 font-mono-tabular font-semibold">STEP 4</div>
                    <div className="text-sm font-mono-tabular my-2 text-white">क: 96%</div>
                    <div className="text-[11px] text-slate-300">Softmax Output</div>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Formula to mention in Viva: <code className="text-amber-300">ReLU(x) = max(0, x)</code> removes negative noise in hidden layers, and <code className="text-amber-300">Softmax</code> converts final numbers into percentages.
                </p>
              </div>
            )}

            {currentModule.visualDiagramType === 'ngram-nlp' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Input Sentence:</div>
                  <div className="text-base font-deva text-white mt-0.5">
                    मराठी भाषा अतिशय समृद्ध आहे
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-amber-400 font-semibold mb-1">Character Trigrams (N=3)</div>
                    <div className="font-mono-tabular text-slate-200">
                      "मरा", "राठ", "ाठी", "आहे"
                    </div>
                  </div>
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-emerald-400 font-semibold mb-1">Lexical Match</div>
                    <div className="text-slate-200">
                      "आहे" (Marathi copula) + "ठ/ण" retroflex frequency → <strong>Marathi</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentModule.visualDiagramType === 'system-architecture' && (
              <div className="space-y-3 text-xs">
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-white">1. Client UI (React 19 + Canvas)</span>
                    <span className="text-slate-400 font-mono-tabular">Port 3000</span>
                  </div>
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-amber-300">
                      2. Local Deterministic Engine (devanagariEngine.ts)
                    </span>
                    <span className="text-slate-400 font-mono-tabular">8×8 CNN + N-Gram</span>
                  </div>
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-emerald-300">
                      3. Express Server API (/api/recognize-image & /api/analyze-text)
                    </span>
                    <span className="text-slate-400 font-mono-tabular">Node.js + Gemini</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professor Viva Q&A Section */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-700" />
            <span>4. Likely Professor Viva Questions & Ready-Made Answers for This Chapter</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentModule.vivaQuestions.map((qa, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
              >
                <div className="text-xs font-semibold text-indigo-950">{qa.question}</div>
                <div className="text-xs text-slate-700 leading-relaxed">{qa.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
