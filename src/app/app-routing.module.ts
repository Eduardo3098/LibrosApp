import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LibroComponent} from './component/libro.component';

const routes: Routes = [
  { path: '', component: LibroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
