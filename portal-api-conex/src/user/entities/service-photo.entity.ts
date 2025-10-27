// src/dashboard/entities/service-photo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('service_photos')
export class ServicePhoto {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'service_id' })
  serviceId: number

  @Column()
  photo: string

  @Column({ name: 'create_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}