import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): { ok: boolean } {
    return { ok: true };
  }

  @Get(':id')
  findOne(@Param() params, @Res() res: Response) {
    const catId = Number(params.id);
    if (Number.isNaN(catId)) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    return this.catService.findByCatId(catId);
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  constructor(private readonly catService: CatsService) {}
}
