import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio.repository/audio.repository';
import { GenerateurService } from '../generateur/generateur.service';

@Injectable()
export class AudioService {
  // 🔑 INJECTION : Audio dépend aussi du Générateur
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly generateurService: GenerateurService,
  ) {}

  demarrerAudio(song?: string): string {
    // 1️⃣ Générer l'électricité
    const electricite = this.generateurService.genererElectricite();
    
    // 2️⃣ Si électricité OK, démarrer l'audio
    if (electricite.includes('⚡')) {
      const audio = this.audioRepository.playMusic(song);
      return `${electricite}\n${audio}`;
    }
    
    return '❌ Impossible de démarrer audio : pas d\'électricité';
  }

  arreterAudio(): string {
    return this.audioRepository.stop();
  }
}