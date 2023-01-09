import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat/cat';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  findByCatId(catId: number): Promise<Cat> {
    return this.catRepository.findOneByOrFail({ catId });
  }

  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}
}
