# 🤟 Signify

**Learn the ASL alphabet with AI-powered sign detection.**

Signify is an interactive web app that teaches you American Sign Language fingerspelling through real-time computer vision. Sign in front of your camera and get instant feedback — no account required.

---

## Features

- **Alphabet Quiz** — A random letter is shown and you sign it. Claude analyzes your webcam feed and tells you if you got it right.
- **Word Practice** — Type any word and practice spelling it in ASL, letter by letter.
- **ASL Reference** — Every letter card shows the correct hand sign image and a description of the hand shape.
- **Accessible by Design** — Built with keyboard navigation and screen reader support in mind.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Routing | React Router |
| UI Components | shadcn/ui |
| Backend | Supabase Edge Functions (Deno) |
| AI Detection | Claude claude-sonnet-4-6 via Lovable AI Gateway |
| Package Manager | npm |

---

## How It Works

1. The user signs a letter in front of their webcam
2. `WebcamCapture.tsx` captures a frame and encodes it as a base64 JPEG
3. The frame is sent to a Supabase Edge Function (`detect-sign`)
4. The Edge Function forwards the image to Claude claude-sonnet-4-6 with a system prompt instructing it to identify the ASL letter
5. Claude returns a single letter (`A`–`Z`) or `?` if uncertain
6. The result is compared against the expected letter and the score is updated

---

## Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── ASLLetterCard.tsx    # Displays letter, image, and hint
│   ├── Header.tsx           # Navigation
│   ├── NavLink.tsx
│   └── WebcamCapture.tsx    # Webcam frame capture
├── lib/
│   ├── asl-data.ts          # Letter data and image paths
│   └── utils.ts
├── pages/
│   ├── Index.tsx            # Home page
│   ├── AlphabetQuiz.tsx     # Quiz mode
│   ├── WordPractice.tsx     # Word spelling practice
│   └── NotFound.tsx
supabase/
└── functions/
    └── detect-sign/
        └── index.ts         # Edge Function — AI sign detection
public/
└── asl/                     # A.png through Z.png hand sign images
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) and npm installed
- A [Supabase](https://supabase.com) project
- A Lovable API key with access to Claude

### Installation

```bash
git clone https://github.com/tsongyk/Signify.git
cd Signify
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

In your Supabase project, add the following secret to your Edge Function:

```
LOVABLE_API_KEY=your_lovable_api_key
```

### Running Locally

```bash
npm run dev
```

### ASL Images

Place your hand sign images in `public/asl/` named `A.png` through `Z.png`. Free public domain images are available from [Wikimedia Commons](https://commons.wikimedia.org/wiki/American_manual_alphabet).

---

## Deploying the Edge Function

```bash
supabase functions deploy detect-sign
```

---

## License

MIT