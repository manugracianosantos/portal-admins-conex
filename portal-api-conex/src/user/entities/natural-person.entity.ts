// src/user/entities/natural-person.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('natural_person')
export class NaturalPerson {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: string

  @Column()
  cpf: string

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string
}