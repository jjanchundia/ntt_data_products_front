import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/domain/models/product.model';
import { ProductDeleteUseCase } from 'src/domain/usecases/product-delete.usecase';
import { ProductAllUseCase } from 'src/domain/usecases/products-all.usecase';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {

  @Input() products: ProductModel[] = [];
  @Output() productsChange = new EventEmitter<ProductModel[]>();

  originalProducts: ProductModel[] = []; // Nueva variable para mantener la lista original
  filteredProducts: ProductModel[] = [];
  searchTerm: string = '';
  isModalOpen: boolean = false;
  selectedProduct: ProductModel | null = null;

  // Variables para paginación
  currentPage: number = 1;
  itemsPerPage: number = 5; // Default value is 5
  totalItems: number = 0;

  constructor(
    private product: ProductAllUseCase,
    private productDelete: ProductDeleteUseCase,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductAll();
  }

  getProductAll() {
    this.product.execute().subscribe((r) => {
      this.originalProducts = [...r]; // Almacena la lista original
      this.filteredProducts = [...r]; // Inicialmente, la lista filtrada es la misma que la original
      this.totalItems = r.length;
      this.paginateProducts(); // Aplica la paginación inmediatamente después de cargar los datos
    });
  }

  filterProducts() {
    // Filtrar siempre a partir del array original `products`
    this.filteredProducts = this.originalProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.date_release.includes(this.searchTerm) ||
      product.date_revision.includes(this.searchTerm)
    );

    this.totalItems = this.filteredProducts.length;
    this.paginateProducts(); // Aplica la paginación después de filtrar
  }

  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.filteredProducts.slice(startIndex, endIndex);
    this.productsChange.emit(this.products);
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(selectElement.value);
    this.currentPage = 1;
    this.paginateProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginateProducts();
  }

  editProduct(product: ProductModel) {
    this.router.navigate(['/edit-product'], { queryParams: { ...product } });
  }

  openModal(product: ProductModel) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  confirmDelete() {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.deleteProduct(this.selectedProduct);
      this.closeModal();
    }
  }

  deleteProduct(product: ProductModel) {
    console.log('Eliminar producto:', product);
    this.productDelete.execute(product.id!)
      .subscribe(() => {
        console.log('Producto eliminado');
        this.getProductAll();
      });
  }

  getDelete(id: string) {
    this.productDelete.execute(id)
      .subscribe(() => console.log('Producto eliminado'));
  }
}