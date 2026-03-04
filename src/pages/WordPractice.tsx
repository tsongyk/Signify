import { useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/Header";
import WebcamCapture from "@/components/WebcamCapture";
import ASLLetterCard from "@/components/ASLLetterCard";
import { supabase } from "@/integrations/supabase/client";

type Phase = "input" | "learn" | "test";

const WordPractice = () => {
  const [word, setWord] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [letterResults, setLetterResults] = useState<(boolean | null)[]>([]);

  const letters = word.toUpperCase().replace(/[^A-Z]/g, "").split("");

  const handleSubmitWord = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = word.toUpperCase().replace(/[^A-Z]/g, "");
    if (cleaned.length === 0) {
      toast.error("Please enter a word with letters A-Z");
      return;
    }
    setWord(cleaned);
    setPhase("learn");
    setCurrentIndex(0);
    setLetterResults(new Array(cleaned.length).fill(null));
  };

  const handleStartTest = () => {
    setPhase("test");
    setCurrentIndex(0);
    setLetterResults(new Array(letters.length).fill(null));
  };

  const handleReset = () => {
    setWord("");
    setPhase("input");
    setCurrentIndex(0);
    setLetterResults([]);
  };

  const handleCapture = useCallback(async (imageData: string) => {
    if (isDetecting || phase !== "test") return;
    setIsDetecting(true);

    const expectedLetter = letters[currentIndex];

    try {
      const { data, error } = await supabase.functions.invoke("detect-sign", {
        body: { image: imageData, expectedLetter },
      });

      if (error) throw error;

      const detected = data?.detectedLetter?.toUpperCase() || "?";
      const correct = detected === expectedLetter;

      setLetterResults(prev => {
        const next = [...prev];
        next[currentIndex] = correct;
        return next;
      });

      if (correct) {
        toast.success(`Correct! "${expectedLetter}" ✓`);
        if (currentIndex < letters.length - 1) {
          setTimeout(() => setCurrentIndex(prev => prev + 1), 1000);
        } else {
          toast.success("Amazing! You spelled the whole word! 🎉");
        }
      } else {
        toast.error(`Detected "${detected}" — try "${expectedLetter}" again`);
      }
    } catch (e) {
      console.error("Detection error:", e);
      toast.error("Detection failed. Please try again.");
    } finally {
      setIsDetecting(false);
    }
  }, [isDetecting, phase, letters, currentIndex]);

  const allCorrect = letterResults.every(r => r === true);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Word Practice</h1>
          <p className="mt-2 text-muted-foreground">
            {phase === "input" && "Type a word to learn how to sign it letter by letter"}
            {phase === "learn" && "Study each letter's sign, then test yourself"}
            {phase === "test" && "Now sign each letter in front of your camera"}
          </p>
        </div>

        {/* Input phase */}
        {phase === "input" && (
          <form onSubmit={handleSubmitWord} className="mx-auto flex max-w-md gap-3">
            <Input
              type="text"
              value={word}
              onChange={e => setWord(e.target.value)}
              placeholder="Enter a word (e.g., HELLO)"
              className="text-lg"
              aria-label="Word to practice"
              autoFocus
            />
            <Button type="submit" className="shrink-0">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Start learning</span>
            </Button>
          </form>
        )}

        {/* Learn phase */}
        {phase === "learn" && (
          <div className="mx-auto max-w-3xl">
            {/* Word display */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2" role="list" aria-label="Letters in the word">
              {letters.map((letter, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg font-display text-xl font-bold transition-all focus-ring ${
                    i === currentIndex
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  aria-label={`Letter ${letter}${i === currentIndex ? ", currently selected" : ""}`}
                  role="listitem"
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Current letter guide */}
            <div className="mx-auto mb-8 max-w-md">
              <ASLLetterCard letter={letters[currentIndex]} size="lg" isActive />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </Button>

              {currentIndex < letters.length - 1 ? (
                <Button onClick={() => setCurrentIndex(prev => prev + 1)} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button onClick={handleStartTest} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Test
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}

              <Button variant="ghost" onClick={handleReset} className="gap-2 text-muted-foreground">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                New Word
              </Button>
            </div>
          </div>
        )}

        {/* Test phase */}
        {phase === "test" && (
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-6">
              {/* Progress bar */}
              <div className="flex flex-wrap items-center justify-center gap-2" role="list" aria-label="Progress through the word">
                {letters.map((letter, i) => (
                  <div
                    key={i}
                    className={`flex h-12 w-12 items-center justify-center rounded-lg font-display text-lg font-bold transition-all ${
                      i === currentIndex
                        ? "bg-primary text-primary-foreground scale-110 animate-pulse-glow"
                        : letterResults[i] === true
                        ? "bg-success text-success-foreground"
                        : letterResults[i] === false
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                    role="listitem"
                    aria-label={`Letter ${letter}: ${
                      letterResults[i] === true ? "correct" : letterResults[i] === false ? "incorrect" : i === currentIndex ? "current" : "pending"
                    }`}
                  >
                    {letterResults[i] === true ? (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    ) : letterResults[i] === false ? (
                      <XCircle className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      letter
                    )}
                  </div>
                ))}
              </div>

              {/* Current target */}
              {!allCorrect && (
                <div className="text-center" role="status" aria-live="polite">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Sign this letter</p>
                  <span className="font-display text-7xl font-bold text-primary">{letters[currentIndex]}</span>
                </div>
              )}

              {allCorrect && (
                <div className="rounded-2xl border-2 border-success bg-success/10 p-8 text-center" role="alert">
                  <span className="text-5xl" aria-hidden="true">🎉</span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-foreground">You did it!</h2>
                  <p className="mt-2 text-muted-foreground">You spelled "{word}" in ASL!</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  New Word
                </Button>
                {allCorrect && (
                  <Button onClick={() => handleStartTest()} className="gap-2">
                    Practice Again
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <WebcamCapture onCapture={handleCapture} isDetecting={isDetecting} />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Sign the highlighted letter, then capture
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WordPractice;
