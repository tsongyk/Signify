import { useState, useCallback } from "react";
import { RefreshCw, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import WebcamCapture from "@/components/WebcamCapture";
import ASLLetterCard from "@/components/ASLLetterCard";
import { getRandomLetter, getLetterData } from "@/lib/asl-data";
import { supabase } from "@/integrations/supabase/client";

const AlphabetQuiz = () => {
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<{ correct: boolean; detected: string } | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const handleNextLetter = () => {
    setCurrentLetter(getRandomLetter());
    setResult(null);
    setShowHint(false);
  };

  const handleCapture = useCallback(async (imageData: string) => {
    if (isDetecting) return;
    setIsDetecting(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("detect-sign", {
        body: { image: imageData, expectedLetter: currentLetter },
      });

      if (error) throw error;

      const detected = data?.detectedLetter?.toUpperCase() || "?";
      const correct = detected === currentLetter;

      setResult({ correct, detected });
      setScore(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1,
      }));

      if (correct) {
        toast.success(`Correct! That's the letter ${currentLetter}!`);
      } else {
        toast.error(`Detected "${detected}" — try again for "${currentLetter}"`);
      }
    } catch (e) {
      console.error("Detection error:", e);
      toast.error("Detection failed. Please try again.");
    } finally {
      setIsDetecting(false);
    }
  }, [isDetecting, currentLetter]);

  const letterData = getLetterData(currentLetter);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Alphabet Quiz</h1>
          <p className="mt-2 text-muted-foreground">Sign the letter shown below in front of your camera</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Prompt side */}
          <div className="flex flex-col items-center gap-6">
            <div
              className="flex flex-col items-center gap-2 rounded-2xl border-2 border-primary bg-primary/5 p-8"
              role="status"
              aria-live="polite"
              aria-label={`Sign the letter ${currentLetter}`}
            >
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sign this letter</p>
              <span className="font-display text-8xl font-bold text-primary">{currentLetter}</span>
            </div>

            {/* Result feedback */}
            {result && (
              <div
                className={`flex items-center gap-3 rounded-xl border-2 p-4 ${
                  result.correct
                    ? "border-success bg-success/10 text-success"
                    : "border-destructive bg-destructive/10 text-destructive"
                }`}
                role="alert"
                aria-live="assertive"
              >
                {result.correct ? (
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <XCircle className="h-6 w-6" aria-hidden="true" />
                )}
                <span className="font-medium">
                  {result.correct
                    ? "Correct! Great signing!"
                    : `Detected "${result.detected}" — expected "${currentLetter}"`}
                </span>
              </div>
            )}

            {/* Hint */}
            <Button variant="ghost" onClick={() => setShowHint(!showHint)} className="gap-2 text-muted-foreground">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            {showHint && letterData && (
              <ASLLetterCard letter={currentLetter} size="lg" />
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button onClick={handleNextLetter} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Next Letter
              </Button>
              <div className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground" aria-label={`Score: ${score.correct} correct out of ${score.total}`}>
                Score: {score.correct}/{score.total}
              </div>
            </div>
          </div>

          {/* Webcam side */}
          <div className="flex flex-col items-center">
            <WebcamCapture onCapture={handleCapture} isDetecting={isDetecting} />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Position your hand clearly in frame, then click "Capture & Detect"
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlphabetQuiz;
