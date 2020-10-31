import { Component, OnInit } from '@angular/core';
import {ButtonRendererComponent} from './renderer/button-renderer/button-renderer.component';
import {Libro} from '../libro.model';
import {LibroServiceData} from '../services/libro-service.service';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit {

  libros: Libro[] = [];
  name = 'Angular 6';
  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};

  formularioLibro: FormGroup;

  constructor(private libroService: LibroServiceData,
              private modal: NgbModal,
              private fb: FormBuilder) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  columnDefsLibro = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Descripción',
      field: 'descripcion',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Autor',
      field: 'autor',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Fecha',
      field: 'fecha',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Ejemplares',
      field: 'ejemplares',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Costo',
      field: 'costo',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Editar',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick2.bind(this),
        label: 'editar'
      }
    },
    {
      headerName: 'Eliminar',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'eliminar'
      }
    }
  ];

  gridOptions = {
    defaultColDef: {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    },
    suppressRowClickSelection: true,
    groupSelectsChildren: true,
    debug: true,
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    enableRangeSelection: true,
    columnDefs: this.columnDefsLibro,
    pagination: true
  };

  abrirModalLibro(content) {
    this.modal.open(content, {size: 'xl', centered: true});
    this.crearFormularioLibro();
  }

  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
    const nombre = e.rowData.nombre;
    console.log(e.rowData.nombre);
    this.libroService.eliminarLibro(nombre);
  }

  onBtnClick2(e) {
    this.rowDataClicked1 = e.rowData;
    const nombre = e.rowData.nombre;
    console.log(e.rowData.nombre);
  }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.obtenerLibros()
      .subscribe(
        (libros: Libro[]) => {
          this.libros = libros;
          this.libroService.setLibros(libros);
        }
      );
  }

  guardarLibro() {
    if(this.formularioLibro.valid) {
      const libroGuardar = new Libro(this.formularioLibro.value.nombre,
        this.formularioLibro.value.descripcion,
        this.formularioLibro.value.autor,
        this.formularioLibro.value.fecha,
        this.formularioLibro.value.ejemplares,
        this.formularioLibro.value.costo);

      this.libroService.agregarLibro(libroGuardar);
      this.cargarLibros();
      this.modal.dismissAll();
    } else {
      return Object.values(this.formularioLibro.controls).forEach(control => {
        if (control instanceof FormGroup) {
          // tslint:disable-next-line:no-shadowed-variable
          Object.values(control.controls). forEach( control => control.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
    }
  }

  crearFormularioLibro() {
    this.formularioLibro = this.fb.group( {
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
      fecha: ['', Validators.required],
      ejemplares: ['', Validators.required],
      costo: ['', Validators.required]
    });
  }

  get NombreNoValido() {
    return this.formularioLibro.get('nombre').invalid && this.formularioLibro.get('nombre').touched;
  }

  get DescripcionNoValido() {
    return this.formularioLibro.get('descripcion').invalid && this.formularioLibro.get('descripcion').touched;
  }

  get AutorNoValido() {
    return this.formularioLibro.get('autor').invalid && this.formularioLibro.get('autor').touched;
  }

  get FechaNoValido() {
    return this.formularioLibro.get('fecha').invalid && this.formularioLibro.get('fecha').touched;
  }

  get EjemplaresNoValido() {
    return this.formularioLibro.get('ejemplares').invalid && this.formularioLibro.get('ejemplares').touched;
  }

  get CostoNoValido() {
    return this.formularioLibro.get('costo').invalid && this.formularioLibro.get('costo').touched;
  }
}
