import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  catId: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
