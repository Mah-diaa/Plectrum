import { Metronome } from "@/src/utils/metronome";
import { useEffect, useRef, useState } from "react";

export function useMetronome(initialBpm: number = 120) {
  const [bpm, setBpm] = useState(initialBpm);
  const [isRunning, setIsRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const metronomeRef = useRef<Metronome | null>(null);

  // Initialize metronome
  useEffect(() => {
    metronomeRef.current = new Metronome(bpm, () => {
      setTickCount(prev => prev + 1);
    });
    return () => {
      metronomeRef.current?.destroy().catch(() => {});
    };
  }, []);

  // Update metronome BPM
  useEffect(() => {
    if (metronomeRef.current) {
      const wasRunning = metronomeRef.current.getIsRunning();
      metronomeRef.current.setBPM(bpm).then(() => {
        // Restart if it was running
        if (wasRunning && !metronomeRef.current?.getIsRunning()) {
          metronomeRef.current?.start().then(() => {
            setIsRunning(true);
          });
        }
      });
    }
  }, [bpm]);

  const start = async () => {
    if (metronomeRef.current) {
      setTickCount(0);
      await metronomeRef.current.start();
      setIsRunning(true);
    }
  };

  const stop = async () => {
    if (metronomeRef.current) {
      await metronomeRef.current.stop();
      setIsRunning(false);
      setTickCount(0);
    }
  };

  const toggle = async () => {
    if (isRunning) {
      await stop();
    } else {
      await start();
    }
  };

  return {
    bpm,
    setBpm,
    isRunning,
    tickCount,
    start,
    stop,
    toggle,
  };
}

