import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Temporal, usuarios } from './temporal';

@Injectable()
export class UsuarioService {
  create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario: Temporal = {
      ...createUsuarioDto,
      id: usuarios.length + 1, // Se coloca id al final para asegurar el ID asignado
    };
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  findAll() {
    return usuarios;
  }

  headAll() {
    return;
  }

  options() {
    return;
  }

  findOne(id: number) {
    return usuarios.find((usuario: Temporal) => usuario.id === id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const index = usuarios.findIndex((usuario: Temporal) => usuario.id === id);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...updateUsuarioDto };
      return usuarios[index];
    }
    return `Usuario #${id} no encontrado`;
  }

  remove(id: number) {
    const index = usuarios.findIndex((usuario: Temporal) => usuario.id === id);
    if (index !== -1) {
      const eliminado = usuarios.splice(index, 1);
      return eliminado[0];
    }
    return `Usuario #${id} no encontrado`;
  }
}