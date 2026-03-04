import { Link } from "react-router-dom";
import { BookOpen, Keyboard, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const features = [
  {
    icon: Eye,
    title: "Computer Vision Detection",
    description: "Your webcam watches as you sign — AI recognizes each letter in real time.",
  },
  {
    icon: BookOpen,
    title: "Alphabet Quiz",
    description: "Random letters challenge you to sign correctly. Build muscle memory fast.",
  },
  {
    icon: Keyboard,
    title: "Word Practice",
    description: "Type any word and learn to spell it in ASL, letter by letter.",
  },
];

const ArchitectureDiagram = () => (
  <div style={{ fontFamily: "'DM Sans', 'DM Mono', sans-serif", background: "#f5f4f0", padding: "32px 16px 48px", borderRadius: "16px" }}>

    <div style={{ textAlign: "center", marginBottom: "40px" }}>
      <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "6px" }}>Architecture Overview</div>
      <div style={{ fontSize: "22px", fontWeight: 600, color: "#111", marginBottom: "6px" }}>How Signify Works</div>
      <div style={{ fontSize: "13px", color: "#888", fontStyle: "italic" }}>From user gesture to detected letter</div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "880px", margin: "0 auto" }}>

      {/* LEFT: App Structure */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* Frontend pages */}
        <div style={{ background: "#eef2ff", border: "1.5px solid #c5d0f5", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3b5bdb", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4c6ef5", display: "inline-block" }}></span>
            Frontend · React + Vite
          </div>
          {[
            { icon: "🔝", title: "Header.tsx", desc: "Navigation · routing via react-router-dom" },
            { icon: "🏠", title: "Index.tsx", desc: "Home page · entry point" },
            { icon: "📖", title: "AlphabetQuiz.tsx", desc: "Core quiz · holds expectedLetter state" },
            { icon: "⌨️", title: "WordPractice.tsx", desc: "Spell words letter-by-letter" },
          ].map((c, i) => (
            <div key={i}>
              {i > 0 && <div style={{ display: "flex", justifyContent: "center", margin: "3px 0" }}><div style={{ width: "1.5px", height: "12px", background: "#ccc" }}></div></div>}
              <div style={{ background: "#fff", border: "1.5px solid #e8e6de", borderLeft: "3px solid #4c6ef5", borderRadius: "10px", padding: "10px 13px", display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "15px" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>{c.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>{c.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Components */}
        <div style={{ background: "#f0f4ff", border: "1.5px solid #c5d0f5", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3b5bdb", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4c6ef5", display: "inline-block" }}></span>
            Components
          </div>
          {[
            { icon: "🃏", title: "ASLLetterCard.tsx", desc: "Renders letter + /asl/X.png + hint text" },
            { icon: "📷", title: "WebcamCapture.tsx", desc: "Captures frame → base64 JPEG → Edge Function" },
          ].map((c, i) => (
            <div key={i}>
              {i > 0 && <div style={{ display: "flex", justifyContent: "center", margin: "3px 0" }}><div style={{ width: "1.5px", height: "12px", background: "#ccc" }}></div></div>}
              <div style={{ background: "#fff", border: "1.5px solid #e8e6de", borderLeft: "3px solid #4c6ef5", borderRadius: "10px", padding: "10px 13px", display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "15px" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>{c.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>{c.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data + Assets */}
        <div style={{ background: "#fdf4ff", border: "1.5px solid #e0b8f5", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9333ea", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", display: "inline-block" }}></span>
            Local Data + Assets
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { icon: "📋", title: "asl-data.ts", desc: "26 letters · descriptions · image paths" },
              { icon: "🖼️", title: "public/asl/", desc: "A.png → Z.png hand sign images" },
            ].map((c, i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #e8e6de", borderLeft: "3px solid #a855f7", borderRadius: "10px", padding: "10px 13px", display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "15px" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>{c.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Detection Flow */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* Edge Function */}
        <div style={{ background: "#e6faf2", border: "1.5px solid #9fe4ca", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1a7f5a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#20c997", display: "inline-block" }}></span>
            Supabase Edge Function · Deno
          </div>
          {[
            { icon: "🔒", title: "CORS Preflight", desc: "OPTIONS → return allow headers" },
            { icon: "📦", title: "Parse Request Body", desc: "Extract: image, expectedLetter" },
            { icon: "🔍", title: "Validate Input", desc: "No image? → 400 Bad Request" },
            { icon: "✂️", title: "Strip Data URL Prefix", desc: "data:image/jpeg;base64, → raw base64" },
          ].map((c, i) => (
            <div key={i}>
              {i > 0 && <div style={{ display: "flex", justifyContent: "center", margin: "3px 0" }}><div style={{ width: "1.5px", height: "12px", background: "#ccc" }}></div></div>}
              <div style={{ background: "#fff", border: "1.5px solid #e8e6de", borderLeft: "3px solid #20c997", borderRadius: "10px", padding: "10px 13px", display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "15px" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>{c.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>{c.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Gateway */}
        <div style={{ background: "#fff8ed", border: "1.5px solid #fcd99a", borderRadius: "14px", padding: "18px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c27a00", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fd9800", display: "inline-block" }}></span>
            AI Gateway · Lovable → Claude
          </div>
          {[
            { icon: "📋", title: "System Prompt", desc: '"ASL expert. Respond ONLY with a single letter A–Z. Account for mirrored webcam."' },
            { icon: "💬", title: "User Message", desc: '"What ASL letter is being signed?" + base64 image' },
            { icon: "🤖", title: "claude-sonnet-4-6", desc: "Analyzes hand shape, finger positions & orientation · max_tokens: 5" },
          ].map((c, i) => (
            <div key={i}>
              {i > 0 && <div style={{ display: "flex", justifyContent: "center", margin: "3px 0" }}><div style={{ width: "1.5px", height: "12px", background: "#ccc" }}></div></div>}
              <div style={{ background: "#fff", border: "1.5px solid #e8e6de", borderLeft: "3px solid #fd9800", borderRadius: "10px", padding: "10px 13px", display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "15px" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>{c.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>{c.desc}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Fork */}
          <div style={{ position: "relative", height: "28px", margin: "4px 0" }}>
            <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: "1.5px", background: "#ccc" }}></div>
            <div style={{ position: "absolute", top: 0, left: "25%", width: "1.5px", height: "100%", background: "#ccc" }}></div>
            <div style={{ position: "absolute", top: 0, right: "25%", width: "1.5px", height: "100%", background: "#ccc" }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div style={{ background: "#fff", border: "1.5px solid #e8e6de", borderLeft: "3px solid #20c997", borderRadius: "10px", padding: "10px 13px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#111", marginBottom: "2px" }}>🔤 Extract Letter</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>.charAt(0).toUpperCase()<br/>→ A–Z or "?"</div>
            </div>
            <div style={{ background: "#fff8ed", border: "1.5px solid #fcd99a", borderLeft: "3px solid #fd9800", borderRadius: "10px", padding: "10px 13px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#c27a00", marginBottom: "2px" }}>⚠️ Error Handling</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>429 rate limit<br/>402 credits · 500 unknown</div>
            </div>
          </div>

          {/* Merge */}
          <div style={{ position: "relative", height: "28px", margin: "4px 0" }}>
            <div style={{ position: "absolute", bottom: 0, left: "25%", right: "25%", height: "1.5px", background: "#ccc" }}></div>
            <div style={{ position: "absolute", bottom: 0, left: "25%", width: "1.5px", height: "100%", background: "#ccc" }}></div>
            <div style={{ position: "absolute", bottom: 0, right: "25%", width: "1.5px", height: "100%", background: "#ccc" }}></div>
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "6px solid #ccc" }}></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderLeft: "3px solid #22c55e", borderRadius: "10px", padding: "10px 13px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", marginBottom: "2px" }}>✅ Match</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>Score++ · next letter</div>
            </div>
            <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderLeft: "3px solid #ef4444", borderRadius: "10px", padding: "10px 13px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", marginBottom: "2px" }}>❌ No Match</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#888" }}>Try again prompt</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Legend */}
    <div style={{ maxWidth: "880px", margin: "32px auto 0", borderTop: "1px solid #e0ded6", paddingTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {[
        { color: "#4c6ef5", label: "Frontend · React" },
        { color: "#20c997", label: "Supabase Edge Function" },
        { color: "#fd9800", label: "AI Gateway · Claude" },
        { color: "#a855f7", label: "Local Data + Assets" },
        { color: "#22c55e", label: "Success path" },
        { color: "#ef4444", label: "Error / retry path" },
      ].map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#888" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }}></div>
          {l.label}
        </div>
      ))}
    </div>
  </div>
);

const Index = () => {
  const [showDiagram, setShowDiagram] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        {/* Hero */}
        <section className="container flex flex-col items-center gap-8 pb-16 pt-20 text-center" aria-labelledby="hero-heading">
          <span className="text-6xl" aria-hidden="true">🤟</span>
          <h1 id="hero-heading" className="font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl text-balance">
            Learn ASL with
            <span className="text-primary"> AI-Powered</span> Sign Detection
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground text-balance">
            Master the American Sign Language alphabet through interactive quizzes powered by computer vision.
            Sign in front of your camera and get instant feedback.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 text-base font-semibold px-8">
              <Link to="/quiz">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Start Alphabet Quiz
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base font-semibold px-8">
              <Link to="/practice">
                <Keyboard className="h-5 w-5" aria-hidden="true" />
                Practice a Word
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-card py-20" aria-labelledby="features-heading">
          <div className="container">
            <h2 id="features-heading" className="mb-12 text-center font-display text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="animate-slide-up rounded-xl border bg-background p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-20 text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="mb-4 font-display text-3xl font-bold text-foreground">
            Ready to start signing?
          </h2>
          <p className="mb-8 text-muted-foreground">No account needed. Just your hands and a camera.</p>
          <Button asChild size="lg" className="px-10 text-base font-semibold">
            <Link to="/quiz">Let's Go 🤟</Link>
          </Button>
        </section>
      </main>

      {/* Under the Hood — subtle expandable section */}
      <div className="border-t">
        <div className="container py-4 text-center">
          <button
            onClick={() => setShowDiagram(v => !v)}
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-expanded={showDiagram}
            aria-controls="architecture-diagram"
          >
            {showDiagram ? "▲ hide" : "under the hood ↓"}
          </button>
        </div>
        {showDiagram && (
          <div id="architecture-diagram" className="container pb-16">
            <ArchitectureDiagram />
          </div>
        )}
      </div>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground" role="contentinfo">
        <p>Signify — Making ASL accessible through technology</p>
      </footer>
    </div>
  );
};

export default Index;