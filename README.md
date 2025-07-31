# Blotato Content Moderation API

A **TypeScript + Express** API for flagging **problematic content** before posting to social media.  
Combines **manual keyword checks** with **AI-powered moderation** using **OpenAI’s Moderation API**.

---

## Features

- **Manual Checks**
  - Detects banned words: `spam`, `scam`, `hate`, `kill`, `nsfw`
  - Flags excessive links (spam)
  - Flags overly long text (>500 chars)
- **AI Moderation**
  - Uses `omni-moderation-latest` model to detect:
    - Hate speech
    - Harassment & bullying
    - Violence or threats
    - Self-harm & suicide content
    - Adult / sexual content
- **CORS enabled** for frontend integration
- **Jest unit tests** for manual and AI checks

---

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blotato-content-moderation
   ```
2. **Install dependences**
   ```bash
   npm install
   ```
3. **Environment variables**
   ```bash
   Copy .env.example to .env and add your OpenAI API key
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Future Improvements

- Support image & video moderation with AI vision
- Add URL safety / phishing detection
- Implement batch moderation endpoint
- Add logging and rate limiting for production

