import React from "react";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center px-6 text-white relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating stars */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute text-yellow-200 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 16}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            ⭐
          </div>
        ))}
        
        {/* Playful shapes */}
        <div className="absolute top-16 left-8 text-3xl animate-bounce">🎈</div>
        <div className="absolute top-32 right-12 text-2xl animate-pulse">🎭</div>
        <div className="absolute bottom-32 left-12 text-4xl animate-spin">🎪</div>
        <div className="absolute bottom-16 right-8 text-3xl animate-bounce">🎨</div>
      </div>

      {/* Header dengan Logo Placeholder */}
      <div className="relative z-10 text-center mb-8">
        {/* Logo container */}
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border-4 border-white/30 mx-auto mb-6 animate-pulse">
          <div className="text-3xl">🎯</div>
        </div>
        
        {/* Main title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-bounce">
          🎪 AR Magic 🌟
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-yellow-200">
          HIMA-TI UNIKU
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md">
        <p className="text-lg mb-6 text-blue-100 font-semibold">
          🚀 Jelajahi Dunia Ajaib dengan Teknologi AR! 
        </p>
        
        {/* Features preview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="text-3xl mb-2 animate-bounce">🐠</div>
            <p className="text-xs text-blue-200 font-bold">Teman Laut</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2 animate-bounce delay-200">🤖</div>
            <p className="text-xs text-blue-200 font-bold">Robot Pintar</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2 animate-bounce delay-400">🦋</div>
            <p className="text-xs text-blue-200 font-bold">Kupu Cantik</p>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-3xl text-xl shadow-2xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-110 active:scale-95 border-4 border-white animate-pulse"
        >
          <span className="flex items-center gap-3">
            <span>🎮</span>
            <span>Mulai Bermain!</span>
            <span>✨</span>
          </span>
        </button>

        {/* Instructions */}
        <div className="mt-6 bg-white/15 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
          <p className="text-sm text-blue-100 leading-relaxed">
            <span className="font-bold text-yellow-200">📋 Cara Main:</span><br/>
            1. 🎯 Cari gambar teman-teman lucu<br/>
            2. 📱 Arahkan HP ke gambar<br/>
            3. ✨ Lihat keajaiban AR!
          </p>
        </div>
      </div>

      {/* Footer Credits */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-2 mx-6">
          <p className="text-xs text-blue-200 font-semibold">
            🎓 Dibuat oleh HIMA-TI UNIKU - Divisi IPTEK
          </p>
          <p className="text-xs text-blue-300">
            PMB Universitas Kuningan 2025 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
