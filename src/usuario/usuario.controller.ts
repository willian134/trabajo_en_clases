import { 
  Controller, 
  Get, 
  Post, 
  Put,
  Body, 
  Patch, 
  Param, 
  Delete, 
  Head, 
  Options, 
  HttpCode, 
  Header 
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // POST http://localhost:3000/usuario
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  // GET http://localhost:3000/usuario
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  // HEAD http://localhost:3000/usuario
  @Head()
  @HttpCode(200)
  headAll() {
    return this.usuarioService.headAll();
  }

  // OPTIONS http://localhost:3000/usuario
  @Options()
  @HttpCode(200)
  @Header('Allow', 'GET, POST, HEAD, OPTIONS')
  options() {
    return this.usuarioService.options();
  }

  // GET http://localhost:3000/usuario/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  // PUT http://localhost:3000/usuario/1
  @Put(':id')
  replace(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  // PATCH http://localhost:3000/usuario/1
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  // DELETE http://localhost:3000/usuario/1
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  // HEAD http://localhost:3000/usuario/1
  @Head(':id')
  @HttpCode(200)
  headOne(@Param('id') id: string) {
    return this.usuarioService.headAll();
  }

  // OPTIONS http://localhost:3000/usuario/1
  @Options(':id')
  @HttpCode(200)
  @Header('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS')
  optionsOne() {
    return this.usuarioService.options();
  }
}