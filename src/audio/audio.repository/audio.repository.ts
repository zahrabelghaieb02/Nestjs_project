import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioRepository {
  private isPlaying: boolean = false;
  private currentSong: string = '';

  // Méthode pour jouer de la musique
  playMusic(song: string = 'Radio 1'): string {
    this.isPlaying = true;
    this.currentSong = song;
    return `🎵 Lecture en cours : ${this.currentSong}`;
  }

  stop(): string {
    this.isPlaying = false;
    return '🔇 Audio arrêté';
  }

  getStatus(): string {
    return this.isPlaying 
      ? `✅ Audio ON - ${this.currentSong}` 
      : '❌ Audio OFF';
  }
}