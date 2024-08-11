import { Component } from '@angular/core';
import { ProductModel } from 'src/domain/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clean-architecture-angular';

  products: ProductModel[] = [];

  onProductsChange(filteredProducts: ProductModel[]) {
    this.products = filteredProducts;
  }

  ngOnInit(): void {
  }
}