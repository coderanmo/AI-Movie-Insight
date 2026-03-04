import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';
import { Review } from './reviewService';

export const generateSentimentAnalysis = async (reviews: Review[]) => {
    const apiKey = config.geminiApiKey;

    if (!apiKey) {
        console.warn('GEMINI_API_KEY is not defined, returning mock AI analysis.');
        return getMockAnalysis();
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `
      Analyze the following movie audience reviews:
      ${JSON.stringify(reviews)}
      
      Return ONLY a valid JSON object (no markdown, no backticks, no explanation) with this exact structure:
      {
        "summary": "A 1-2 sentence summary of overall audience opinions",
        "insights": [
          { "type": "Positive", "text": "A specific praise mentioned" },
          { "type": "Criticism", "text": "A specific criticism mentioned" },
          { "type": "Positive", "text": "Another praise" },
          { "type": "Criticism", "text": "Another criticism" }
        ],
        "sentiment": "Positive"
      }
      
      The sentiment field must be exactly one of: "Positive", "Mixed", or "Negative"
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();

        // Strip markdown code blocks if present
        const cleanedText = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error: any) {
        console.error('Gemini AI Analysis failed:', error.message);
        return getMockAnalysis();
    }
};

const getMockAnalysis = () => ({
    summary: 'Audiences generally enjoyed the movie, praising the visuals and performances, though some found the pacing slow.',
    insights: [
        { type: 'Positive', text: 'Stunning visuals and compelling acting.' },
        { type: 'Positive', text: 'Rewatchable cinematic experience.' },
        { type: 'Criticism', text: 'Pacing issues in the middle acts.' },
        { type: 'Criticism', text: "Didn't live up to expectations for some." }
    ],
    sentiment: 'Positive'
});
