import { getLetterData } from "@/lib/asl-data";

interface ASLLetterCardProps {
  letter: string;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
  isActive?: boolean;
  isCorrect?: boolean | null;
}

const ASLLetterCard = ({ letter, size = "md", showDescription = true, isActive = false, isCorrect = null }: ASLLetterCardProps) => {
  const data = getLetterData(letter);
  if (!data) return null;

  const sizeClasses = {
    sm: "p-3 text-center",
    md: "p-4",
    lg: "p-6",
  };

  const letterSizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  const emojiSizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  let borderClass = "border-border";
  if (isCorrect === true) borderClass = "border-success bg-success/10";
  else if (isCorrect === false) borderClass = "border-destructive bg-destructive/10";
  else if (isActive) borderClass = "border-primary bg-primary/5";

  return (
    <div
      className={`rounded-xl border-2 bg-card transition-all ${borderClass} ${sizeClasses[size]}`}
      role="figure"
      aria-label={`ASL sign for letter ${data.letter}: ${data.description}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className={`font-display font-bold text-foreground ${letterSizeClasses[size]}`} aria-hidden="true">
            {data.letter}
          </span>
          <img
            src={data.image}
            alt={`ASL sign for ${data.letter}`}
            className={{
              sm: "w-10 h-10",
              md: "w-16 h-16",
              lg: "w-24 h-24",
            }[size]}
          />
        </div>
        {showDescription && size !== "sm" && (
          <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ASLLetterCard;
