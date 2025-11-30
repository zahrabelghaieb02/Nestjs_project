import { Injectable } from '@nestjs/common';
import { VehiculeRepository } from './vehicule.repository/vehicule.repository';
import { MoteurService } from '../moteur/moteur.service';
import { GenerateurService } from '../generateur/generateur.service';
import { PhareService } from '../phare/phare.service';
import { AudioService } from '../audio/audio.service';

@Injectable()
export class VehiculeService {
  // 🔑 INJECTION MULTIPLE : Vehicule orchestre TOUS les autres services
  constructor(
    private readonly vehiculeRepository: VehiculeRepository,
    private readonly moteurService: MoteurService,
    private readonly generateurService: GenerateurService,
    private readonly phareService: PhareService,
    private readonly audioService: AudioService,
  ) {}

  // Méthode principale qui orchestre tout le véhicule
  demarrerVehicule(): string {
    let rapport = this.vehiculeRepository.getVehiculeInfo();
    rapport += '\n=== 🚀 SÉQUENCE DE DÉMARRAGE ===\n\n';

    // 1️⃣ Démarrer le moteur
    rapport += '1️⃣ MOTEUR:\n' + this.moteurService.demarrerMoteur() + '\n\n';

    // 2️⃣ Générer électricité
    rapport += '2️⃣ GÉNÉRATEUR:\n' + this.generateurService.genererElectricite() + '\n\n';

    // 3️⃣ Allumer les phares
    rapport += '3️⃣ PHARES:\n' + this.phareService.allumerPhares() + '\n\n';

    // 4️⃣ Démarrer l'audio
    rapport += '4️⃣ AUDIO:\n' + this.audioService.demarrerAudio('Highway to Hell 🎸') + '\n\n';

    // 5️⃣ Opération finale
    rapport += '5️⃣ ' + this.vehiculeRepository.operate() + '\n';
    rapport += '\n✅ VÉHICULE PRÊT À ROULER!';

    return rapport;
  }

  arreterVehicule(): string {
    let rapport = '\n=== 🛑 ARRÊT DU VÉHICULE ===\n\n';
    
    rapport += this.audioService.arreterAudio() + '\n';
    rapport += this.phareService.eteindrePhares() + '\n';
    rapport += '🔴 Moteur arrêté\n';
    rapport += '\n✅ VÉHICULE ÉTEINT!';
    
    return rapport;
  }
}