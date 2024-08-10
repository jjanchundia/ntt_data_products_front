import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/domain/models/product.model';
import { ProductDeleteUseCase } from 'src/domain/usecases/product-delete.usecase';
import { ProductRegisterUseCase } from 'src/domain/usecases/product-register.usecase';
import { ProductUpdateUseCase } from 'src/domain/usecases/product-update.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clean-architecture-angular';

  products: ProductModel[] = [];

  constructor(
    private productUpdate: ProductUpdateUseCase,
  ) { }
  
  onProductsChange(filteredProducts: ProductModel[]) {
    this.products = filteredProducts;
  }

  

  getUpdate() {
    this.productUpdate.execute({
      id: "string_1",
      name: "Prueba Update",
      description: "12345678900",
      logo: "11",
      date_release: "2025-01-01",
      date_revision: "2025-01-01"
    })
      .subscribe((r) => console.log(r));
  }

  ngOnInit(): void {
  }
}
