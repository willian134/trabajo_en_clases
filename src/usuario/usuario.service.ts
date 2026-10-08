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
//El proceso se desarrolló en varias etapas orientadas a implementar y validar una API RESTful CRUD completa en NestJS. Primero, se solucionó la colisión del puerto 3000 (EADDRINUSE) para arrancar el servidor en desarrollo. A continuación, se corrigieron los errores 404 en operaciones con identificadores específicos (PUT, PATCH, DELETE y OPTIONS /usuario/1), aclarando la diferencia conceptual en la arquitectura REST entre peticiones a la colección general (/usuario) y a un recurso individual (/usuario/:id). Posterior a esto, se refactorizó e integró el controlador con el servicio para soportar todos los métodos HTTP, incluyendo la eliminación del módulo de telemetría (ObserveModule) para evitar errores de autenticación en entorno local. Luego, se profundizó en el propósito de los verbos HTTP secundarios, definiendo a OPTIONS como el método para consultar metadatos y políticas CORS, y a HEAD como una verificación liviana de recursos que omite el cuerpo de la respuesta. Finalmente, se realizaron pruebas de integración en Postman, identificando el comportamiento de los datos en memoria volátil —que requiere ejecutar un POST previo a cualquier actualización— y asegurando el uso adecuado de los encabezados y cuerpos en formato JSON