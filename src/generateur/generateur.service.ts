import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur.repository/generateur.repository';
import { MoteurService } from '../moteur/moteur.service';

@Injectable()
export class GenerateurService {
  // 🔑 INJECTION DE DÉPENDANCE :
  // - GenerateurRepository (son propre repository)
  // - MoteurService (dépendance externe du module Moteur)
  constructor(
    private readonly generateurRepository: GenerateurRepository,
    private readonly moteurService: MoteurService,
  ) {}

  genererElectricite(): string {
    // 1️⃣ Vérifier que le moteur est démarré
    const moteurStatus = this.moteurService.obtenirStatut();
    
    // 2️⃣ Si moteur OK, générer l'électricité
    if (moteurStatus.includes('✅')) {
      const electricite = this.generateurRepository.generatePower();
      return `${moteurStatus}\n${electricite}`;
    }
    
    return '❌ Impossible de générer électricité : moteur arrêté';
  }
}