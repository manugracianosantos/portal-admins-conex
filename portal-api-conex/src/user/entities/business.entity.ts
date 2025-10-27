// src/user/entities/business.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'cpf_cnpj' })
  cpfCnpj: string

  @Column()
  specialty: string

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string
}