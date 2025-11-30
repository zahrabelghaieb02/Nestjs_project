import { Controller, Get } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {
  constructor(private readonly phareService: PhareService) {}

  // GET /phare/allumer
  @Get('allumer')
  allumer(): string {
    return this.phareService.allumerPhares();
  }

  // GET /phare/eteindre
  @Get('eteindre')
  eteindre(): string {
    return this.phareService.eteindrePhares();
  }
}