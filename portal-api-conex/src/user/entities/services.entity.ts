// src/dashboard/entities/service.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: string

  @Column()
  description: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date
}