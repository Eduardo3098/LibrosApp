import { Injectable } from '@angular/core';
import {LibroService} from './libro.service';
import {Libro} from '../libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroServiceData {

  libros: Libro[] = [];

  constructor(private libroService: LibroService) { }

  setLibros(libros: Libro[]) {
    this.libros = libros;
  }

  agregarLibro(libroA: Libro) {
    this.libroService.agregar(libroA)
      .subscribe(
        (libro: Libro) => {
          this.libros.push(libro);
        }
      );
  }

  encontrarLibro(nombre: string) {
    const libro: Libro = this.libros.find(libro => libro.nombre === nombre);
    return libro;
  }

  modificarLibro(nombre:string, libro: Libro) {
    this.libroService.modificar(nombre, libro);
  }

  eliminarLibro(nombre: string) {
    const libro: Libro = this.libros.find(libro => libro.nombre === nombre);
    this.libroService.eliminar(libro.nombre);
  }

  obtenerLibros() {
    return this.libroService.cargar();
  }
}
