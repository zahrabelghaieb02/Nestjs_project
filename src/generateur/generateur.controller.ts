import { Controller, Get } from '@nestjs/common';
import { GenerateurService } from './generateur.service';

@Controller('generateur')
export class GenerateurController {
  constructor(private readonly generateurService: GenerateurService) {}

  // GET /generateur/generer
  @Get('generer')
  genererElectricite(): string {
    return this.generateurService.genererElectricite();
  }
}