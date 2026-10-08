export class Temporal {
  id: number;
  nombre: string;
  edad: number;

  constructor(id: number, nombre: string, edad: number) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
  }
}

export const usuarios: Temporal[] = [];