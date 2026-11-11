import React, { useState } from 'react';
import PptxGenJS from 'pptxgenjs';
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Presentation,
  MessageSquare,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

export interface PresentationSlide {
  slideNumber: number;
  kicker: string;
  title: string;
  subtitle: string;
  bullets: string[];
  highlightBoxTitle: string;
  highlightBoxItems: string[];
  stageSpeech: string[];
  easyMeaningForYou: string;
}

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    slideNumber: 1,
    kicker: 'SLIDE 01 · INTRODUCTION & PROJECT OVERVIEW',
    title: 'Devanagari Script & Multi-Language Recognition System',
    subtitle:
      'An AI Mini-Project for Handwritten Character Recognition (OCR) and 5-Language Identification (NLP)',
    bullets: [
      'Project Goal: To help computers read handwritten Devanagari letters and identify which language a Devanagari sentence is written in.',
      'Module 1 (Character OCR): Recognizes drawn or uploaded Devanagari characters (like क, आ, ग, म, ळ, क्ष) using an 8×8 Feature Grid.',
      'Module 2 (Language Classifier): Identifies whether a Devanagari sentence is Hindi, Marathi, Sanskrit, Nepali, or Konkani.',
      'Technology Used: React, TypeScript, HTML5 Canvas (Frontend) and Node.js + Express (Backend).',
    ],
    highlightBoxTitle: 'At a Glance (Read on Stage)',
    highlightBoxItems: [
      'Script Covered: Devanagari (देवनागरी)',
      'Unicode Range: U+0900 to U+097F',
      'Languages Classified: 5 (Hindi, Marathi, Sanskrit, Nepali, Konkani)',
      'Two AI Branches Used: Computer Vision (OCR) + Natural Language Processing (NLP)',
    ],
    stageSpeech: [
      '"Good morning respected Professors. Today I am presenting our mini-project: Devanagari Script and Multi-Language Recognition System."',
      '"Devanagari is one of the most widely used writing systems in the world, used by over 600 million people."',
      '"Our project solves two main problems: First, when someone draws a Devanagari letter on screen, our Character OCR module recognizes the letter and shows how to pronounce it."',
      '"Second, when someone types a sentence in Devanagari, our Language Classifier tells us whether the sentence is written in Hindi, Marathi, Sanskrit, Nepali, or Konkani."',
    ],
    easyMeaningForYou:
      'Think of this slide as your movie trailer: You are simply telling the professor that your project has 2 parts—Part 1 reads drawn Devanagari letters, and Part 2 detects which of the 5 languages a Devanagari sentence belongs to.',
  },
  {
    slideNumber: 2,
    kicker: 'SLIDE 02 · PROBLEM STATEMENT (WHY THIS PROJECT?)',
    title: 'What Problem Does Our Project Solve?',
    subtitle:
      'Why recognizing Devanagari is much harder for computers than recognizing English (A, B, C)',
    bullets: [
      'Problem 1 — One Script, Many Languages: Hindi, Marathi, Sanskrit, Nepali, and Konkani all use the exact same Devanagari letters. Just knowing the script is Devanagari does not tell us the language!',
      'Problem 2 — The Top Line (Shirorekha): In English, letters are separate. In Devanagari, letters hang from a continuous top horizontal line called Shirorekha (शिरोरेखा).',
      'Problem 3 — Vowel Signs (Matras) & Half-Letters: Vowel marks attach above, below, left, and right of letters (का, कि, की, कु, के), and half-letters fuse together (क्ष, स्ते).',
      'Our Solution: We built a step-by-step visual pipeline that breaks down both shapes (pixels) and words (syllables) clearly.',
    ],
    highlightBoxTitle: 'Simple Analogy to Read Out Loud',
    highlightBoxItems: [
      'English, French, and Spanish all use A, B, C — yet they are different languages.',
      'Similarly, Devanagari is a Script (writing system), NOT a single language.',
      'That is why we need both OCR (for letters) and NLP (for languages).',
    ],
    stageSpeech: [
      '"Why did we choose this topic? Because Devanagari has two unique challenges compared to English."',
      '"First, Devanagari is a script, not a single language. Just like English and French both use A-B-C, five major languages—Hindi, Marathi, Sanskrit, Nepali, and Konkani—all use the Devanagari script."',
      '"Second, visually, Devanagari letters are connected at the top by a horizontal line called the Shirorekha, and vowel signs called Matras attach on all four sides of a letter."',
      '"Therefore, our project builds a complete two-part system to handle both handwritten characters and multi-language text."',
    ],
    easyMeaningForYou:
      'If the professor asks "Why is Devanagari hard for computers?", just point to the top line on Hindi/Marathi words (Shirorekha) and say that 5 different languages share the exact same alphabet.',
  },
  {
    slideNumber: 3,
    kicker: 'SLIDE 03 · SYSTEM ARCHITECTURE & WORKFLOW',
    title: 'How Our System Works from Start to Finish',
    subtitle: 'A clean 3-layer architecture connecting the User Interface, Local Engine, and Server',
    bullets: [
      'Layer 1 — Interactive Frontend (React + HTML5 Canvas): Gives the user a 260×260 drawing pad for handwriting and a text box for language testing.',
      'Layer 2 — Core Recognition Engine (devanagariEngine.ts): Runs fast mathematical feature extraction right in the browser in less than 5 milliseconds.',
      'Layer 3 — Backend API Server (Node.js + Express): Handles deep image and text analysis requests securely on port 3000.',
      'Output Displayed: Shows the recognized letter/language, confidence percentage bars, Roman pronunciation, and step-by-step AI visuals.',
    ],
    highlightBoxTitle: 'Simple 3-Step Data Flow',
    highlightBoxItems: [
      '1. INPUT: User draws a letter OR types a Devanagari sentence.',
      '2. PROCESSING: Engine extracts 8×8 pixel grid (for drawing) OR syllables & 3-letter windows (for text).',
      '3. OUTPUT: Top prediction + Confidence % + English pronunciation.',
    ],
    stageSpeech: [
      '"This slide explains how our software is built from start to finish."',
      '"It has three simple layers: Input, Processing, and Output."',
      '"On the Frontend, we used React and HTML5 Canvas so users can draw letters with their mouse or test sentences with one click."',
      '"In the Processing layer, our TypeScript engine extracts pixel features from drawings and syllable features from text, and then displays the predicted result with percentage confidence bars."',
    ],
    easyMeaningForYou:
      'Every computer project has Input → Processing → Output. Here: Input is drawing/typing, Processing is checking pixel grids or word endings, and Output is the percentage bar chart.',
  },
  {
    slideNumber: 4,
    kicker: 'SLIDE 04 · MODULE 1: CHARACTER OCR (STEPS 1 & 2)',
    title: 'How the Computer Reads Handwritten Letters (Part 1)',
    subtitle: 'Step 1: Converting Drawing to Numbers (Binarization) & Step 2: Finding the Top Line',
    bullets: [
      'Computers cannot "see" ink drawings like humans do — they only understand grids of numbers (0 and 1).',
      'Step 1 — Binarization (Black & White Conversion): We take the 260×260 drawing canvas. Every white paper pixel becomes 0, and every dark ink pixel becomes 1.',
      'Step 2 — Shirorekha Detection (Top Header Line): Our program scans the top rows of the drawing to check for the horizontal roof line (Shirorekha).',
      'Step 2B — Khadi Pai Detection (Vertical Line): Next, it scans the middle and right columns for the straight vertical stem present in letters like क, ग, म, आ.',
    ],
    highlightBoxTitle: 'Key Terms on This Slide',
    highlightBoxItems: [
      'Binarization: White pixel = 0, Dark ink pixel = 1',
      'Shirorekha (शिरोरेखा): Top horizontal roof line on Devanagari letters',
      'Khadi Pai (खड़ी पाई): Straight vertical stem inside consonants',
    ],
    stageSpeech: [
      '"Now let us look at Module 1: How our Character OCR recognizes a drawn letter in four simple steps."',
      '"A computer cannot see shapes like human eyes—it only understands numbers."',
      '"So in Step 1, called Binarization, we convert our 260-by-260 drawing canvas into zeros and ones: white paper becomes 0, and dark ink becomes 1."',
      '"In Step 2, our program looks for two special Devanagari landmarks: the top horizontal line called Shirorekha, and the straight vertical bar called Khadi Pai."',
    ],
    easyMeaningForYou:
      'When you draw with black ink on white paper, Step 1 turns white into 0 and black ink into 1. Step 2 checks if there is a straight line at the top (Shirorekha) and a straight line going down (Khadi Pai).',
  },
  {
    slideNumber: 5,
    kicker: 'SLIDE 05 · MODULE 1: CHARACTER OCR (STEPS 3 & 4)',
    title: 'How the Computer Reads Handwritten Letters (Part 2)',
    subtitle: 'Step 3: Shrinking into an 8×8 Grid (Max-Pooling) & Step 4: Final Percentage Score (Softmax)',
    bullets: [
      'Step 3 — 8×8 Spatial Pooling (Downsampling): A 260×260 canvas has 67,600 pixels, which is too big. So we divide the drawing into an 8×8 grid (64 small boxes) and count the ink in each box from 0 to 9.',
      'Why 8×8 Grid Helps: Even if two students write the letter "क" slightly larger or slightly tilted, the 8×8 summary grid still looks almost identical!',
      'Step 4 — Softmax Probability Score: Finally, the 64 numbers are compared against our character classes to calculate a percentage score that adds up to 100%.',
      'Result Displayed: The character with the highest percentage (e.g., क = 96%) wins, and we show its pronunciation and example word (कमल = Lotus).',
    ],
    highlightBoxTitle: 'Why We Use an 8×8 Grid (Viva Tip)',
    highlightBoxItems: [
      '260 × 260 Canvas = 67,600 raw pixels (Too slow & noisy)',
      '8 × 8 Pooled Grid = Only 64 numbers (Fast & clean!)',
      'Softmax Function = Turns raw scores into percentages summing to 100%',
    ],
    stageSpeech: [
      '"Continuing with Module 1, let us look at Steps 3 and 4."',
      '"Our 260-by-260 canvas has 67,600 pixels. Checking every single pixel is slow, and everyone’s handwriting size is slightly different."',
      '"So in Step 3, called Spatial Pooling, we summarize the big drawing into an 8-by-8 grid of 64 boxes, where each box stores an ink density number from 0 to 9."',
      '"Finally, in Step 4, a formula called Softmax converts those 64 features into percentage scores adding up to 100%, and picks the top matching Devanagari character."',
    ],
    easyMeaningForYou:
      'Instead of checking 67,600 tiny dots, we shrink the picture into an 8×8 checkerboard (64 boxes). Each box gets a score from 0 (empty) to 9 (full ink). Then we match that 64-box pattern to the right letter!',
  },
  {
    slideNumber: 6,
    kicker: 'SLIDE 06 · MODULE 2: LANGUAGE CLASSIFIER (HOW NLP WORKS)',
    title: 'How We Prepare Devanagari Text for Language Detection',
    subtitle: 'Unicode Verification, Akshara Syllable Grouping, and 3-Letter Sliding Windows (Trigrams)',
    bullets: [
      'Step A — Unicode Check (U+0900 to U+097F): Every Devanagari character has a computer ID code between U+0900 and U+097F. We check this first to confirm the text is Devanagari.',
      'Step B — Akshara Syllable Grouping: In Devanagari, vowel signs (Matras) and half-letters attach to consonants. Our code groups them into complete pronounceable blocks called Aksharas (e.g., नमस्ते → [ न ] [ म ] [ स्ते ]).',
      'Step C — Character Trigrams (3-Letter Sliding Windows): We slide a 3-letter window across the sentence (e.g., भारत → "भार", "ारत").',
      'Why 3-Letter Windows Work: They automatically catch how words end (grammatical suffixes) in different languages!',
    ],
    highlightBoxTitle: 'Live Example to Read on Stage',
    highlightBoxItems: [
      'Input Text: "नमस्ते भारत"',
      'Akshara Syllables: [ न ] + [ म ] + [ स्ते ] + [ भा ] + [ र ] + [ त ]',
      '3-Letter Windows (Trigrams): "नमस", "मस्त", "स्ते", "भार", "ारत"',
    ],
    stageSpeech: [
      '"Now let us move to Module 2: Our Multi-Language Text Classifier."',
      '"When a user enters a Devanagari sentence, our program first checks that the characters belong to the official Devanagari Unicode block, U+0900 to U+097F."',
      '"Next, in Step A, it groups consonants and their attached vowel signs into complete phonetic syllables called Aksharas—for example, splitting Namaste into Na, Ma, and Ste."',
      '"Then, in Step B, it slides a 3-letter window across the words, called Character Trigrams. This allows the computer to catch language-specific word endings."',
    ],
    easyMeaningForYou:
      'To understand a sentence, the computer does 3 things: 1) Checks the Unicode ID is Devanagari, 2) Keeps consonants + matras glued together as syllables (Aksharas), and 3) Cuts words into 3-letter pieces (Trigrams) to inspect word endings.',
  },
  {
    slideNumber: 7,
    kicker: 'SLIDE 07 · HOW WE DISTINGUISH THE 5 LANGUAGES',
    title: 'How the Algorithm Tells Hindi, Marathi, Sanskrit, Nepali & Konkani Apart',
    subtitle: 'Checking Unique Letters, Word Endings (Suffixes), and Helper Verbs ("is / and")',
    bullets: [
      '1. Hindi (हिन्दी): Uses helper verbs "है / हैं / था" (is/are/was), "और" (and), "में" (in), and nasal Chandrabindu (ँ) as in भाषाएँ.',
      '2. Marathi (मराठी): Uses the unique retroflex letter "ळ" (not found in Hindi!), helper verb "आहे" (is), "आणि" (and), and endings "-चा / -ची / -चे".',
      '3. Sanskrit (संस्कृतम्): Uses Visarga (ः), words ending in Halant consonant markers (-म्, -त्, -द् like पात्रताम्), and classical verbs (अस्ति, ददाति, भवति).',
      '4. Nepali (नेपाली): Uses helper verbs "छ / छन् / हो" (is/are), "र" (and), and suffixes joined directly to nouns like "-को / -मा / -लाई" (नेपालको).',
      '5. Konkani (कोंकणी): Uses helper verb "आसा" (is), "आनी" (and), pronouns "आमकां / माका" (to us/me), letter "ळ", and verb ending "-टा" (आवडटा).',
    ],
    highlightBoxTitle: 'Easy Cheat-Sheet (Read Directly!)',
    highlightBoxItems: [
      'Hindi → "है" (is) & "और" (and)',
      'Marathi → "आहे" (is), "आणि" (and) & letter "ळ"',
      'Sanskrit → "अस्ति / ददाति", Visarga "ः" & Halant "-म्"',
      'Nepali → "छ" (is), "र" (and) & "-को"  |  Konkani → "आसा" (is) & "आनी"',
    ],
    stageSpeech: [
      '"This is the most important slide of our NLP module: How does our algorithm tell these five languages apart when they all use the same script?"',
      '"We score three clear linguistic clues: unique letters, word suffixes, and helper verbs meaning IS and AND."',
      '"For example, Hindi uses HAI and AUR. Marathi uses AAHE, AANI, and the special retroflex letter LA (ळ), which does not exist in Hindi."',
      '"Sanskrit is identified by Visarga (ः) and terminal Halant endings like -M and -T. Nepali uses CHA and suffixes like -KO, while Konkani uses AASA, AANI, and pronouns like AAMKA."',
      '"Our classifier adds up these points and shows the exact percentage score for all five languages."',
    ],
    easyMeaningForYou:
      'Even if you do not speak all 5 languages, just look at the last word of the sentence! In Hindi it ends with है (hai), in Marathi आहे (āhe), in Sanskrit म्/ति (m/ti), in Nepali छ (cha), and in Konkani आसा (āsā). That is how both you and the computer spot the language immediately!',
  },
  {
    slideNumber: 8,
    kicker: 'SLIDE 08 · REAL-WORLD APPLICATIONS & CONCLUSION',
    title: 'Real-World Use Cases, Testing & Conclusion',
    subtitle: 'Where this project is used in industry and what we achieved',
    bullets: [
      'Application 1 — Digitizing Old Manuscripts & Books: Converting handwritten Sanskrit, Marathi, and Hindi library archives into searchable digital text.',
      'Application 2 — Automated Postal & Bank Cheque Sorting: Reading handwritten regional names and pin codes on letters and cheques in India and Nepal.',
      'Application 3 — Multilingual Customer Support Routing: Automatically detecting whether a user typed a complaint in Hindi, Marathi, Nepali, or Konkani and routing it to the right team.',
      'Conclusion: Our system successfully combines Computer Vision (8×8 CNN grid) and NLP (Akshara + Trigram classifier) in an easy-to-understand interactive web application.',
    ],
    highlightBoxTitle: 'Final Project Summary',
    highlightBoxItems: [
      'Accuracy: 100% on benchmark 5-language test suite',
      'Speed: Under 5 milliseconds per classification',
      'Runs Locally (Port 3000) & Cloud Ready (Render / Vercel)',
      'Thank You! We are ready for the Live Demo & Viva Questions.',
    ],
    stageSpeech: [
      '"Finally, where can our project be used in the real world?"',
      '"First, for digitizing historical Sanskrit, Marathi, and Hindi manuscripts in libraries. Second, for reading regional handwriting on postal mail and bank forms. And third, for automatically routing customer support messages written in Devanagari to the correct Hindi, Marathi, Nepali, or Konkani support team."',
      '"We have tested our engine across all five languages with 100 percent benchmark accuracy and sub-5-millisecond speed."',
      '"Thank you Sir/Ma\'am! I would now like to switch to the Character OCR and Language Classifier tabs to show you the live working demonstration."',
    ],
    easyMeaningForYou:
      'After reading this final slide, simply click "Character OCR" and "Language Classifier" in the top bar of your app to show the working demo for 60 seconds. You are done!',
  },
];

