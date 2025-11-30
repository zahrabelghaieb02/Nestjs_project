import { Injectable } from '@nestjs/common';

@Injectable()
export class PhareRepository {
  private isOn: boolean = false;

  // Méthode pour allumer les phares
  turnOn(): string {
    this.isOn = true;
    return '💡 Phares allumés';
  }

  turnOff(): string {
    this.isOn = false;
    return '🌑 Phares éteints';
  }

  getStatus(): string {
    return this.isOn ? '✅ Phares ON' : '❌ Phares OFF';
  }
}