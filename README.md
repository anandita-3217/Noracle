<!-- # NOcrastinator
> This chatbot no matter whatever the user sends, respond with a no response from [no-as-a-service](https://github.com/hotheadhacker/no-as-a-service)
<!-- Alt name noracle 
----
## Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Framer-Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)

---

## Project Structure
```bash
no-chatbot/
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── proxy-server.js           ← optional Express proxy
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── no/route.ts   ← Next.js built-in API route (optional alternative to Express)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Chatbot.tsx       ← main chat UI
│   ├── lib/
│   │   └── api.ts            ← helper for API calls
│   └── theme.ts              ← custom MUI theme
├── public/
│   └── favicon.ico
└── .eslintrc.json

```

## Features

 - Chatbot layout
 - Later Combine with text to speech functionality for response and speech to text for user and only after the user approves can it be sent
 - Gibberish Identification

## Getting Started
 run the development server:

```bash
npm run dev
```
## Node Packages
```bash
    npm install express cors node-fetch
```
## Absoultely crucial:
DO NOT FORGET TO RUN THE EXPRESS JS PROXY ON PORT 5000

IN A SEPARATE TERMINAL 
Run this command
```bash
    node proxy-server.js
```
TODO: MAKE THE CHATBOT LOOK LIKE IT!
TODO: MAKE SURE TO USE THE LIB/API.TS
<!-- ## Tech Stack
- NextJs
- Tailwindcss
- Typescript
- Material UI
- Express Js (Proxy Server)
- framer-motion -->

# Noracle

> **The chatbot that respectfully declines everything.** Powered by [no-as-a-service](https://github.com/hotheadhacker/no-as-a-service), NOcrastinator responds to every user message with a creative "no" response.

---

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

---

## 📁 Project Structure

```bash
no-chatbot/
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── proxy-server.js              # Express proxy server - no longer in use
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── no/route.ts      # Next.js API route 
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Chatbot.tsx          # Main chat interface
│   ├── lib/
│   │   └── api.ts               # API utility functions
│   └── theme.ts                 # Custom Material-UI theme
├── public/
│   └── favicon.ico
└── .eslintrc.json
```

---

## ✨ Features

- **Intelligent Chat Interface** – Clean, responsive chatbot UI with smooth animations
- **Voice Integration** *(Coming Soon)* – Text-to-speech for responses and speech-to-text for user input with approval workflow
- **Gibberish Detection** – Identifies and handles nonsensical input gracefully


## 🔒 Zero Data Collection

**What we DON'T do:**
- ❌ No databases
- ❌ No user tracking
- ❌ No localStorage/cookies
- ❌ No conversation logging
- ❌ No analytics
- ❌ No telemetry

**Your chats are truly ephemeral.** Hit refresh, and it's like you were never here.

> "Ask your dumbest questions. We won't remember them... because we literally can't."

**Privacy Policy:** We would have one, but we'd have to store it somewhere, and... you get the idea.

---
<!-- # Gibberish Detection

## Current Implementation

The chatbot uses a **heuristic-based approach** to detect gibberish input and avoid unnecessary API calls. This is a lightweight, client-side solution that catches common patterns like keyboard smashes.

### Detection Methods:
- ✅ **Vowel ratio analysis** (15-70% threshold)
- ✅ **Repeated character detection** (5+ consecutive identical characters)
- ✅ **Keyboard pattern matching** (qwerty, asdfgh, etc.)
- ✅ **Special character ratio** (>50% non-alphanumeric)
- ✅ **Input validation** (length, numbers-only, symbols-only)

### Why This Approach?
- Fast execution (milliseconds)
- No external dependencies
- Works entirely client-side
- Good at catching obvious gibberish
- Easy to tune and maintain

---

## Future Improvements

If you need more sophisticated gibberish detection, consider these alternatives:

### Option A: Dictionary-Based Detection
**Best for:** Validating against real words

```typescript
import { distance } from 'fastest-levenshtein';

function isGibberish(text: string): boolean {
    // Check Levenshtein distance from common English words
    const commonWords = ['hello', 'yes', 'no', 'help', 'why', 'what', 'how', 'when', 'where'];
    const words = text.toLowerCase().split(/\s+/);
    
    let validWordCount = 0;
    words.forEach(word => {
        const minDistance = Math.min(...commonWords.map(w => distance(word, w)));
        if (minDistance <= 2) validWordCount++; // Within 2 edits of a real word
    });
    
    return validWordCount / words.length < 0.3; // Less than 30% valid words
}
```

**Pros:**
- More accurate for detecting misspelled vs gibberish
- Can expand dictionary for domain-specific terms

**Cons:**
- Requires `fastest-levenshtein` npm package
- Larger dictionary = slower performance
- May flag valid slang/names as gibberish

**Installation:**
```bash
npm install fastest-levenshtein
```

---

### Option B: Character Bigram Analysis
**Best for:** Statistical text analysis

```typescript
function isGibberish(text: string): boolean {
    // English has expected bigram (2-character pair) frequencies
    const commonBigrams = [
        'th', 'he', 'in', 'er', 'an', 're', 'on', 'at', 'en', 'nd',
        'ti', 'es', 'or', 'te', 'of', 'ed', 'is', 'it', 'al', 'ar'
    ];
    
    const bigrams = [];
    const cleaned = text.toLowerCase().replace(/[^a-z]/g, '');
    
    for (let i = 0; i < cleaned.length - 1; i++) {
        bigrams.push(cleaned.slice(i, i + 2));
    }
    
    if (bigrams.length === 0) return true;
    
    const commonCount = bigrams.filter(bg => commonBigrams.includes(bg)).length;
    return commonCount / bigrams.length < 0.15; // Less than 15% common bigrams
}
```

**Pros:**
- Based on linguistic patterns in English
- No external dependencies
- Can be extended to trigrams for better accuracy

**Cons:**
- May not work well for non-English text
- Requires tuning threshold based on your use case
- Less effective for very short inputs

**Further Reading:**
- [N-gram Language Models](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
- [Character-level Language Modeling](https://karpathy.github.io/2015/05/21/rnn-effectiveness/)

---

### Option C: Machine Learning Approach
**Best for:** Production systems with high accuracy requirements

```typescript
// Pseudo-code - would require ML model training

import { loadModel } from './gibberish-classifier';

async function isGibberish(text: string): Promise<boolean> {
    const model = await loadModel();
    const features = extractFeatures(text); // Convert to feature vector
    const prediction = model.predict(features);
    return prediction.gibberish > 0.5; // Confidence threshold
}
```

**Pros:**
- Highest accuracy
- Learns from real data
- Can adapt to your specific use case

**Cons:**
- Requires training data (thousands of labeled examples)
- Need ML infrastructure (TensorFlow.js, ONNX Runtime, etc.)
- Larger bundle size (~1-5MB)
- Overkill for simple chatbot validation

**Potential Libraries:**
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Brain.js](https://brain.js.org/)
- [Synaptic](https://caza.la/synaptic/)

**Training approach:**
1. Collect dataset of real user inputs + keyboard smashes
2. Label them (gibberish: true/false)
3. Train classifier (Naive Bayes, SVM, or Neural Network)
4. Export model to run in browser

---

### Option D: Hybrid Approach
**Best for:** Balancing accuracy and performance

Combine multiple methods with a scoring system:

```typescript
function gibberishScore(text: string): number {
    let score = 0;
    
    // Test 1: Vowel ratio (weight: 30%)
    const vowelRatio = getVowelRatio(text);
    if (vowelRatio < 0.15 || vowelRatio > 0.70) score += 0.3;
    
    // Test 2: Bigram analysis (weight: 30%)
    if (hasLowBigramFrequency(text)) score += 0.3;
    
    // Test 3: Dictionary distance (weight: 20%)
    if (hasHighLevenshteinDistance(text)) score += 0.2;
    
    // Test 4: Keyboard patterns (weight: 20%)
    if (hasKeyboardPatterns(text)) score += 0.2;
    
    return score; // 0.0 = definitely real, 1.0 = definitely gibberish
}

function isGibberish(text: string): boolean {
    return gibberishScore(text) > 0.5; // Tune threshold as needed
}
```

**Pros:**
- More robust than single method
- Adjustable weights for each test
- Can return confidence score for logging

**Cons:**
- More complex to maintain
- Slower than single heuristic

---

## Performance Comparison

| Method | Speed | Accuracy | Dependencies | Best For |
|--------|-------|----------|--------------|----------|
| **Current (Heuristic)** | ⚡⚡⚡ Very Fast | 🎯 Good | None | Keyboard smashes |
| **Dictionary-based** | ⚡⚡ Fast | 🎯🎯 Better | Levenshtein lib | Misspellings |
| **Bigram Analysis** | ⚡⚡ Fast | 🎯🎯 Better | None | Statistical detection |
| **Machine Learning** | ⚡ Medium | 🎯🎯🎯 Best | ML framework | Production systems |
| **Hybrid** | ⚡⚡ Fast | 🎯🎯🎯 Best | Optional | High-stakes validation |

---

## Implementation Checklist

When upgrading gibberish detection:

- [ ] Collect false positive/negative examples from production
- [ ] Benchmark performance impact (especially on mobile)
- [ ] Test with multilingual inputs if applicable
- [ ] Add logging to track detection accuracy
- [ ] Consider A/B testing different approaches
- [ ] Document threshold tuning process
- [ ] Add unit tests for edge cases

---

## Testing Your Detector

Create a test suite with known inputs:

```typescript
const testCases = [
    // Should be VALID (not gibberish)
    { input: "hello world", expected: false },
    { input: "why not?", expected: false },
    { input: "ok", expected: false },
    { input: "Can I do this?", expected: false },
    
    // Should be GIBBERISH
    { input: "asdfghjkl", expected: true },
    { input: "qwertyuiop", expected: true },
    { input: "aaaaaaaaa", expected: true },
    { input: "xkcd", expected: false }, // Edge case: valid acronym
    { input: "lol", expected: false },  // Edge case: internet slang
];

testCases.forEach(({ input, expected }) => {
    const result = isGibberish(input);
    console.log(`"${input}" → ${result ? 'gibberish' : 'valid'} (expected: ${expected ? 'gibberish' : 'valid'})`);
});
```

---

## Further Reading

### Academic Papers:
- [Statistical Language Models for Gibberish Detection](https://www.aclweb.org/anthology/papers/)
- [Character-based Neural Language Models](https://arxiv.org/abs/1508.06615)

### Tools & Libraries:
- [compromise.js](https://github.com/spencermountain/compromise) - Natural language processing
- [natural](https://github.com/NaturalNode/natural) - NLP toolkit for Node.js
- [wink-nlp](https://github.com/winkjs/wink-nlp) - Fast NLP library

### Inspirations:
- [zxcvbn](https://github.com/dropbox/zxcvbn) - Password strength estimator (uses similar pattern detection)
- [Twitter spam detection](https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/overview) -->

---



---

## 🛠️ Getting Started

### Installation

Install the required dependencies:

```bash
npm install
```

### Development

Start the Next.js development server:

```bash
npm run dev
```

### ⚠️ Critical: Run the Proxy Server

The Express proxy server **must be running** on port 5000. Open a **separate terminal** and execute:

```bash
node proxy-server.js
```

---

## 📦 Dependencies

Install the Express proxy dependencies:

```bash
npm install express cors node-fetch
```

---

## 📋 Roadmap

- [ ] Enhance chatbot visual design
- [ ] Integrate `lib/api.ts` utility functions throughout the application
- [ ] Implement voice-to-text and text-to-voice functionality
- [ ] Add user approval workflow for voice submissions

---

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❌ by developers who appreciate a good "no."**