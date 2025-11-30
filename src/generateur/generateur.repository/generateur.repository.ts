import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateurRepository {
  private voltage: number = 0;

  // Méthode pour générer de l'électricité
  generatePower(): string {
    this.voltage = 12; // 12 volts
    return `⚡ Générateur produit ${this.voltage}V d'électricité`;
  }

  getVoltage(): number {
    return this.voltage;
  }
}