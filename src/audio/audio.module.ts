import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioRepository } from './audio.repository/audio.repository';
import { GenerateurModule } from '../generateur/generateur.module';
import { AudioController } from './audio.controller';

@Module({
  imports: [GenerateurModule], // 🔌 Import GenerateurModule
  providers: [
    AudioService,
    AudioRepository,
  ],
  exports: [AudioService],
  controllers: [AudioController], // 🔓 Exporter pour VehiculeModule
})
export class AudioModule {}