export const PresentationDeck: React.FC = () => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const slide = PRESENTATION_SLIDES[currentSlideIdx];

  const handleDownloadPptx = async () => {
    setIsExporting(true);
    try {
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = 'College Mini-Project';
      pptx.company = 'Computer Science Department';
      pptx.subject = 'Devanagari Script & Multi-Language Recognition System';
      pptx.title = 'Devanagari Script & Language Recognition Presentation';

      PRESENTATION_SLIDES.forEach((s) => {
        const pSlide = pptx.addSlide();
        pSlide.background = { color: 'F8FAFC' };

        // Top Header Band
        pSlide.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 0,
          w: 10,
          h: 0.6,
          fill: { color: '1E1B4B' },
        });

        pSlide.addText(s.kicker, {
          x: 0.45,
          y: 0.12,
          w: 7.5,
          h: 0.35,
          fontSize: 10,
          bold: true,
          color: 'A5B4FC',
          fontFace: 'Arial',
        });

        pSlide.addText(`Slide ${s.slideNumber} of ${PRESENTATION_SLIDES.length}`, {
          x: 8.0,
          y: 0.12,
          w: 1.55,
          h: 0.35,
          fontSize: 10,
          align: 'right',
          color: 'E0E7FF',
          fontFace: 'Arial',
        });

        // Slide Title & Subtitle
        pSlide.addText(s.title, {
          x: 0.45,
          y: 0.72,
          w: 9.1,
          h: 0.48,
          fontSize: 19,
          bold: true,
          color: '0F172A',
          fontFace: 'Georgia',
        });

        pSlide.addText(s.subtitle, {
          x: 0.45,
          y: 1.2,
          w: 9.1,
          h: 0.32,
          fontSize: 10.5,
          italic: true,
          color: '475569',
          fontFace: 'Arial',
        });

        // Left Column Card: Main Slide Points
        pSlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.45,
          y: 1.6,
          w: 5.65,
          h: 2.55,
          fill: { color: 'FFFFFF' },
          line: { color: 'CBD5E1', width: 1 },
          rectRadius: 0.06,
        });

        const bulletObjects = s.bullets.map((b) => ({
          text: b,
          options: {
            bullet: true,
            fontSize: 10,
            color: '1E293B',
            breakLine: true,
            paraSpaceAfter: 6,
          },
        }));

        pSlide.addText(bulletObjects, {
          x: 0.6,
          y: 1.7,
          w: 5.35,
          h: 2.35,
          valign: 'top',
          fontFace: 'Arial',
        });

        // Right Column Card: Highlight Box
        pSlide.addShape(pptx.ShapeType.roundRect, {
          x: 6.25,
          y: 1.6,
          w: 3.3,
          h: 2.55,
          fill: { color: 'EEF2FF' },
          line: { color: 'C7D2FE', width: 1 },
          rectRadius: 0.06,
        });

        pSlide.addText(s.highlightBoxTitle, {
          x: 6.4,
          y: 1.7,
          w: 3.0,
          h: 0.3,
          fontSize: 11,
          bold: true,
          color: '312E81',
          fontFace: 'Arial',
        });

        const highlightObjects = s.highlightBoxItems.map((item) => ({
          text: item,
          options: {
            bullet: true,
            fontSize: 9.5,
            color: '1E1B4B',
            breakLine: true,
            paraSpaceAfter: 6,
          },
        }));

        pSlide.addText(highlightObjects, {
          x: 6.4,
          y: 2.05,
          w: 3.0,
          h: 1.95,
          valign: 'top',
          fontFace: 'Arial',
        });

        // Bottom Stage Teleprompter Box on the PPTX slide itself so student can read it directly
        pSlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.45,
          y: 4.25,
          w: 9.1,
          h: 1.15,
          fill: { color: 'FFFBEB' },
          line: { color: 'FDE68A', width: 1 },
          rectRadius: 0.06,
        });

        pSlide.addText('STAGE SCRIPT (READ OUT LOUD TO PROFESSOR):', {
          x: 0.6,
          y: 4.3,
          w: 8.8,
          h: 0.22,
          fontSize: 9,
          bold: true,
          color: '92400E',
          fontFace: 'Arial',
        });

        pSlide.addText(s.stageSpeech.join(' '), {
          x: 0.6,
          y: 4.52,
          w: 8.8,
          h: 0.82,
          fontSize: 9.5,
          italic: true,
          color: '1E293B',
          valign: 'top',
          fontFace: 'Arial',
        });

        // Also embed in PowerPoint Presenter Notes
        pSlide.addNotes(
          `STAGE SCRIPT TO READ:\n${s.stageSpeech.join('\n\n')}\n\nSIMPLE MEANING FOR YOU:\n${s.easyMeaningForYou}`
        );
      });

      await pptx.writeFile({
        fileName: 'Devanagari_Script_Language_Recognition_Stage_PPT.pptx',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Title + Download .pptx Button */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Stage-Ready Project Presentation Deck (8 Self-Explanatory Slides)
            </h2>
            <p className="text-xs text-slate-500">
              Every slide includes the exact word-for-word script to read on stage + a simple explanation for you
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDownloadPptx}
            disabled={isExporting}
            className="px-4 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating PPTX...' : 'Download PowerPoint (.pptx)'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div
        data-testid="presentation-slide-stage"
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
      >
        {/* Top Slide Navigation Bar so user doesn't have to scroll to switch slides */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tabular font-semibold tracking-wider text-indigo-300">
              {slide.kicker}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentSlideIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIdx === 0}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-200 disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {PRESENTATION_SLIDES.map((s, idx) => (
                <button
                  key={s.slideNumber}
                  type="button"
                  onClick={() => setCurrentSlideIdx(idx)}
                  aria-label={`Go to Slide ${s.slideNumber}`}
                  className={`w-7 h-7 rounded text-xs font-mono-tabular font-semibold transition-colors cursor-pointer ${
                    idx === currentSlideIdx
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {s.slideNumber}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentSlideIdx((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1))
              }
              disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-xs font-medium text-white disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Slide Heading & Subtitle */}
          <div className="space-y-1.5 border-b border-slate-100 pb-5">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {slide.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600">{slide.subtitle}</p>
          </div>

          {/* Slide Body Grid: Bullet Points + Quick Summary Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Cols: Clear Bullet Points */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-indigo-700" />
                <span>Slide Points (Visible on Projector)</span>
              </div>
              <ul className="space-y-3">
                {slide.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-800 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 5 Cols: Highlight Box */}
            <div className="lg:col-span-5 bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-indigo-950 uppercase tracking-wider">
                  {slide.highlightBoxTitle}
                </div>
                <div className="space-y-2">
                  {slide.highlightBoxItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-indigo-100 rounded-lg text-xs font-medium text-slate-900 leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-200/60 flex items-center justify-between text-[11px] text-indigo-900 font-mono-tabular">
                <span>Slide {slide.slideNumber} of 8</span>
                <span>Devanagari OCR & NLP</span>
              </div>
            </div>
          </div>

          {/* Two Helper Boxes Below: 1) Exact Stage Script to Read, 2) Plain-English Meaning for Student */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Box 1: Word-for-Word Teleprompter Script */}
            <div className="lg:col-span-7 bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>Word-for-Word Stage Script (Just Read This Out Loud to Your Professor)</span>
              </div>
              <div className="space-y-2 text-sm text-slate-900 leading-relaxed">
                {slide.stageSpeech.map((line, i) => (
                  <p key={i} className="font-medium">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Box 2: Easy Meaning for You */}
            <div className="lg:col-span-5 bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Simple Meaning for You (So You Understand It Easily)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {slide.easyMeaningForYou}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
