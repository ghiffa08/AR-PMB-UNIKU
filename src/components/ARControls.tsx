// ARControls.tsx - Komponen kontrol AR untuk switching model dan interaksi
// Mobile-first design dengan touch-friendly controls
import React, { useState } from "react";

interface ARControlsProps {
  currentModel: string;
  onModelChange: (model: string) => void;
  isMarkerDetected: boolean;
}

interface ModelOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const ARControls: React.FC<ARControlsProps> = ({ 
  currentModel, 
  onModelChange, 
  isMarkerDetected 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const modelOptions: ModelOption[] = [
    {
      id: "ikan",
      name: "Ikan Lucu",
      icon: "🐠",
      description: "Ikan berenang di laut",
      color: "from-blue-500 to-teal-500"
    },
    {
      id: "robot",
      name: "Robot HIMA-TI",
      icon: "🤖",
      description: "Robot pintar teknologi",
      color: "from-gray-500 to-blue-600"
    },
    {
      id: "kupu",
      name: "Kupu-kupu",
      icon: "🦋",
      description: "Kupu-kupu cantik terbang",
      color: "from-pink-500 to-purple-500"
    },
    {
      id: "dino",
      name: "Dinosaurus",
      icon: "🦕",
      description: "Dino raksasa zaman dulu",
      color: "from-green-500 to-yellow-500"
    },
    {
      id: "kampus",
      name: "Kampus UNIKU",
      icon: "🏛️",
      description: "Virtual tour kampus",
      color: "from-green-500 to-blue-500"
    },
    {
      id: "prodi",
      name: "HIMA-TI",
      icon: "💻",
      description: "Coding & teknologi",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const currentModelData = modelOptions.find(m => m.id === currentModel);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 p-4">      {/* Main Control Panel dengan design anak-anak */}
      <div className={`bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 backdrop-blur-md rounded-3xl shadow-2xl transition-all duration-300 border-4 border-white/50 ${
        isExpanded ? 'mb-4' : ''
      }`}>
        
        {/* Header dengan current model */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-14 h-14 bg-gradient-to-r ${currentModelData?.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg border-2 border-white animate-bounce`}>
                {currentModelData?.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{currentModelData?.name}</h3>
                <p className="text-xs text-gray-600 font-semibold">{currentModelData?.description}</p>
              </div>
            </div>
            
            {/* Status indicator dengan animasi */}
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full border-2 border-white ${
                isMarkerDetected ? 'bg-green-500 animate-pulse shadow-lg shadow-green-300' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm font-bold text-gray-700">
                {isMarkerDetected ? '🎉 Aktif!' : '🔍 Cari Gambar'}
              </span>
            </div>
          </div>
        </div>

        {/* Model Selector dengan grid yang menarik */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t-2 border-white/50">
            <div className="mt-4 mb-3 text-center">
              <h4 className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2">
                <span>🎮</span>
                <span>Pilih Teman Bermain!</span>
                <span>✨</span>
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {modelOptions.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id);
                    setIsExpanded(false);
                  }}
                  disabled={!isMarkerDetected}
                  className={`p-3 rounded-2xl border-3 transition-all duration-200 transform hover:scale-105 ${
                    currentModel === model.id
                      ? `border-yellow-400 bg-gradient-to-r ${model.color} text-white shadow-xl scale-110 animate-pulse`
                      : 'border-white bg-white hover:border-gray-300 hover:shadow-lg'
                  } ${
                    !isMarkerDetected ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1">{model.icon}</div>
                    <div className={`text-xs font-bold ${
                      currentModel === model.id ? 'text-white' : 'text-gray-700'
                    }`}>
                      {model.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Fun instruction */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600 font-semibold">
                🎯 Tekan tombol untuk ganti teman bermain!
              </p>
            </div>
          </div>
        )}

        {/* Toggle Button dengan design playful */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 border-2 border-white shadow-lg transform hover:scale-105 active:scale-95"
          >
            <span className="text-2xl">
              {isExpanded ? '🔼' : '🎪'}
            </span>
            <span className="text-sm font-bold text-white">
              {isExpanded ? 'Tutup Menu' : 'Ganti Teman!'}
            </span>
            <span className="text-2xl animate-bounce">
              {isExpanded ? '🔼' : '✨'}
            </span>
          </button>
        </div>
      </div>      {/* Quick Action Buttons dengan design fun */}
      <div className="flex justify-center space-x-4 mt-3">
        {/* Screenshot Button */}
        <button 
          className="w-14 h-14 bg-gradient-to-r from-pink-400 to-red-500 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all duration-200 border-2 border-white hover:shadow-xl"
          onClick={() => {
            // TODO: Implement screenshot functionality
            console.log("📸 Foto disimpan!");
            // Show toast notification
          }}
        >
          <span className="text-2xl">📸</span>
        </button>

        {/* Share Button */}
        <button 
          className="w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all duration-200 border-2 border-white hover:shadow-xl"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: '🎪 AR Magic HIMA-TI UNIKU!',
                text: 'Ayo main AR bareng HIMA-TI! Keren banget! 🚀✨',
                url: window.location.href
              });
            }
          }}
        >
          <span className="text-2xl">📤</span>
        </button>

        {/* Help Button */}
        <button 
          className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all duration-200 border-2 border-white hover:shadow-xl"
          onClick={() => {
            alert("🎮 Cara Main AR Magic:\n\n1. 🎯 Cari gambar teman-teman hewan\n2. 📱 Arahkan HP ke gambar\n3. ✨ Lihat keajaiban AR!\n4. 🎪 Ganti-ganti teman bermain\n5. 📸 Foto bareng teman AR!\n\n🌟 Selamat bermain!");
          }}
        >
          <span className="text-2xl">❓</span>
        </button>

        {/* Home Button */}
        <button 
          className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all duration-200 border-2 border-white hover:shadow-xl"
          onClick={() => {
            if (confirm("🏠 Mau kembali ke halaman awal? Teman-teman AR akan menunggu kamu lho! 😊")) {
              window.location.reload();
            }
          }}
        >
          <span className="text-2xl">🏠</span>
        </button>
      </div>

      {/* Performance Monitor (hanya tampil saat debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-3 text-center">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full inline-block">
            Debug: {isMarkerDetected ? '✅ Detected' : '🔍 Scanning'} | Model: {currentModel}
          </div>
        </div>
      )}
    </div>
  );
};

export default ARControls;
