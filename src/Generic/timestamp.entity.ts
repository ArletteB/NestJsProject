import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class Timestamp {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
