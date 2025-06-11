// AROverlay.tsx - Komponen overlay AR untuk animasi 2D
// Menampilkan animasi ikan berenang dan konten interaktif lainnya
import React, { useEffect, useState } from "react";

interface AROverlayProps {
  isVisible: boolean;
  model: string;
}

interface Fish {
  id: number;
  x: number;
  y: number;
  direction: number;
  speed: number;
  size: number;
}

const AROverlay: React.FC<AROverlayProps> = ({ isVisible, model }) => {
  const [fish, setFish] = useState<Fish[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  // Inisialisasi ikan untuk animasi
  useEffect(() => {
    if (isVisible && model === "ikan") {
      const initialFish: Fish[] = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 200 + 100,
        direction: Math.random() * 360,
        speed: 1 + Math.random() * 2,
        size: 0.8 + Math.random() * 0.4,
      }));
      setFish(initialFish);
    }
  }, [isVisible, model]);

  // Animasi ikan berenang
  useEffect(() => {
    if (!isVisible || model !== "ikan") return;

    const animationInterval = setInterval(() => {
      setFish(prevFish => 
        prevFish.map(f => {
          let newX = f.x + Math.cos(f.direction) * f.speed;
          let newY = f.y + Math.sin(f.direction) * f.speed;
          let newDirection = f.direction;

          // Bounce off edges
          if (newX < 0 || newX > 350) {
            newDirection = Math.PI - f.direction;
            newX = Math.max(0, Math.min(350, newX));
          }
          if (newY < 50 || newY > 300) {
            newDirection = -f.direction;
            newY = Math.max(50, Math.min(300, newY));
          }

          return {
            ...f,
            x: newX,
            y: newY,
            direction: newDirection,
          };
        })
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, [isVisible, model]);

  if (!isVisible) return null;
  const renderModel = () => {
    switch (model) {
      case "ikan":
        return (
          <div className="relative w-full h-full">
            {/* Background aquarium effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 to-blue-600/50 rounded-3xl backdrop-blur-sm border-4 border-white/20">
              {/* Coral dan tanaman laut */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-400/30 to-transparent rounded-b-3xl"></div>
              
              {/* Gelembung air yang lebih banyak */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute bg-white/60 rounded-full animate-bounce"
                  style={{
                    width: `${4 + Math.random() * 8}px`,
                    height: `${4 + Math.random() * 8}px`,
                    left: `${10 + i * 10}%`,
                    bottom: `${10 + Math.random() * 30}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                ></div>
              ))}
              
              {/* Ikan berenang */}
              {fish.map((f) => (
                <div
                  key={f.id}
                  className="absolute transition-all duration-100 ease-linear"
                  style={{
                    left: `${f.x}px`,
                    top: `${f.y}px`,
                    transform: `scale(${f.size}) rotate(${f.direction}rad)`,
                  }}
                >
                  <div className="w-10 h-8 relative">
                    {/* Badan ikan lebih colorful */}
                    <div className={`w-8 h-6 bg-gradient-to-r rounded-full ${
                      f.id % 3 === 0 ? 'from-orange-400 to-red-500' :
                      f.id % 3 === 1 ? 'from-yellow-400 to-orange-500' :
                      'from-pink-400 to-purple-500'
                    }`}></div>
                    {/* Ekor ikan */}
                    <div className={`absolute -right-2 top-1 w-4 h-3 bg-gradient-to-l rounded-full transform rotate-45 ${
                      f.id % 3 === 0 ? 'from-orange-300 to-orange-500' :
                      f.id % 3 === 1 ? 'from-yellow-300 to-yellow-500' :
                      'from-pink-300 to-pink-500'
                    }`}></div>
                    {/* Mata ikan */}
                    <div className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full">
                      <div className="w-1 h-1 bg-black rounded-full mt-0.5 ml-0.5"></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Info panel */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center gap-2">
                    🐠 <span>Dunia Bawah Laut</span> 🌊
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Wah! Lihat ikan-ikan lucu berenang! Tahukah kamu, ikan punya 
                    berbagai warna yang cantik untuk berkomunikasi dengan temannya! 🎨
                  </p>
                  <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                      🐟 Edukatif
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      🌊 Biologi Laut
                    </span>
                  </div>
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {showInfo ? "Tutup Info 📖" : "Pelajari Lebih! 🤓"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "robot":
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/30 to-blue-500/40 rounded-3xl backdrop-blur-sm border-4 border-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Robot body dengan animasi */}
                  <div className="w-32 h-40 bg-gradient-to-b from-gray-300 to-gray-600 rounded-lg relative border-4 border-white animate-pulse">
                    {/* Robot head */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-gray-200 to-gray-500 rounded-lg border-2 border-white">
                      {/* Eyes */}
                      <div className="flex justify-center gap-2 mt-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-500"></div>
                      </div>
                      {/* Mouth */}
                      <div className="w-8 h-2 bg-yellow-400 rounded-full mx-auto mt-2 animate-bounce"></div>
                    </div>
                    
                    {/* Chest panel */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-blue-400/30 rounded-lg border border-blue-300">
                      {/* Buttons */}
                      {Array.from({ length: 6 }, (_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full absolute animate-pulse"
                          style={{
                            left: `${5 + (i % 2) * 25}px`,
                            top: `${5 + Math.floor(i / 2) * 15}px`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Arms */}
                    <div className="absolute -left-6 top-8 w-4 h-16 bg-gray-400 rounded-lg animate-bounce"></div>
                    <div className="absolute -right-6 top-8 w-4 h-16 bg-gray-400 rounded-lg animate-bounce delay-500"></div>
                    
                    {/* Legs */}
                    <div className="absolute -bottom-8 left-6 w-6 h-12 bg-gray-500 rounded-lg"></div>
                    <div className="absolute -bottom-8 right-6 w-6 h-12 bg-gray-500 rounded-lg"></div>
                  </div>
                  
                  {/* Sparks and effects */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute text-yellow-400 text-xl animate-ping"
                      style={{
                        left: `${Math.random() * 150}px`,
                        top: `${Math.random() * 120}px`,
                        animationDelay: `${i * 0.4}s`,
                      }}
                    >
                      ⚡
                    </div>
                  ))}
                  
                  {/* Info panel robot */}
                  <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-80">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-gray-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        🤖 <span>Robot Pintar HIMA-TI</span> ⚡
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Halo! Aku robot yang dibuat kakak-kakak Teknik Informatika! 
                        Aku bisa membantu belajar coding dan teknologi! 💻✨
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                          🔬 Teknologi
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold">
                          💻 Programming
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                          🚀 AI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "kupu":
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-500/40 rounded-3xl backdrop-blur-sm border-4 border-white/20">
              {/* Garden background */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-green-400/40 to-transparent rounded-b-3xl"></div>
              
              {/* Flowers */}
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="absolute bottom-4 text-3xl animate-bounce"
                  style={{
                    left: `${10 + i * 15}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {['🌸', '🌺', '🌻', '🌷', '🌹', '🌼'][i]}
                </div>
              ))}
              
              {/* Flying butterflies */}
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-4xl animate-bounce"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                >
                  {['🦋', '🦋', '🦋', '🦋'][i]}
                </div>
              ))}
                {/* Main butterfly in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl animate-pulse">🦋</div>
              </div>
              
              {/* Sparkles */}
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute text-yellow-400 text-xl animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  ✨
                </div>
              ))}

              {/* Info panel kupu-kupu */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-pink-200">
                  <h3 className="text-lg font-bold text-pink-800 mb-2 flex items-center gap-2">
                    🦋 <span>Kupu-kupu Cantik</span> 🌸
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Lihat kupu-kupu yang cantik! Mereka suka hinggap di bunga-bunga 
                    untuk mencari nektar. Sayapnya berwarna-warni untuk melindungi diri! 🌈
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-bold">
                      🌺 Alam
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold">
                      🦋 Serangga
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );      case "kampus":
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-blue-500/40 rounded-3xl backdrop-blur-sm border-4 border-white/20">
              {/* Campus environment */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Main building dengan desain lebih menarik */}
                  <div className="w-40 h-48 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg relative border-4 border-white shadow-2xl">
                    
                    {/* UNIKU Logo di atas gedung */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-white animate-pulse">
                      UK
                    </div>
                    
                    {/* Jendela-jendela dengan cahaya */}
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-4 bg-yellow-300 rounded-sm animate-pulse border border-white"
                        style={{
                          left: `${12 + (i % 4) * 24}px`,
                          top: `${16 + Math.floor(i / 4) * 20}px`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      ></div>
                    ))}
                    
                    {/* Pintu masuk */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-brown-600 rounded-t-lg border-2 border-white">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-2 animate-pulse"></div>
                    </div>
                    
                    {/* Bendera Indonesia */}
                    <div className="absolute -top-2 left-2 w-1 h-8 bg-gray-600"></div>
                    <div className="absolute -top-2 left-3 w-4 h-2 bg-red-500"></div>
                    <div className="absolute -top-2 left-3 w-4 h-2 bg-white mt-2"></div>
                  </div>
                  
                  {/* Trees around campus */}
                  <div className="absolute -left-8 bottom-0 text-4xl animate-sway">🌳</div>
                  <div className="absolute -right-8 bottom-0 text-4xl animate-sway delay-500">🌳</div>
                  <div className="absolute -left-12 bottom-0 text-3xl animate-sway delay-1000">🌲</div>
                  
                  {/* Students */}
                  <div className="absolute -bottom-4 -left-4 text-2xl animate-bounce">🧑‍🎓</div>
                  <div className="absolute -bottom-4 -right-4 text-2xl animate-bounce delay-500">👩‍🎓</div>
                  
                  {/* Info panel kampus */}
                  <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-80">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-green-200">
                      <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                        🏛️ <span>Universitas Kuningan</span> 🎓
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Selamat datang di kampus kita! Di sini kakak-kakak HIMA-TI 
                        belajar membuat program komputer dan teknologi keren! 💻🚀
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                          🏫 #UNIKU
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                          🎓 #PMB2025
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-bold">
                          💻 #HIMATI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "prodi":
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-500/40 rounded-3xl backdrop-blur-sm border-4 border-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Animated code editor */}
                  <div className="relative w-72 h-52 bg-gray-900 rounded-lg p-4 font-mono text-green-400 text-sm overflow-hidden border-4 border-white shadow-2xl">
                    
                    {/* Code editor header */}
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Animated typing code */}
                    <div className="animate-pulse">
                      <div className="mb-2 text-blue-400">// HIMA-TI UNIKU 💻</div>
                      <div className="text-yellow-400 mb-1">function buatMasaDepan() {`{`}</div>
                      <div className="ml-4 mb-1 text-pink-400">const kreativitas = "∞";</div>
                      <div className="ml-4 mb-1 text-cyan-400">const logika = "💯";</div>
                      <div className="ml-4 mb-1 text-green-400">const semangat = "🔥";</div>
                      <div className="ml-4 mb-1">return teknologi + inovasi;</div>
                      <div className="text-yellow-400">{`}`}</div>
                      <div className="mt-2 text-pink-400">console.log("Ayo join HIMA-TI! 🚀");</div>
                    </div>
                    
                    {/* Floating code particles */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute text-xs animate-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          color: ['#60A5FA', '#F87171', '#34D399', '#FBBF24', '#A78BFA'][i % 5],
                          animationDelay: `${i * 0.3}s`,
                        }}
                      >
                        {['{ }', '< />', '===', '++', 'if', 'for', 'AI', 'ML', 'AR', 'VR', '🚀', '💡'][i]}
                      </div>
                    ))}
                  </div>
                  
                  {/* HIMA-TI mascot area */}
                  <div className="mt-4 flex justify-center gap-4">
                    <div className="text-4xl animate-bounce">💻</div>
                    <div className="text-4xl animate-bounce delay-200">🤖</div>
                    <div className="text-4xl animate-bounce delay-400">🚀</div>
                  </div>
                  
                  {/* Info panel prodi */}
                  <div className="mt-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg max-w-sm border-2 border-purple-200">
                    <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
                      💻 <span>HIMA-TI UNIKU</span> ⚡
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Himpunan Mahasiswa Teknik Informatika! Kami belajar coding, 
                      AI, robotik, dan teknologi keren lainnya! Yuk gabung! 🌟
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-purple-100 text-purple-800 p-2 rounded-lg text-center font-bold">
                        🐍 Python
                      </div>
                      <div className="bg-blue-100 text-blue-800 p-2 rounded-lg text-center font-bold">
                        🌐 Web Dev
                      </div>
                      <div className="bg-green-100 text-green-800 p-2 rounded-lg text-center font-bold">
                        📱 Mobile
                      </div>
                      <div className="bg-orange-100 text-orange-800 p-2 rounded-lg text-center font-bold">
                        🤖 AI/ML
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        🎯 Divisi IPTEK - AR PMB 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "dino":
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-yellow-500/40 rounded-3xl backdrop-blur-sm border-4 border-white/20">
              {/* Prehistoric environment */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-600/40 to-transparent rounded-b-3xl"></div>
                {/* Volcano in background */}
              <div className="absolute top-10 right-10 w-16 h-20 bg-gradient-to-t from-gray-600 to-gray-400">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-orange-500 text-xs animate-bounce">🔥</div>
              </div>
              
              {/* Trees */}
              <div className="absolute bottom-8 left-8 text-4xl animate-sway">🌴</div>
              <div className="absolute bottom-8 right-8 text-4xl animate-sway delay-500">🌿</div>
              
              {/* Main Dinosaur */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="text-8xl animate-bounce">🦕</div>
                  {/* Footprints */}
                  <div className="absolute -bottom-8 -left-4 text-2xl animate-pulse">🐾</div>
                  <div className="absolute -bottom-8 left-8 text-2xl animate-pulse delay-500">🐾</div>
                </div>
              </div>
              
              {/* Flying pterodactyl */}
              <div className="absolute top-20 left-16 text-3xl animate-bounce">🦅</div>
              
              {/* Info panel dinosaur */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-green-200">
                  <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                    🦕 <span>Dinosaurus Raksasa</span> 🌿
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Wow! Dinosaurus hidup jutaan tahun lalu! Mereka ada yang makan 
                    tumbuhan seperti ini, ada juga yang makan daging! 🍃🦴
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      🦕 Paleontologi
                    </span>
                    <span className="bg-brown-100 text-brown-800 px-2 py-1 rounded-full text-xs font-bold">
                      🌍 Sejarah Bumi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-gray-500/30 rounded-3xl backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-lg font-semibold">Model AR</p>
              <p className="text-sm opacity-80">Karya mahasiswa DKV</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md h-96 relative pointer-events-auto">
          {renderModel()}
        </div>
      </div>

      {/* Detail info modal */}
      {showInfo && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto z-30">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Detail Karya</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Judul:</h3>
                <p>Ekosistem Digital Laut Indonesia</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Pembuat:</h3>
                <p>Mahasiswa DKV Universitas Kuningan</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Teknologi:</h3>
                <p>React, TypeScript, MindAR.js, CSS Animations</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Deskripsi:</h3>
                <p>
                  Karya ini merepresentasikan keanekaragaman hayati laut Indonesia 
                  dalam bentuk animasi interaktif. Setiap ikan memiliki pola pergerakan 
                  yang unik, menciptakan ekosistem digital yang hidup dan dinamis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AROverlay;
