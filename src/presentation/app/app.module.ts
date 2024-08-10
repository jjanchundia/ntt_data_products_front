import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from 'src/data/data.module';
import { ProductAllComponent } from './components/product-all/product-all.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductAllComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
