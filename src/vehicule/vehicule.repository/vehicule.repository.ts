import { Injectable } from '@nestjs/common';

@Injectable()
export class VehiculeRepository {
  // Méthode pour orchestrer le fonctionnement du véhicule
  operate(): string {
    return '🚗 Véhicule en opération - Tous les systèmes coordonnés';
  }

  getVehiculeInfo(): string {
    return `systeme modulaire`;
  }
}