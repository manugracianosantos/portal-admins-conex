// src/user/entities/condominium.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('condominiums')
export class Condominium {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: string

  @Column()
  cnpj: string

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string
}