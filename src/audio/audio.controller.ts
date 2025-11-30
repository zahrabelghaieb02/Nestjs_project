import { Controller, Get, Query } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  // GET /audio/demarrer?song=nom-de-la-chanson
  @Get('demarrer')
  demarrer(@Query('song') song?: string): string {
    return this.audioService.demarrerAudio(song);
  }

  // GET /audio/arreter
  @Get('arreter')
  arreter(): string {
    return this.audioService.arreterAudio();
  }
}