import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Cliente} from './entities/cliente.entity';
import { NotFoundError, throwError } from 'rxjs';

@Injectable()
export class ClientesService {
constructor(
  @InjectRepository(Cliente)private clienteRepository :Repository<Cliente>
){}

async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
  const cliente = this.clienteRepository.create(createClienteDto); // create() es síncrono
  return await this.clienteRepository.save(cliente); // save() guarda el cliente en la base de datos
}

  async findAll(): Promise<Cliente[]> {
    const cliente = await this.clienteRepository.find(); 
    return cliente;
  }

  async findOne(id: number):Promise<Cliente> {
    try {
      const cliente = await this.clienteRepository.findOneBy({cliId:id});
      if (!cliente){
        throw new NotFoundException(`Cliente con ${id} no encontrado`);
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException (`Error al buscar el cliente con ${id}`);
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto):Promise<Cliente> {
  try {
    const cliente = await this.clienteRepository.findOneBy({cliId:id});
    if (!cliente){
      throw new NotFoundException(`Cliente con ${id} no encontrado`);
    }
    const update = Object.assign(cliente,updateClienteDto);
    return await this.clienteRepository.save(update);
  } catch (error) {
    throw new InternalServerErrorException(`Error al actualizar el cliente con ID ${id}`);
  }
    return ;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
