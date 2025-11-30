import { Module } from '@nestjs/common';
import { PhareService } from './phare.service';
import { PhareRepository } from './phare.repository/phare.repository';
import { GenerateurModule } from '../generateur/generateur.module';
import { PhareController } from './phare.controller';

@Module({
  imports: [GenerateurModule], // 🔌 Import GenerateurModule
  providers: [
    PhareService,
    PhareRepository,
  ],
  exports: [PhareService],
  controllers: [PhareController], // 🔓 Exporter pour VehiculeModule
})
export class PhareModule {}