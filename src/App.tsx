import { useState } from 'react'
import './App.css'
import MarkerAR from "./components/MarkerAR.tsx"
import LoadingScreen from "./components/LoadingScreen.tsx"
import IntroScreen from "./components/IntroScreen.tsx"

function App() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'loading' | 'ar'>('intro');

  const handleStartAR = () => {
    setCurrentScreen('loading');
    // Simulasi loading
    setTimeout(() => {
      setCurrentScreen('ar');
    }, 2000);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentScreen === 'intro' && <IntroScreen onStart={handleStartAR} />}
      {currentScreen === 'loading' && <LoadingScreen />}
      {currentScreen === 'ar' && <MarkerAR />}
    </div>
  );
}

export default App
