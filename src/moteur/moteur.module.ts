import { Module } from '@nestjs/common';
import { MoteurService } from './moteur.service';
import { MoteurRepository } from './moteur.repository/moteur.repository';
import { MoteurController } from './moteur.controller';

@Module({
  controllers: [MoteurController],
  providers: [
    MoteurService,
    MoteurRepository,
  ],
  exports: [MoteurService],
})
export class MoteurModule {}