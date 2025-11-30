import { Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeRepository } from './vehicule.repository/vehicule.repository';
import { MoteurModule } from '../moteur/moteur.module';
import { GenerateurModule } from '../generateur/generateur.module';
import { PhareModule } from '../phare/phare.module';
import { AudioModule } from '../audio/audio.module';
import { VehiculeController } from './vehicule.controller';

@Module({
  imports: [
    MoteurModule,
    GenerateurModule,
    PhareModule,
    AudioModule,
  ],
  controllers: [VehiculeController],
  providers: [
    VehiculeService,
    VehiculeRepository,
  ],
  exports: [VehiculeService],
})
export class VehiculeModule {}