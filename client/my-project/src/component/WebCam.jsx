import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";

// Tailwind styles are assumed to be configured in your project.
// This component opens the webcam, captures a photo, lets you retake,
// pause/resume the stream, flip between front/back cameras, download the
// image, and (optionally) upload it to your backend.

export default function WebcamCapture() {
  const webcamRef = useRef(null);

  // UI State
  const [captured, setCaptured] = useState(null); // base64 data URL
  const [isPaused, setIsPaused] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // "user" | "environment"
  const [errorMsg, setErrorMsg] = useState("");
  const [isSecureContext, setIsSecureContext] = useState(true);

  // Video constraints (tweak as needed)
  const videoConstraints = useMemo(
    () => ({
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode,
    }),
    [facingMode]
  );

  // Check secure context (required by some browsers to access camera)
  useEffect(() => {
    try {
      const secure = window.isSecureContext || window.location.hostname === "localhost";
      setIsSecureContext(!!secure);
    } catch (e) {
      setIsSecureContext(true);
    }
  }, []);

  // Clean up media tracks on unmount (defensive; react-webcam also handles this)
  useEffect(() => {
    return () => {
      try {
        const stream = webcamRef.current?.stream;
        stream?.getTracks()?.forEach((t) => t.stop());
      } catch (e) {
        // no-op
      }
    };
  }, []);

  const handleUserMediaError = useCallback((err) => {
    console.error("Webcam error:", err);
    let message = "Unable to access camera.";
    if (err?.name === "NotAllowedError") message = "Camera permission denied.";
    if (err?.name === "NotFoundError") message = "No camera device found.";
    if (err?.name === "NotReadableError") message = "Camera is already in use by another app.";
    setErrorMsg(message);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      setErrorMsg("Could not capture image. Try again.");
      return;
    }
    setCaptured(imageSrc);
    setErrorMsg("");
  }, []);

  const retake = useCallback(() => {
    setCaptured(null);
    setErrorMsg("");
  }, []);

  const togglePause = useCallback(() => {
    if (!webcamRef.current) return;
    try {
      if (isPaused) {
        webcamRef.current?.video?.play?.();
      } else {
        webcamRef.current?.video?.pause?.();
      }
      setIsPaused((p) => !p);
    } catch (e) {
      console.error(e);
    }
  }, [isPaused]);

  const flipCamera = useCallback(() => {
    setFacingMode((m) => (m === "user" ? "environment" : "user"));
  }, []);

  // Convert Base64 data URL to Blob
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  // Download captured image
  const download = useCallback(() => {
    if (!captured) return;
    const blob = dataURLToBlob(captured);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `capture-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [captured]);

  // Example: Upload to backend (replace URL with your endpoint)
  const upload = useCallback(async () => {
    if (!captured) return;
    const blob = dataURLToBlob(captured);
    const formData = new FormData();
    formData.append("file", blob, `capture-${Date.now()}.png`);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      alert("Uploaded successfully!");
    } catch (e) {
      console.error(e);
      alert("Upload failed. Check console.");
    }
  }, [captured]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Webcam Capture — Phase 1</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Grant camera permission, preview the stream, capture a photo, retake, pause/resume, flip camera, download or upload.
          </p>
        </div>

        {!isSecureContext && (
          <div className="mb-3 p-3 rounded-xl bg-yellow-100 border border-yellow-300 text-yellow-900">
            This page is not in a secure context. Use HTTPS or <code>localhost</code> to access the camera.
          </div>
        )}

        {errorMsg && (
          <div className="mb-3 p-3 rounded-xl bg-red-100 border border-red-300 text-red-800">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Live Camera */}
          <div className="rounded-2xl bg-white shadow p-3">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-200">
              {!captured ? (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                  onUserMediaError={handleUserMediaError}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  mirrored={facingMode === "user"}
                  forceScreenshotSourceSize
                />
              ) : (
                <img
                  src={captured}
                  alt="Captured"
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {!captured ? (
                <>
                  <button
                    onClick={capture}
                    className="px-4 py-2 rounded-2xl bg-black text-white hover:opacity-90 shadow"
                  >
                    Capture
                  </button>
                  <button
                    onClick={togglePause}
                    className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 shadow"
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={flipCamera}
                    className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 shadow"
                    title="Switch between front/back cameras on mobile"
                  >
                    Flip Camera
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={retake}
                    className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 shadow"
                  >
                    Retake
                  </button>
                  <button
                    onClick={download}
                    className="px-4 py-2 rounded-2xl bg-black text-white hover:opacity-90 shadow"
                  >
                    Download
                  </button>
                  <button
                    onClick={upload}
                    className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 shadow"
                  >
                    Upload (demo)
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Info & Debug Panel */}
          <div className="rounded-2xl bg-white shadow p-4 space-y-3">
            <h2 className="text-lg font-semibold">Status & Tips</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Use Chrome/Edge/Firefox. iOS Safari requires user interaction to start video.</li>
              <li>On mobile, use <span className="font-mono">Flip Camera</span> to switch front/back.</li>
              <li>Production requires HTTPS (or <span className="font-mono">localhost</span>) for camera access.</li>
              <li>Increase/decrease resolution via <span className="font-mono">videoConstraints</span>.</li>
              <li>Captures are PNG by default. Change via <span className="font-mono">screenshotFormat</span>.</li>
            </ul>

            <div className="text-sm">
              <div className="font-medium">Facing Mode:</div>
              <div className="font-mono">{facingMode}</div>
            </div>

            {captured && (
              <div className="text-sm break-all">
                <div className="font-medium">Captured Data URL (base64):</div>
                <div className="max-h-40 overflow-auto p-2 bg-gray-100 rounded-xl border border-gray-200">
                  {captured}
                </div>
              </div>
            )}

            <div className="text-sm">
              <div className="font-medium">Permissions:</div>
              <PermissionHint />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionHint() {
  const [hint, setHint] = useState("Checking...");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Not all browsers support Permissions API for camera
        if (navigator.permissions && navigator.permissions.query) {
          // @ts-ignore
          const perm = await navigator.permissions.query({ name: "camera" });
          if (!cancelled) setHint(`Camera permission: ${perm.state}`);
        } else {
          if (!cancelled) setHint("Permissions API not supported. If the camera doesn't start, check browser settings.");
        }
      } catch (e) {
        if (!cancelled) setHint("Could not query permissions. If blocked, allow camera in site settings.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <div className="text-gray-700">{hint}</div>;
}
