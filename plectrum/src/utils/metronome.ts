/**
 * Metronome utility for timing with audio feedback
 * Mobile-only implementation using expo-av
 */

import { Audio } from 'expo-av';

// Load sound file at module level (required for Expo bundler)
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

  /**
   * Initialize audio and load sound file
   */
  private async initAudio(): Promise<void> {
    try {
      // Set audio mode for React Native
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      // Load sound file if not already loaded
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

  /**
   * Play a beat sound
   */
  private async playTick(): Promise<void> {
    if (!this.sound) {
      console.warn('Metronome sound not loaded');
      return;
    }
    
    try {
      // Stop the sound if it's playing
      await this.sound.stopAsync();
      // Reset to beginning
      await this.sound.setPositionAsync(0);
      // Play the sound
      await this.sound.playAsync();
    } catch (e) {
      console.warn('Could not play metronome sound:', e);
    }
  }

  /**
   * Start the metronome
   */
  async start(): Promise<void> {
    // If already running, stop first to prevent duplicates
    if (this.isRunning) {
      await this.stop();
    }
    
    // Ensure audio is initialized
    await this.initAudio();
    
    // Clear any existing interval (safety check)
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isRunning = true;
    this.tickCount = 0;
    const intervalMs = (60 / this.bpm) * 1000; // Convert BPM to milliseconds
    
    this.intervalId = setInterval(() => {
      // Check if still running (in case stop was called)
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
    
    // Trigger first tick immediately
    this.tickCount = 1;
    await this.playTick();
    this.onTick();
  }

  /**
   * Stop the metronome
   */
  async stop(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    this.tickCount = 0;
    
    // Stop the sound if it's playing
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        await this.sound.setPositionAsync(0);
      } catch (e) {
        // Ignore errors
      }
    }
  }

  /**
   * Set BPM and restart if running
   */
  async setBPM(bpm: number): Promise<void> {
    const wasRunning = this.isRunning;
    // Fully stop and wait for cleanup
    await this.stop();
    this.bpm = bpm;
    // Small delay to ensure interval is fully cleared
    await new Promise(resolve => setTimeout(resolve, 10));
    if (wasRunning) {
      await this.start();
    }
  }

  /**
   * Get current BPM
   */
  getBPM(): number {
    return this.bpm;
  }

  /**
   * Check if metronome is running
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Cleanup
   */
  async destroy(): Promise<void> {
    await this.stop();
    if (this.sound) {
      await this.sound.unloadAsync().catch(() => {});
      this.sound = null;
    }
    this.soundLoaded = false;
  }
}
