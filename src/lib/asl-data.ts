export interface ASLLetter {
  letter: string;
  description: string;
  image: string;
}

export const ASL_ALPHABET: ASLLetter[] = [
  { letter: "A", description: "Make a fist with thumb resting on the side of the index finger", image: "/asl/A.png" },
  { letter: "B", description: "Hold fingers straight up together, thumb tucked across palm", image: "/asl/B.png" },
  { letter: "C", description: "Curve hand into a C shape, like holding a cup", image: "/asl/C.png" },
  { letter: "D", description: "Touch thumb to middle, ring, and pinky fingers; index points up", image: "/asl/D.png" },
  { letter: "E", description: "Curl all fingers down, thumb tucked over the palm", image: "/asl/E.png" },
  { letter: "F", description: "Touch index finger and thumb together, other fingers spread up", image: "/asl/F.png" },
  { letter: "G", description: "Point index finger sideways, thumb parallel below it", image: "/asl/G.png" },
  { letter: "H", description: "Extend index and middle fingers sideways together", image: "/asl/H.png" },
  { letter: "I", description: "Make a fist with pinky finger extended up", image: "/asl/I.png" },
  { letter: "J", description: "Start with I handshape, trace a J in the air with pinky", image: "/asl/J.png" },
  { letter: "K", description: "Index and middle fingers up in a V, thumb between them", image: "/asl/K.png" },
  { letter: "L", description: "Extend thumb and index finger to form an L shape", image: "/asl/L.png" },
  { letter: "M", description: "Place thumb under first three fingers draped over it", image: "/asl/M.png" },
  { letter: "N", description: "Place thumb under first two fingers draped over it", image: "/asl/N.png" },
  { letter: "O", description: "Curve all fingers and thumb to touch, forming an O", image: "/asl/O.png" },
  { letter: "P", description: "Like K but pointed downward, wrist drops", image: "/asl/P.png" },
  { letter: "Q", description: "Like G but pointed downward", image: "/asl/Q.png" },
  { letter: "R", description: "Cross index and middle fingers, other fingers closed", image: "/asl/R.png" },
  { letter: "S", description: "Make a fist with thumb wrapped over fingers", image: "/asl/S.png" },
  { letter: "T", description: "Place thumb between index and middle fingers in a fist", image: "/asl/T.png" },
  { letter: "U", description: "Hold index and middle fingers up together, others closed", image: "/asl/U.png" },
  { letter: "V", description: "Hold index and middle fingers up in a V, others closed", image: "/asl/V.png" },
  { letter: "W", description: "Hold index, middle, and ring fingers up spread apart", image: "/asl/W.png" },
  { letter: "X", description: "Make a fist, then hook index finger like a claw", image: "/asl/X.png" },
  { letter: "Y", description: "Extend thumb and pinky, other fingers closed", image: "/asl/Y.png" },
  { letter: "Z", description: "Point index finger and trace a Z in the air", image: "/asl/Z.png" },
];

export function getRandomLetter(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

export function getLetterData(letter: string): ASLLetter | undefined {
  return ASL_ALPHABET.find(l => l.letter === letter.toUpperCase());
}