import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useCameraStore } from '../store/cameraStore';
import Button from '../components/ui/button';
import { Camera, CameraOff, Sparkles, RefreshCw, AlertTriangle, ShieldCheck, Sun, Grid as GridIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CameraPage = () => {
  const webcamRef = useRef(null);
  const [deviceError, setDeviceError] = useState(false);
  const {
    isStreaming,
    capturedImage,
    isAnalyzing,
    analysisResult,
    startStreaming,
    stopStreaming,
    setCapturedImage,
    clearCaptured,
    runAnalysis
  } = useCameraStore();

  // Simulated real-time detection loops when camera is streaming
  const [liveDetections, setLiveDetections] = useState([]);
  const [liveLighting, setLiveLighting] = useState(180); // in Lux

  useEffect(() => {
    let timer;
    if (isStreaming && !capturedImage) {
      timer = setInterval(() => {
        // Mock jittery computer vision coordinates
        setLiveLighting(Math.floor(220 + Math.random() * 40));
        setLiveDetections([
          { label: 'Sofa Sectional', confidence: '94%', top: 38 + Math.random() * 2, left: 15 + Math.random() * 2, width: 45, height: 35 },
          { label: 'Coffee Table', confidence: '89%', top: 62 + Math.random() * 1, left: 38 + Math.random() * 1, width: 25, height: 18 }
        ]);
      }, 800);
    } else {
      setLiveDetections([]);
    }
    return () => clearInterval(timer);
  }, [isStreaming, capturedImage]);

  const handleCapture = () => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          setCapturedImage(imageSrc);
          runAnalysis();
        }
      } catch (err) {
        console.error("Capture failed:", err);
      }
    }
  };

  const handleUserMediaError = (err) => {
    console.warn("Webcam access error:", err);
    setDeviceError(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Camera size={18} className="text-primary" />
          <span>Live Room Scanner</span>
        </h2>
        <p className="text-xs text-muted">Run real-time spatial diagnostics and catalog furniture checks using camera feed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Panel: Camera Stream Container */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden glass-panel border border-border bg-background flex items-center justify-center">
            
            {/* 1. Camera streaming state */}
            {isStreaming && !capturedImage && !deviceError && (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  onUserMediaError={handleUserMediaError}
                  className="w-full h-full object-cover rounded-xl"
                  videoConstraints={{ facingMode: "environment" }}
                />

                {/* Laser scan line overlay */}
                <div className="absolute inset-x-0 h-0.5 scan-radar z-10 pointer-events-none" />
                
                {/* HUD Camera Grid Overlay */}
                <div className="absolute inset-0 border border-border grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                  <div className="border-r border-b border-border" />
                  <div className="border-r border-b border-border" />
                  <div className="border-b border-border" />
                  <div className="border-r border-b border-border" />
                  <div className="border-r border-b border-border" />
                  <div className="border-b border-border" />
                </div>

                {/* Simulated Computer Vision Bounding Boxes */}
                {liveDetections.map((box, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute border border-primary/60 bg-zinc-800 text-primary text-[9px] font-bold p-1 rounded backdrop-blur-xs flex flex-col pointer-events-none"
                    style={{
                      top: `${box.top}%`,
                      left: `${box.left}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`
                    }}
                  >
                    <span>{box.label} ({box.confidence})</span>
                  </motion.div>
                ))}

                {/* Floating telemetry metrics */}
                <div className="absolute top-4 left-4 bg-surface/85 border border-border rounded-lg px-2.5 py-1.5 flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                  <Sun size={12} className="text-amber-400 animate-pulse" />
                  <span>Ambient: {liveLighting} Lux</span>
                </div>
              </>
            )}

            {/* 2. Captured Snapshot preview */}
            {capturedImage && (
              <img src={capturedImage} alt="Snapshot" className="w-full h-full object-cover filter brightness-90" />
            )}

            {/* 3. Camera disabled / standby state */}
            {(!isStreaming || deviceError) && (
              <div className="flex flex-col items-center justify-center p-8 space-y-3 text-center">
                <div className="p-4 rounded-full bg-surface border border-border text-muted">
                  <CameraOff size={28} />
                </div>
                <h4 className="text-sm font-bold text-white">Camera Feed Offline</h4>
                {deviceError ? (
                  <p className="text-xs text-red-500 max-w-xs leading-relaxed">
                    Camera hardware permission was rejected or is unavailable. Please check browser privacy options.
                  </p>
                ) : (
                  <p className="text-xs text-muted max-w-xs leading-relaxed">
                    Activate the stream using the buttons below to initialize real-time room scans.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Camera Stream Control Buttons */}
          <div className="flex justify-between items-center bg-background/40 border border-border p-4 rounded-xl">
            <div className="flex gap-2">
              {!isStreaming ? (
                <Button variant="primary" size="sm" onClick={startStreaming} icon={<Camera size={14} />}>
                  Start Scanner
                </Button>
              ) : (
                <Button variant="secondary" size="sm" onClick={stopStreaming}>
                  Stop Scanner
                </Button>
              )}
            </div>

            {isStreaming && !capturedImage && (
              <Button variant="primary" size="sm" onClick={handleCapture}>
                Analyze Frame
              </Button>
            )}

            {capturedImage && (
              <Button variant="glass" size="sm" onClick={clearCaptured}>
                Retake Frame
              </Button>
            )}
          </div>
        </div>

        {/* Right Panel: AI Scanner Diagnostics Analysis */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Scanner Telemetry</h3>

          <AnimatePresence mode="wait">
            
            {/* 1. Live Streaming Standby */}
            {isStreaming && !capturedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-5 rounded-xl space-y-4 h-[350px] flex flex-col justify-center items-center text-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Streaming Live Diagnostics</h4>
                <p className="text-[11px] text-muted max-w-xs leading-relaxed">
                  Position your camera frame to encompass seating areas and tables. Real-time bounding logic will frame items.
                </p>
              </motion.div>
            )}

            {/* 2. Scanning Processing */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-5 rounded-xl space-y-3 h-[350px] flex flex-col justify-center items-center text-center border border-border shadow-glow"
              >
                <RefreshCw size={24} className="text-primary animate-spin" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Running AI Core Scans</h4>
                <p className="text-[11px] text-muted">Estimating clearances, Lux indexes, and spatial density weights.</p>
              </motion.div>
            )}

            {/* 3. Empty Offline state */}
            {!isStreaming && !capturedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel p-5 rounded-xl space-y-2 h-[350px] flex flex-col justify-center items-center text-center border border-border text-muted"
              >
                <GridIcon size={24} />
                <h4 className="text-xs font-bold uppercase tracking-wider">Telemetry Offline</h4>
                <p className="text-[11px] text-muted">Enable room camera scanner to begin.</p>
              </motion.div>
            )}

            {/* 4. Scanner results summary */}
            {!isAnalyzing && analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="glass-panel p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Analysis summary</span>
                    <span className="text-[10px] text-muted font-bold bg-background px-2 py-0.5 border border-border rounded-md">
                      Detected: {analysisResult.roomType}
                    </span>
                  </div>

                  {/* Score indicators */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Lighting Lux Rating</span>
                      <strong className="text-white">{analysisResult.lightingScore} Lux ({analysisResult.lightingQuality})</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Space Utilization</span>
                      <strong className="text-white">{analysisResult.spaceUtilization}%</strong>
                    </div>
                  </div>
                </div>

                {/* Warnings card */}
                {analysisResult.warnings.length > 0 && (
                  <div className="glass-panel p-5 rounded-xl border border-red-500/10 bg-red-500/5 space-y-2">
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle size={15} />
                      <h4 className="text-xs font-bold uppercase tracking-wider">Spacing Alerts</h4>
                    </div>
                    {analysisResult.warnings.map((warn) => (
                      <p key={warn.id} className="text-xs text-text leading-relaxed pl-1.5 border-l border-red-500/40">
                        {warn.message}
                      </p>
                    ))}
                  </div>
                )}

                {/* AI Recommendations checklist */}
                <div className="glass-panel p-5 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles size={15} />
                    <h4 className="text-xs font-bold uppercase tracking-wider">AI Suggestions Feed</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((sug, idx) => (
                      <li key={idx} className="text-xs text-muted pl-4 list-disc leading-relaxed">
                        {sug}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CameraPage;
