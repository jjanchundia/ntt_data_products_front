import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAllComponent } from './components/product-all/product-all.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: ProductAllComponent },
  { path: 'add-product', component: ProductAddComponent },
  { path: 'edit-product', component: ProductEditComponent },  // Nueva ruta
  // Puedes agregar una ruta para redirigir rutas no encontradas
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
