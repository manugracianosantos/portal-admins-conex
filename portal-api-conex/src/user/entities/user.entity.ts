// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class ConexUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'full_name' })
  fullName: string

  @Column()
  phone: string

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}