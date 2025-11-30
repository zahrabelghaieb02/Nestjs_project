import { Controller, Get } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {
  // 🔑 INJECTION : Le controller injecte le service
  constructor(private readonly moteurService: MoteurService) {}

  // GET /moteur/demarrer
  @Get('demarrer')
  demarrer(): string {
    return this.moteurService.demarrerMoteur();
  }

  // GET /moteur/statut
  @Get('statut')
  obtenirStatut(): string {
    return this.moteurService.obtenirStatut();
  }
}