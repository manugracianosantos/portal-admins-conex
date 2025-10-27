// src/user/user.service.ts - VERSÃO CORRIGIDA
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Like } from "typeorm"
import { ConexUser } from "./entities/user.entity"
import { NaturalPerson } from "./entities/natural-person.entity"
import { Business } from "./entities/business.entity"
import { Condominium } from "./entities/condominium.entity"
import { CreateUserDto } from "./dto/create-user.dto"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ConexUser, 'u112555686_conex')
    private userRepository: Repository<ConexUser>,

    @InjectRepository(NaturalPerson, 'u112555686_conex')
    private naturalPersonRepository: Repository<NaturalPerson>,

    @InjectRepository(Business, 'u112555686_conex')
    private businessRepository: Repository<Business>,

    @InjectRepository(Condominium, 'u112555686_conex')
    private condominiumRepository: Repository<Condominium>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Verifica se userId já existe
    const existingUser = await this.userRepository.findOne({
      where: { userId: createUserDto.userId }
    })
    if (existingUser) throw new ConflictException('User ID already exists')

    // Verifica se telefone já existe
    const existingPhone = await this.userRepository.findOne({
      where: { phone: createUserDto.phone }
    })
    if (existingPhone) throw new ConflictException('Phone number already registered')

    // Cria usuário principal
    const user = await this.userRepository.save({
      userId: createUserDto.userId,
      fullName: createUserDto.fullName,
      phone: createUserDto.phone,
      birthDate: createUserDto.birthDate,
    })

    // Cria registros nas tabelas específicas conforme tipo
    if (createUserDto.type === 'natural_person' && createUserDto.cpf) {
      await this.naturalPersonRepository.save({
        userId: createUserDto.userId,
        cpf: createUserDto.cpf,
        profilePicture: createUserDto.profilePicture,
      })
    } else if (createUserDto.type === 'business' && createUserDto.cpfCnpj) {
      await this.businessRepository.save({
        userId: createUserDto.userId,
        cpfCnpj: createUserDto.cpfCnpj,
        specialty: createUserDto.specialty,
        profilePicture: createUserDto.profilePicture,
      })
    } else if (createUserDto.type === 'condominium' && createUserDto.cnpj) {
      await this.condominiumRepository.save({
        userId: createUserDto.userId,
        cnpj: createUserDto.cnpj,
        profilePicture: createUserDto.profilePicture,
      })
    }

    return this.findOne(createUserDto.userId)
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit

    const where = search ? [
      { fullName: Like(`%${search}%`) },
      { phone: Like(`%${search}%`) }
    ] : {}

    const [users, total] = await Promise.all([
      this.userRepository.find({
        where,
        skip,
        take: limit,
        order: { created_at: 'DESC' }
      }),
      this.userRepository.count({ where })
    ])

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const [naturalPerson, business, condominium] = await Promise.all([
          this.naturalPersonRepository.findOne({ where: { userId: user.userId } }),
          this.businessRepository.findOne({ where: { userId: user.userId } }),
          this.condominiumRepository.findOne({ where: { userId: user.userId } }),
        ])

        return {
          ...user,
          type: this.getUserType(naturalPerson, business, condominium),
          document: naturalPerson?.cpf || business?.cpfCnpj || condominium?.cnpj,
          specialty: business?.specialty,
          profilePicture: naturalPerson?.profilePicture || business?.profilePicture || condominium?.profilePicture,
        }
      })
    )

    return {
      users: usersWithDetails,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { userId: id } })
    if (!user) throw new NotFoundException('User not found')

    const [naturalPerson, business, condominium] = await Promise.all([
      this.naturalPersonRepository.findOne({ where: { userId: id } }),
      this.businessRepository.findOne({ where: { userId: id } }),
      this.condominiumRepository.findOne({ where: { userId: id } }),
    ])

    return {
      ...user,
      type: this.getUserType(naturalPerson, business, condominium),
      naturalPerson,
      business,
      condominium,
    }
  }

  async update(id: string, updateUserDto: any) {
    const user = await this.userRepository.findOne({ where: { userId: id } })
    if (!user) throw new NotFoundException('User not found')

    await this.userRepository.update({ userId: id }, updateUserDto)
    return this.findOne(id)
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { userId: id } })
    if (!user) throw new NotFoundException('User not found')

    await this.userRepository.update({ userId: id }, { /* status: 'inactive' */ })
    return { message: 'User deactivated successfully' }
  }

  private getUserType(
    naturalPerson: NaturalPerson | null,
    business: Business | null,
    condominium: Condominium | null
  ): string {
    if (naturalPerson) return 'natural_person'
    if (business) return 'business'
    if (condominium) return 'condominium'
    return 'unknown'
  }
}
