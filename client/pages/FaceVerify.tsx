import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Camera, User, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Gender = "male" | "female" | "other" | "";

export default function FaceVerify() {
  const navigate = useNavigate();
  const { user, verifyFace } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError("");
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );

        // Simulate face detection
        setTimeout(() => {
          setFaceDetected(true);
        }, 500);

        setCapturedImage(canvasRef.current.toDataURL("image/jpeg"));
        stopCamera();
      }
    }
  };

  // Simulate face detection and gender recognition
  const detectFaceAndGender = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    setError("");

    try {
      // Simulate face recognition processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate gender detection (randomly choose if not manually selected)
      const detectedGender = selectedGender || (Math.random() > 0.5 ? "male" : "female");

      // Simulate face verification
      await verifyFace(detectedGender, capturedImage);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate("/discover");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Face verification failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-pink-950 flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-colors z-10"
        title="Go back"
      >
        <ArrowLeft className="w-6 h-6 text-foreground" />
      </button>

      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <Heart className="w-8 h-8 fill-primary" />
            MatchUp
          </div>
          <h1 className="text-3xl font-bold text-foreground">Face Verification</h1>
          <p className="text-muted-foreground">
            Verify your identity to ensure a safe dating experience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground">Step 1: Take Your Photo</h2>

            {!capturedImage ? (
              <div className="space-y-4">
                {cameraActive ? (
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-xl border-4 border-primary/20">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-2 border-dashed border-primary/30 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <User className="w-12 h-12 text-white/50 mx-auto" />
                        <p className="text-sm text-white/70">Position your face in the frame</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="text-center space-y-3">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Camera not active</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {!cameraActive ? (
                    <button
                      onClick={startCamera}
                      className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
                    >
                      Start Camera
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={capturePhoto}
                        className="flex-1 px-6 py-3 bg-success hover:bg-success/90 text-white font-semibold rounded-xl transition-colors"
                      >
                        Capture Photo
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-video shadow-xl border-4 border-success/20">
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCapturedImage(null);
                      setFaceDetected(false);
                      startCamera();
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Retake
                  </button>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground">Step 2: Confirm Details</h2>

            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              {/* User Info */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-slate-700 text-foreground opacity-60 cursor-not-allowed"
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "male" as Gender, label: "Male" },
                    { value: "female" as Gender, label: "Female" },
                    { value: "other" as Gender, label: "Other" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedGender(option.value)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all border-2 ${
                        selectedGender === option.value
                          ? "bg-primary border-primary text-white"
                          : "border-gray-300 dark:border-gray-600 text-foreground hover:border-primary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Face Detection Status */}
              {capturedImage && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    faceDetected
                      ? "bg-success/10 border border-success/20 text-success"
                      : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300"
                  }`}
                >
                  {faceDetected ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-sm">
                    {faceDetected ? (
                      <>
                        <p className="font-semibold">Face detected! ✓</p>
                        <p>Your face has been recognized successfully.</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">Analyzing photo...</p>
                        <p>Please wait while we verify your face.</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-success flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Verification successful!</p>
                    <p>Redirecting to discover...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Verify Button */}
            {capturedImage && (
              <button
                onClick={detectFaceAndGender}
                disabled={isProcessing || !selectedGender || !faceDetected}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                {isProcessing ? "Verifying Face..." : "Verify & Continue"}
              </button>
            )}

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-900 dark:text-blue-300 space-y-2">
              <p className="font-semibold">Tips for best results:</p>
              <ul className="space-y-1 text-xs">
                <li>✓ Good lighting from the front</li>
                <li>✓ Clear view of your face</li>
                <li>✓ No glasses or heavy makeup</li>
                <li>✓ Neutral expression</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
