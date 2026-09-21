"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { IconX, IconClockPlay, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

interface Step {
  order: number;
  instruction: string;
  timerMinutes?: number;
}

interface CookModeProps {
  recipeTitle: string;
  steps: Step[];
}

export function CookMode({ recipeTitle, steps }: CookModeProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [wakeLock, setWakeLock] = useState<any>(null);
  
  // States for Timer
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Request Wake Lock to prevent screen from sleeping
  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const lock = await (navigator as any).wakeLock.request("screen");
        setWakeLock(lock);
        console.log("Wake Lock is active");
      }
    } catch (err: any) {
      console.warn("Wake Lock error:", err.name, err.message);
    }
  };

  const releaseWakeLock = () => {
    if (wakeLock !== null) {
      wakeLock.release().then(() => {
        setWakeLock(null);
        console.log("Wake Lock released");
      });
    }
  };

  // Start Cook Mode
  const startCookMode = () => {
    setIsActive(true);
    requestWakeLock();
    // Auto full-screen if supported
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => console.log(err));
    }
  };

  // Exit Cook Mode
  const exitCookMode = () => {
    setIsActive(false);
    releaseWakeLock();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.log(err));
    }
    // Clear any running timers
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(null);
    setIsTimerRunning(false);
  };

  // Handle Visibility change (if user switches tabs, wake lock is lost, need to re-request)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isActive && document.visibilityState === "visible") {
        requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive]);

  // Timer Logic
  const startTimer = (minutes: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  useEffect(() => {
    if (isTimerRunning && timeLeft !== null && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished!
      setIsTimerRunning(false);
      alert("⏳ C'est prêt ! L'étape est terminée.");
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Navigation between steps
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset timer for next step
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(null);
      setIsTimerRunning(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (timerRef.current) clearInterval(timerRef.current);
      setTimeLeft(null);
      setIsTimerRunning(false);
    }
  };

  const step = steps[currentStep];

  return (
    <>
      <Button 
        onClick={startCookMode} 
        size="lg" 
        className="w-full text-lg h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/20"
      >
        🧑‍🍳 Cuisiner (Mode Mains-Libres)
      </Button>

      {isActive && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 text-white flex flex-col p-6 sm:p-12 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-orange-500 font-bold tracking-wider uppercase text-sm">Mode Cuisine Actif</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-100">{recipeTitle}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={exitCookMode} className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-12 w-12">
              <IconX size={32} />
            </Button>
          </div>

          {/* Main Content Area (Giant Typography) */}
          <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto gap-8">
            <div className="text-center">
              <span className="text-xl text-zinc-500 font-semibold mb-4 block">Étape {step.order} sur {steps.length}</span>
              <p className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white">
                {step.instruction}
              </p>
            </div>

            {/* Integrated Timer */}
            {step.timerMinutes && (
              <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center shadow-2xl">
                {timeLeft === null ? (
                  <Button 
                    onClick={() => startTimer(step.timerMinutes!)}
                    className="bg-orange-600 hover:bg-orange-500 text-white h-20 px-10 text-2xl font-bold rounded-full"
                  >
                    <IconClockPlay className="mr-3" size={32} />
                    Démarrer {step.timerMinutes} min
                  </Button>
                ) : (
                  <div className="flex flex-col items-center gap-6">
                    <div className={`text-7xl sm:text-9xl font-mono font-black ${timeLeft === 0 ? "text-red-500 animate-pulse" : "text-orange-500"}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        onClick={toggleTimer} 
                        variant="outline" 
                        className="border-zinc-700 text-black hover:bg-zinc-800 hover:text-white h-16 w-16 rounded-full"
                      >
                        {isTimerRunning ? <IconPlayerPause size={28} /> : <IconPlayerPlay size={28} />}
                      </Button>
                       <Button 
                        onClick={() => {
                          if(timerRef.current) clearInterval(timerRef.current);
                          setTimeLeft(null);
                          setIsTimerRunning(false);
                        }} 
                        variant="ghost" 
                        className="text-zinc-500 hover:text-white h-16 px-6 font-semibold"
                      >
                        Réinitialiser
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-auto pt-8 flex justify-between items-center gap-4 w-full max-w-4xl mx-auto">
            <Button 
              onClick={prevStep} 
              disabled={currentStep === 0} 
              variant="outline" 
              className="h-16 px-8 text-xl font-bold rounded-full border-zinc-800 text-blackhover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:text-black"
            >
              Précédent
            </Button>
            
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === currentStep ? "w-10 bg-orange-500" : "w-3 bg-zinc-800"}`} />
              ))}
            </div>

            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={nextStep} 
                className="h-16 px-8 text-xl font-bold rounded-full bg-white text-zinc-950 hover:bg-zinc-200"
              >
                Suivant
              </Button>
            ) : (
              <Button 
                onClick={exitCookMode} 
                className="h-16 px-8 text-xl font-bold rounded-full bg-green-500 text-white hover:bg-green-600 shadow-xl shadow-green-500/20"
              >
                J'ai fini ! 🎉
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
