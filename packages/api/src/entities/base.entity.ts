import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updated: Date;
}
