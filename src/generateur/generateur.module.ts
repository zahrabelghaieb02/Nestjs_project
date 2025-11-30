import { Module } from '@nestjs/common';
import { GenerateurService } from './generateur.service';
import { GenerateurRepository } from './generateur.repository/generateur.repository';
import { MoteurModule } from '../moteur/moteur.module';
import { GenerateurController } from './generateur.controller';

@Module({
  imports: [MoteurModule], // 🔌 Import MoteurModule pour accéder à MoteurService
  providers: [
    GenerateurService,
    GenerateurRepository,
  ],
  exports: [GenerateurService],
  controllers: [GenerateurController], // 🔓 Exporter pour les autres modules (Phare, Audio)
})
export class GenerateurModule {}