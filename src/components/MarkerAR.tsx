// Komponen utama AR berbasis marker menggunakan MindAR.js
// Modular, mobile-first, dan siap untuk animasi 2D
import React, { useEffect, useRef, useState } from "react";
import AROverlay from "./AROverlay.tsx";
import ARControls from "./ARControls.tsx";

// Marker files untuk setiap model
const MARKER_FILES = {
  ikan: "/markers/ikan.mind",
  kampus: "/markers/kampus.mind",
  prodi: "/markers/prodi.mind",
  galeri: "/markers/ikan.mind", // Fallback ke ikan untuk sekarang
};

const MarkerAR: React.FC = () => {
  const mindarRef = useRef<HTMLDivElement>(null);
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>("ikan");
  const [error, setError] = useState<string>("");
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let mindarInstance: any;
    let started = false;

    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setCameraPermission(true);
        return true;
      } catch (err) {
        setCameraPermission(false);
        setError("Akses kamera diperlukan untuk AR. Silakan izinkan akses kamera.");
        return false;
      }
    };

    const startAR = async () => {
      try {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;        try {
          // Coba gunakan MindAR.js untuk deteksi marker sebenarnya
          const currentMarkerFile = MARKER_FILES[currentModel as keyof typeof MARKER_FILES];
          const { MindARViewer } = await import("mind-ar");
          mindarInstance = new MindARViewer({
            container: mindarRef.current!,
            imageTargetSrc: currentMarkerFile,
            maxTrack: 1,
            uiScanning: false,
            uiLoading: "auto",
          });
          
          mindarInstance.on("targetFound", () => {
            setIsMarkerDetected(true);
          });
          
          mindarInstance.on("targetLost", () => {
            setIsMarkerDetected(false);
          });
          
          await mindarInstance.start();
          started = true;
        } catch (mindARError) {
          console.warn("MindAR not available, using simulation mode:", mindARError);
          
          // Fallback ke simulasi jika MindAR tidak tersedia
          setTimeout(() => {
            console.log("Simulasi: Marker detected");
            setIsMarkerDetected(true);
          }, 3000);
          started = true;
        }
        
        started = true;
      } catch (err) {
        setError("Gagal memulai AR. Pastikan browser mendukung WebRTC dan kamera tersedia.");
        console.error("AR Error:", err);
      }
    };

    startAR();

    return () => {
      if (started && mindarInstance) {
        try {
          mindarInstance.stop();
        } catch (err) {
          console.error("Error stopping AR:", err);
        }
      }    };
  }, [currentModel]); // Tambahkan currentModel sebagai dependency
  const handleModelChange = (model: string) => {
    setCurrentModel(model);
    setIsMarkerDetected(false);
    
    // Restart AR dengan marker baru
    // Trigger useEffect dengan dependency currentModel
  };

  if (cameraPermission === false) {
    return (
      <div className="w-full h-screen bg-red-900 flex flex-col items-center justify-center px-6 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Akses Kamera Diperlukan</h2>
          <p className="text-red-200 mb-4 max-w-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Camera View Container dengan frame menarik */}
      <div ref={mindarRef} className="w-full h-full relative">
        {/* Simulasi camera view dengan border frame lucu */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
          
          {/* Frame Border yang Colorful */}
          <div className="absolute inset-0 border-8 border-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl m-4">
            <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-20 h-20 border-4 border-white rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-yellow-200">🎥 Kamera Ajaib Aktif!</p>
                <p className="text-sm opacity-80">Cari gambar teman-teman untuk bermain! 🎮</p>
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-6 left-6 text-3xl animate-spin-slow">🌟</div>
          <div className="absolute top-6 right-6 text-3xl animate-bounce">🎪</div>
          <div className="absolute bottom-6 left-6 text-3xl animate-pulse">🎨</div>
          <div className="absolute bottom-6 right-6 text-3xl animate-spin-slow">⚡</div>
        </div>
      </div>

      {/* AR Overlay */}
      <AROverlay 
        isVisible={isMarkerDetected} 
        model={currentModel}
      />

      {/* AR Controls */}
      <ARControls 
        currentModel={currentModel}
        onModelChange={handleModelChange}
        isMarkerDetected={isMarkerDetected}
      />

      {/* Scanning Guide dengan desain anak-anak */}
      {!isMarkerDetected && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Scanning Frame */}
            <div className="w-72 h-72 border-4 border-dashed border-yellow-400 rounded-3xl relative animate-pulse bg-yellow-400/10">
              
              {/* Corner Markers */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-lg">📍</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-lg">🔍</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>

              {/* Instructions */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <span className="text-lg mr-2">🎨</span>
                  Arahkan ke gambar teman-teman!
                </div>
              </div>
              
              {/* Inner scanning area */}
              <div className="absolute inset-8 border-2 border-white/50 rounded-2xl bg-white/5 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2 animate-bounce">👀</div>
                  <p className="text-xs font-semibold">Scan Area</p>
                </div>
              </div>

              {/* Scanning line animation */}
              <div className="absolute inset-8 rounded-2xl overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse absolute top-1/2 transform -translate-y-1/2"></div>
              </div>
            </div>

            {/* Fun instructions around the frame */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-2xl animate-bounce">
              👈
            </div>
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-2xl animate-bounce delay-500">
              👉
            </div>
          </div>
        </div>
      )}

      {/* Status Info dengan design yang fun */}
      <div className="absolute bottom-20 left-4 right-4 text-center text-white text-sm z-10">
        {isMarkerDetected ? (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 backdrop-blur-sm rounded-2xl p-3 border-2 border-white/30 shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl animate-bounce">🎉</span>
              <span className="font-bold">Hore! Teman ditemukan!</span>
              <span className="text-2xl animate-bounce delay-300">✨</span>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm rounded-2xl p-3 border-2 border-white/30 shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl animate-spin">🔍</span>
              <span className="font-bold">Mencari teman-teman lucu...</span>
              <span className="text-xl animate-pulse">👀</span>
            </div>
          </div>
        )}
      </div>

      {/* HIMA-TI Credit watermark */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
          <p className="text-xs text-white/80">
            💻 <span className="font-bold text-yellow-200">HIMA-TI UNIKU</span>
          </p>      </div>
      </div>
    </div>
  );
};

export default MarkerAR;
