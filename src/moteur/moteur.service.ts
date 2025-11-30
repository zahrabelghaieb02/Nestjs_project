import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur.repository/moteur.repository';

@Injectable()
export class MoteurService {
  // 🔑 INJECTION DE DÉPENDANCE : NestJS injecte automatiquement MoteurRepository
  constructor(private readonly moteurRepository: MoteurRepository) {}

  demarrerMoteur(): string {
    return this.moteurRepository.start();
  }

  obtenirStatut(): string {
    return this.moteurRepository.getStatus();
  }
}