import { useRef, useCallback, useEffect, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void;
  isDetecting: boolean;
  autoCapture?: boolean;
  autoCaptureInterval?: number;
}

const WebcamCapture = ({ onCapture, isDetecting, autoCapture = false, autoCaptureInterval = 2000 }: WebcamCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch {
      setError("Unable to access camera. Please grant camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(t => t.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
    onCapture(dataUrl);
  }, [isStreaming, onCapture]);

  useEffect(() => {
    if (autoCapture && isStreaming && !isDetecting) {
      intervalRef.current = setInterval(captureFrame, autoCaptureInterval);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [autoCapture, isStreaming, isDetecting, captureFrame, autoCaptureInterval]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`relative overflow-hidden rounded-xl border-2 bg-foreground/5 ${
          isDetecting ? "border-accent animate-pulse-glow" : "border-border"
        }`}
        style={{ width: "100%", maxWidth: 480, aspectRatio: "4/3" }}
        role="img"
        aria-label={isStreaming ? "Live webcam feed showing your hand signs" : "Webcam preview area"}
      >
        {!isStreaming && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Camera className="h-12 w-12" aria-hidden="true" />
            <p className="text-sm font-medium">Camera is off</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-destructive" role="alert">
            <CameraOff className="h-12 w-12" aria-hidden="true" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`h-full w-full object-cover ${isStreaming ? "block" : "hidden"}`}
          style={{ transform: "scaleX(-1)" }}
        />
        {isDetecting && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            <span className="h-2 w-2 animate-bounce-subtle rounded-full bg-accent-foreground" aria-hidden="true" />
            Analyzing...
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      <div className="flex gap-2">
        {!isStreaming ? (
          <Button onClick={startCamera} className="gap-2">
            <Camera className="h-4 w-4" aria-hidden="true" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={stopCamera} className="gap-2">
              <CameraOff className="h-4 w-4" aria-hidden="true" />
              Stop Camera
            </Button>
            {!autoCapture && (
              <Button onClick={captureFrame} disabled={isDetecting} className="gap-2">
                Capture & Detect
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
