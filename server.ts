import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Endpoint 1: Multimodal OCR & Handwriting Character Recognition
  app.post('/api/recognize-image', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/png', strokeHint } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Missing imageBase64 payload' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API key not configured on server; using local feature extractor.',
          fallback: true,
        });
      }

      const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Clean,
              },
            },
            {
              text: `You are an expert Devanagari Script Optical Character Recognition (OCR) and Linguistic AI system used in a college Computer Science mini-project.
Analyze this handwritten or printed Devanagari character/word image${strokeHint ? ` (User target hint: ${strokeHint})` : ''}.
Identify:
1. The exact Devanagari script text or character(s) shown.
2. The ISO-15919 / IAST transliteration.
3. The phonetic pronunciation in plain English.
4. The character category (Swar / Vowel, Vyanjan / Consonant, Matra / Diacritic, Conjunct / Samyuktakshar, Numeral, or Word/Sentence).
5. Which Devanagari language(s) use this or if it is a complete phrase, which language it belongs to (Hindi, Marathi, Sanskrit, Nepali, or Konkani).
6. Visual structural features detected by a Convolutional Neural Network (CNN): e.g., presence of Shirorekha (top horizontal header line), vertical bar (Khadi Pai), closed loop, curved tail, or top matra.
7. Top 3 candidate predictions with probability scores summing to ~1.0.`,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recognizedText: { type: Type.STRING },
              transliteration: { type: Type.STRING },
              pronunciation: { type: Type.STRING },
              category: { type: Type.STRING },
              meaningOrUsage: { type: Type.STRING },
              detectedLanguage: { type: Type.STRING },
              structuralFeatures: {
                type: Type.OBJECT,
                properties: {
                  shirorekhaDetected: { type: Type.BOOLEAN },
                  verticalBarType: { type: Type.STRING },
                  loopCount: { type: Type.INTEGER },
                  curvatureDescription: { type: Type.STRING },
                },
              },
              topPredictions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    transliteration: { type: Type.STRING },
                    confidence: { type: Type.NUMBER },
                  },
                },
              },
              cnnStepExplanation: { type: Type.STRING },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      return res.json({ source: 'gemini-vision', result: parsed });
    } catch (error: any) {
      console.error('Error in /api/recognize-image:', error?.message || error);
      return res.status(500).json({
        error: error?.message || 'Failed to analyze image with Gemini API',
        fallback: true,
      });
    }
  });

  // Endpoint 2: Deep NLP Devanagari Language Identification & Linguistic Breakdown
  app.post('/api/analyze-text', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing text input' });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API key not configured; using local deterministic N-gram & Lexical engine.',
          fallback: true,
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze the following Devanagari script text and classify which language it is written in among Hindi, Marathi, Sanskrit, Nepali, and Konkani.
Text: "${text}"

Provide a rich academic NLP breakdown suitable for a college student explaining how Machine Learning classifies closely related languages that share the same Devanagari script.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              primaryLanguage: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              transliteration: { type: Type.STRING },
              englishTranslation: { type: Type.STRING },
              keyLinguisticMarkers: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              morphologicalExplanation: { type: Type.STRING },
              languageProbabilities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    language: { type: Type.STRING },
                    probability: { type: Type.NUMBER },
                  },
                },
              },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text ?? '{}').trim());
      return res.json({ source: 'gemini-nlp', result: parsed });
    } catch (error: any) {
      console.error('Error in /api/analyze-text:', error?.message || error);
      return res.status(500).json({
        error: error?.message || 'Failed to analyze text with Gemini API',
        fallback: true,
      });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
