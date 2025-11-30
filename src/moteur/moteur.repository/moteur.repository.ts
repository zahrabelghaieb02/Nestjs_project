import { Injectable } from '@nestjs/common';

@Injectable()
export class MoteurRepository {
  private isRunning: boolean = false;

  // Méthode pour démarrer le moteur
  start(): string {
    this.isRunning = true;
    return 'Moteur démarré 🚗';
  }

  // Méthode pour obtenir le statut du moteur
  getStatus(): string {
    return this.isRunning 
      ? '✅ Moteur en marche' 
      : '❌ Moteur arrêté';
  }
}