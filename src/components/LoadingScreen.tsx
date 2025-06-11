// Komponen loading screen dengan animasi menarik untuk anak-anak
// Menampilkan progress loading saat inisialisasi AR
import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Menyiapkan kamera ajaib...");
  const [currentIcon, setCurrentIcon] = useState("🎪");

  useEffect(() => {
    const loadingSteps = [
      { text: "Menyiapkan kamera ajaib...", icon: "🎪" },
      { text: "Mencari teman-teman hewan...", icon: "🐾" },
      { text: "Membangunkan robot tidur...", icon: "🤖" },
      { text: "Membuka portal ajaib...", icon: "✨" },
      { text: "Semuanya siap! Mari bermain!", icon: "🎉" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        
        // Update text dan icon setiap 20% progress
        if (newProgress >= 20 * (currentStep + 1) && currentStep < loadingSteps.length - 1) {
          currentStep++;
          setLoadingText(loadingSteps[currentStep].text);
          setCurrentIcon(loadingSteps[currentStep].icon);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex flex-col items-center justify-center px-6 text-white relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rotating stars */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute text-yellow-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${15 + Math.random() * 20}px`,
              animation: `spin ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            ⭐
          </div>
        ))}
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce">🎈</div>
        <div className="absolute top-40 right-20 text-3xl animate-pulse">🎭</div>
        <div className="absolute bottom-40 left-16 text-5xl animate-spin">🎨</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-bounce">🎪</div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        
        {/* Animated Main Icon */}
        <div className="text-8xl mb-6 animate-bounce">
          {currentIcon}
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold mb-8 text-yellow-100 animate-pulse">
          {loadingText}
        </h2>

        {/* Progress Bar Container */}
        <div className="w-80 max-w-sm mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-6 overflow-hidden backdrop-blur-sm border-2 border-white/30">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          
          {/* Progress Text */}
          <div className="flex justify-between mt-2 text-sm text-white/80">
            <span>🎮 Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Fun Loading Characters */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0s' }}>🐸</div>
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🦋</div>
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🐝</div>
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>🦄</div>
        </div>

        {/* Tips untuk anak-anak */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 max-w-sm mx-auto border border-white/20">
          <div className="text-2xl mb-2">💡</div>
          <p className="text-sm text-white/90 leading-relaxed">
            <span className="font-bold text-yellow-200">Tips:</span> Pastikan ada cahaya yang cukup 
            dan pegang HP dengan stabil ya! Nanti kita akan bertemu teman-teman lucu! 🌟
          </p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="flex justify-center gap-2 text-2xl">
          <span className="animate-bounce">🎊</span>
          <span className="animate-bounce delay-100">🎉</span>
          <span className="animate-bounce delay-200">🎈</span>
          <span className="animate-bounce delay-300">🎁</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
