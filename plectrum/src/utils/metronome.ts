/**
 * Metronome utility for timing with audio feedback
 * Uses setInterval and expo-av/Web Audio API for sound generation
 */

import { Audio } from 'expo-av';

// Try to load sound files at module level (required for Expo bundler)
let metronomeSoundAsset: any = null;
try {
  metronomeSoundAsset = require('../../assets/sounds/metronome-regular.wav');
} catch (e) {
  // File doesn't exist or can't be loaded
  console.log('Metronome sound file not found at module level');
}

export class Metronome {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private bpm: number;
  private onTick: () => void;
  private isRunning: boolean = false;
  private audioContext: AudioContext | null = null;
  private tickCount: number = 0;
  private accentSound: Audio.Sound | null = null;
  private regularSound: Audio.Sound | null = null;
  private soundsLoaded: boolean = false;

  constructor(bpm: number, onTick: () => void) {
    this.bpm = bpm;
    this.onTick = onTick;
    this.initAudio();
  }

  /**
   * Initialize audio (Web Audio API for web, expo-av for native)
   */
  private async initAudio(): Promise<void> {
    try {
      // For React Native, set audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      // Pre-load sounds for React Native (reuse them to prevent cutting)
      if (!this.soundsLoaded && !this.audioContext) {
        try {
          // Try to load actual sound files first, fallback to generated sounds
          let accentSource: any;
          let regularSource: any;
          let usingCustomSounds = false;
          
          // Use the module-level loaded asset if available
          if (metronomeSoundAsset) {
            console.log('✅ Found metronome sound file, asset ID:', metronomeSoundAsset);
            regularSource = metronomeSoundAsset;
            accentSource = metronomeSoundAsset; // Use same sound for both
            usingCustomSounds = true;
          } else {
            // Fallback to generated sounds
            console.log('⚠️ Using generated sounds (custom sound file not found)');
            usingCustomSounds = false;
          }
          
          if (usingCustomSounds) {
            // Use actual sound files
            // In React Native, require() returns a number (asset ID), pass it directly
            const { sound: accent } = await Audio.Sound.createAsync(
              regularSource, // Use the same sound for both
              { shouldPlay: false, volume: 0.7 }
            );
            
            const { sound: regular } = await Audio.Sound.createAsync(
              regularSource,
              { shouldPlay: false, volume: 0.7 }
            );
            
            this.accentSound = accent;
            this.regularSound = regular;
            this.soundsLoaded = true;
            console.log('✅ Loaded custom metronome sound file:', regularSource);
          } else {
            // Use generated sounds
            const accentURI = this.generateBeatDataURI(true);
            const regularURI = this.generateBeatDataURI(false);
            
            const { sound: accent } = await Audio.Sound.createAsync(
              { uri: accentURI },
              { shouldPlay: false, volume: 0.7 }
            );
            
            const { sound: regular } = await Audio.Sound.createAsync(
              { uri: regularURI },
              { shouldPlay: false, volume: 0.7 }
            );
            
            this.accentSound = accent;
            this.regularSound = regular;
            this.soundsLoaded = true;
          }
        } catch (e) {
          console.warn('Could not pre-load sounds:', e);
        }
      }

      // For web, initialize Web Audio API
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if ((window as any).__metronomeAudioContext) {
          this.audioContext = (window as any).__metronomeAudioContext;
        } else {
          this.audioContext = new AudioContextClass();
          (window as any).__metronomeAudioContext = this.audioContext;
        }
      }
    } catch (e) {
      console.warn('Audio initialization error:', e);
    }
  }

  /**
   * Generate a beat sound data URI (for expo-av)
   * Creates a percussive drum-like beat sound
   */
  private generateBeatDataURI(isAccent: boolean = false, duration: number = 0.2): string {
    const sampleRate = 44100;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, numSamples * 2, true);

    // Generate beat sound (drum-like)
    // Accent: deeper, more powerful (kick drum)
    // Regular: lighter, higher (hi-hat or snare)
    const baseFreq = isAccent ? 60 : 200; // Lower for accent (kick), higher for regular
    const volume = isAccent ? 0.5 : 0.35;
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      
      let sample = 0;
      
      if (isAccent) {
        // Kick drum-like: low frequency with quick pitch drop
        const pitchDrop = Math.exp(-t * 30); // Pitch drops quickly
        const freq = baseFreq * (1 + pitchDrop * 2);
        sample += Math.sin(2 * Math.PI * freq * t) * 0.6;
        
        // Add some low harmonics
        sample += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
        sample += Math.sin(2 * Math.PI * freq * 3 * t) * 0.1;
        
        // Add noise for attack
        const noise = (Math.random() * 2 - 1) * 0.15;
        sample += noise * Math.exp(-t * 50);
      } else {
        // Lighter beat: higher frequency with harmonics
        sample += Math.sin(2 * Math.PI * baseFreq * t) * 0.4;
        sample += Math.sin(2 * Math.PI * baseFreq * 2 * t) * 0.3;
        sample += Math.sin(2 * Math.PI * baseFreq * 3 * t) * 0.2;
        
        // Add some high-frequency content
        sample += Math.sin(2 * Math.PI * baseFreq * 4 * t) * 0.1;
        
        // Light noise for attack
        const noise = (Math.random() * 2 - 1) * 0.1;
        sample += noise * Math.exp(-t * 80);
      }
      
      // Envelope: very quick attack, medium decay
      const attackTime = 0.002;
      const decayTime = isAccent ? 0.15 : 0.1;
      let envelope = 0;
      
      if (t < attackTime) {
        envelope = t / attackTime;
      } else {
        envelope = Math.exp(-(t - attackTime) / decayTime);
      }
      
      const value = Math.max(-1, Math.min(1, sample * envelope * volume));
      view.setInt16(44 + i * 2, value * 0x7FFF, true);
    }

    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return `data:audio/wav;base64,${base64}`;
  }

  /**
   * Load audio file for web (if available)
   */
  private async loadAudioFileForWeb(filename: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null;
    
    try {
      // Try to load from assets (for web, you'd need to serve these files)
      // For now, we'll use generated sounds on web
      return null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Play a beat sound
   */
  private async playTick(isAccent: boolean = false): Promise<void> {
    try {
      // For web, use Web Audio API to create beat sound
      if (this.audioContext) {
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }

        const now = this.audioContext.currentTime;
        const duration = 0.2;

        if (isAccent) {
          // Kick drum-like: low frequency with pitch drop
          const osc = this.audioContext.createOscillator();
          const gain = this.audioContext.createGain();
          const noise = this.audioContext.createBufferSource();
          const noiseGain = this.audioContext.createGain();
          const masterGain = this.audioContext.createGain();

          // Create noise buffer for attack
          const noiseBuffer = this.audioContext.createBuffer(1, 4410, 44100);
          const noiseData = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = Math.random() * 2 - 1;
          }
          noise.buffer = noiseBuffer;

          // Low frequency oscillator with pitch drop
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.1);
          osc.type = 'sine';

          osc.connect(gain);
          noise.connect(noiseGain);
          gain.connect(masterGain);
          noiseGain.connect(masterGain);
          masterGain.connect(this.audioContext.destination);

          // Envelope
          masterGain.gain.setValueAtTime(0, now);
          masterGain.gain.linearRampToValueAtTime(0.5, now + 0.002);
          masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

          noiseGain.gain.setValueAtTime(0.15, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

          osc.start(now);
          noise.start(now);
          osc.stop(now + duration);
          noise.stop(now + 0.05);
        } else {
          // Lighter beat: higher frequency
          const osc1 = this.audioContext.createOscillator();
          const osc2 = this.audioContext.createOscillator();
          const gain1 = this.audioContext.createGain();
          const gain2 = this.audioContext.createGain();
          const masterGain = this.audioContext.createGain();

          osc1.frequency.value = 200;
          osc1.type = 'sine';
          osc2.frequency.value = 400;
          osc2.type = 'sine';

          osc1.connect(gain1);
          osc2.connect(gain2);
          gain1.connect(masterGain);
          gain2.connect(masterGain);
          masterGain.connect(this.audioContext.destination);

          gain1.gain.value = 0.4;
          gain2.gain.value = 0.3;

          masterGain.gain.setValueAtTime(0, now);
          masterGain.gain.linearRampToValueAtTime(0.35, now + 0.002);
          masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + duration);
          osc2.stop(now + duration);
        }
        
        return;
      }

      // For React Native, use pre-loaded sounds (prevents cutting)
      // Use the same sound file for all beats (regularSound, fallback to accentSound)
      const soundToPlay = this.regularSound || this.accentSound;
      if (!soundToPlay) {
        console.warn('No metronome sound loaded');
        return;
      }
      
      try {
        // Always stop first to ensure clean playback
        await soundToPlay.stopAsync();
        // Reset position to start
        await soundToPlay.setPositionAsync(0);
        // Play the sound
        await soundToPlay.playAsync();
      } catch (e) {
        console.warn('Could not play metronome sound:', e);
      }
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
      const isAccent = this.tickCount % 4 === 1; // Accent on beat 1 of every 4 beats
      this.playTick(isAccent).catch(() => {});
      this.onTick();
    }, intervalMs);
    
    // Trigger first tick immediately
    this.tickCount = 1;
    await this.playTick(true); // First tick is always an accent
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
    
    // Stop any currently playing sounds
    if (this.accentSound) {
      try {
        await this.accentSound.stopAsync();
        await this.accentSound.setPositionAsync(0);
      } catch (e) {
        // Ignore errors
      }
    }
    if (this.regularSound) {
      try {
        await this.regularSound.stopAsync();
        await this.regularSound.setPositionAsync(0);
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
    this.stop();
    if (this.accentSound) {
      await this.accentSound.unloadAsync().catch(() => {});
      this.accentSound = null;
    }
    if (this.regularSound) {
      await this.regularSound.unloadAsync().catch(() => {});
      this.regularSound = null;
    }
    this.soundsLoaded = false;
    if (this.audioContext) {
      await this.audioContext.close().catch(() => {
        // Ignore errors on close
      });
      this.audioContext = null;
    }
  }
}

