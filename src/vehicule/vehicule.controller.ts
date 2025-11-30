import { Controller, Get } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {
  // 🔑 Le controller orchestre tout via VehiculeService
  constructor(private readonly vehiculeService: VehiculeService) {}

  // GET /vehicule/demarrer - Lance toute la séquence de démarrage
  @Get('demarrer')
  demarrer(): string {
    return this.vehiculeService.demarrerVehicule();
  }

  // GET /vehicule/arreter - Arrête le véhicule
  @Get('arreter')
  arreter(): string {
    return this.vehiculeService.arreterVehicule();
  }
}