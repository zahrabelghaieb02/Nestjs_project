import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare.repository/phare.repository';
import { GenerateurService } from '../generateur/generateur.service';

@Injectable()
export class PhareService {
  // 🔑 INJECTION : Phare dépend du Générateur pour avoir de l'électricité
  constructor(
    private readonly phareRepository: PhareRepository,
    private readonly generateurService: GenerateurService,
  ) {}

  allumerPhares(): string {
    // 1️⃣ Générer l'électricité d'abord
    const electricite = this.generateurService.genererElectricite();
    
    // 2️⃣ Si électricité OK, allumer les phares
    if (electricite.includes('⚡')) {
      const phares = this.phareRepository.turnOn();
      return `${electricite}\n${phares}`;
    }
    
    return '❌ Impossible d\'allumer les phares : pas d\'électricité';
  }

  eteindrePhares(): string {
    return this.phareRepository.turnOff();
  }
}