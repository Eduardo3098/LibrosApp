import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LibroService} from './services/libro.service';
import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import {LibroServiceData} from './services/libro-service.service';
import { AgGridModule } from 'ag-grid-angular';
import {ButtonRendererComponent} from './component/renderer/button-renderer/button-renderer.component';
import { LibroComponent } from './component/libro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ButtonRendererComponent,
    LibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LibroService,
    LibroServiceData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
