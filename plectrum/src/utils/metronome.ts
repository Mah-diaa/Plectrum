import { Audio } from 'expo-av';

let metronomeSoundAsset: any = null;
try {
  metronomeSoundAsset = require('../../assets/sounds/metronome-regular.wav');
} catch (e) {
  console.warn('Metronome sound file not found:', e);
}

export class Metronome {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private bpm: number;
  private onTick: () => void;
  private isRunning: boolean = false;
  private tickCount: number = 0;
  private sound: Audio.Sound | null = null;
  private soundLoaded: boolean = false;

  constructor(bpm: number, onTick: () => void) {
    this.bpm = bpm;
    this.onTick = onTick;
    this.initAudio();
  }

  private async initAudio(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      if (!this.soundLoaded && metronomeSoundAsset) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            metronomeSoundAsset,
            { shouldPlay: false, volume: 0.7 }
          );
          
          this.sound = sound;
          this.soundLoaded = true;
          console.log('✅ Loaded metronome sound file');
        } catch (e) {
          console.warn('Could not load metronome sound file:', e);
        }
      }
    } catch (e) {
      console.warn('Audio initialization error:', e);
    }
  }

  private async playTick(): Promise<void> {
    if (!this.sound) {
      console.warn('Metronome sound not loaded');
      return;
    }
    
    try {
      await this.sound.stopAsync();
      await this.sound.setPositionAsync(0);
      await this.sound.playAsync();
    } catch (e) {
      console.warn('Could not play metronome sound:', e);
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      await this.stop();
    }
    
    await this.initAudio();
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isRunning = true;
    this.tickCount = 0;
    const intervalMs = (60 / this.bpm) * 1000;
    
    this.intervalId = setInterval(() => {
      if (!this.isRunning) {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        return;
      }
      this.tickCount++;
      this.playTick().catch(() => {});
      this.onTick();
    }, intervalMs);
    
    this.tickCount = 1;
    await this.playTick();
    this.onTick();
  }

  async stop(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    this.tickCount = 0;
    
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        await this.sound.setPositionAsync(0);
      } catch (e) {
        // Ignore errors
      }
    }
  }

  async setBPM(bpm: number): Promise<void> {
    const wasRunning = this.isRunning;
    await this.stop();
    this.bpm = bpm;
    await new Promise(resolve => setTimeout(resolve, 10));
    if (wasRunning) {
      await this.start();
    }
  }

  getBPM(): number {
    return this.bpm;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }
  async destroy(): Promise<void> {
    await this.stop();
    if (this.sound) {
      await this.sound.unloadAsync().catch(() => {});
      this.sound = null;
    }
    this.soundLoaded = false;
  }
}
