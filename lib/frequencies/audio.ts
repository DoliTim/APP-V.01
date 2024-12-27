'use client';

import * as Tone from 'tone';

class FrequencyPlayer {
  private synth: Tone.Synth | null = null;
  private isPlaying: boolean = false;
  private currentFrequency: number | null = null;

  private initializeSynth() {
    if (!this.synth) {
      this.synth = new Tone.Synth({
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 1,
          release: 0.8
        }
      }).toDestination();
    }
  }

  async play(frequency: number) {
    try {
      if (typeof window === 'undefined') return;
      
      this.initializeSynth();
      if (!this.isPlaying && this.synth) {
        await Tone.start();
        this.currentFrequency = frequency;
        this.synth.triggerAttack(frequency);
        this.isPlaying = true;
      }
    } catch (error) {
      console.error('Error playing frequency:', error);
    }
  }

  stop() {
    try {
      if (this.isPlaying && this.synth) {
        this.synth.triggerRelease();
        this.isPlaying = false;
        this.currentFrequency = null;
      }
    } catch (error) {
      console.error('Error stopping frequency:', error);
    }
  }

  isCurrentlyPlaying() {
    return this.isPlaying;
  }

  getCurrentFrequency() {
    return this.currentFrequency;
  }
}

export const frequencyPlayer = new FrequencyPlayer();