import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Libro } from '../libro.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  baseUrl = 'http://localhost:8080/Libro/api/libros';

  /*private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }*/

  cargar() {
    return this.http.get(this.baseUrl);
  }

  agregar(libro: Libro) {
    return this.http.post<Libro>(this.baseUrl, libro, this.httpOptions);
  }

  modificar(nombre: string, libro: Libro) {
    const url = this.baseUrl + '/' + nombre;
    this.http.put(url, libro)
      .subscribe(
        (response) => {
          console.log('Resultado: ' + response);
        },
        (error) => console.log('Error: ' + error)
      );
  }

  eliminar(nombre: string) {
    const url = this.baseUrl + '/' + nombre;
    this.http.delete(url)
      .subscribe(
        (response) => {
          console.log('Resultado: ' + response);
        },
        (error) => console.log('Error: ' + error)
      );
  }
}
