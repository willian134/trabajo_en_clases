import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Temporal, usuarios } from './temporal';

@Injectable()
export class UsuarioService {
  create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario: Temporal = {
      ...createUsuarioDto,
      id: usuarios.length + 1,
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
//Durante el proceso de desarrollo e investigación se implementó y validó una API RESTful en NestJS. En primer lugar, se resolvió un bloqueo inicial del servidor liberando el puerto 3000 (EADDRINUSE). Posteriormente, se abordaron los errores 404 al ejecutar peticiones sobre recursos específicos (PUT, PATCH, DELETE y OPTIONS /usuario/1), estableciendo la distinción en la arquitectura REST entre las rutas de colección (/usuario) y las de recurso individual (/usuario/:id).   A nivel de código, se integraron UsuarioController y UsuarioService para cubrir todos los verbos HTTP requeridos y se desacopló el módulo de telemetría (ObserveModule) para eliminar fallas de autenticación en desarrollo local. Adicionalmente, se analizaron los verbos HTTP secundarios: OPTIONS para la consulta de metadatos/CORS y HEAD para la verificación de existencia de recursos sin transferencia de cuerpo. Finalmente, mediante pruebas en Postman, se validó el flujo de datos considerando la volatilidad del almacenamiento en memoria y la correcta estructuración de las peticiones en formato JSON.