import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductModel } from 'src/domain/models/product.model';
import { ProductDeleteUseCase } from 'src/domain/usecases/product-delete.usecase';
import { ProductAllUseCase } from 'src/domain/usecases/products-all.usecase';
import { ProductAllComponent } from './product-all.component';

describe('ProductAllComponent', () => {
  let component: ProductAllComponent;
  let fixture: ComponentFixture<ProductAllComponent>;
  let productAllUseCase: jasmine.SpyObj<ProductAllUseCase>;
  let productDeleteUseCase: jasmine.SpyObj<ProductDeleteUseCase>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear mocks para las dependencias
    const productAllUseCaseSpy = jasmine.createSpyObj('ProductAllUseCase', ['execute']);
    const productDeleteUseCaseSpy = jasmine.createSpyObj('ProductDeleteUseCase', ['execute']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProductAllComponent],
      providers: [
        { provide: ProductAllUseCase, useValue: productAllUseCaseSpy },
        { provide: ProductDeleteUseCase, useValue: productDeleteUseCaseSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAllComponent);
    component = fixture.componentInstance;
    productAllUseCase = TestBed.inject(ProductAllUseCase) as jasmine.SpyObj<ProductAllUseCase>;
    productDeleteUseCase = TestBed.inject(ProductDeleteUseCase) as jasmine.SpyObj<ProductDeleteUseCase>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Configura el comportamiento esperado de los métodos de los mocks
    productAllUseCase.execute.and.returnValue(of([
      { id: '1001', name: 'Product 1', description: 'Description desde Test 1', date_release: '2024-01-26', date_revision: '2024-01-28' },
      { id: '2001', name: 'Product 2', description: 'Description desde Test 2', date_release: '2024-01-26', date_revision: '2024-01-28' }
    ] as ProductModel[]));
  });

  it('Mostrar productos', () => {
    component.ngOnInit(); // Llama al método que debería ejecutar getProductAll

    expect(productAllUseCase.execute).toHaveBeenCalled(); // Verifica que execute fue llamado
    fixture.whenStable().then(() => {
      expect(component.originalProducts.length).toBe(2); // Verifica que los productos se almacenan correctamente
      expect(component.filteredProducts.length).toBe(2); // Verifica que los productos filtrados se almacenan correctamente
      expect(component.totalItems).toBe(2); // Verifica que el total de items es correcto
    });
  });

  it('Mostrar paginación de productos correcta', () => {
    component.itemsPerPage = 1; // Cambia el número de items por página
    component.currentPage = 1; // Cambia la página actual

    component.getProductAll(); // Ejecuta la función para aplicar la paginación
    fixture.whenStable().then(() => {
      expect(component.products.length).toBe(1); // Verifica que la paginación es correcta
      expect(component.products[0].name).toBe('Product 1'); // Verifica que el primer producto es el esperado
    });
  });

  it('Llamar a deleteProduct y getDelete con Id correcto', () => {
    const testProduct: ProductModel = { id: '1001', name: 'Test Product', description: 'Test Description', logo:"", date_release: '2024-01-01', date_revision: '2024-01-02' };
    
    // Simular la respuesta del método execute
    productDeleteUseCase.execute.and.returnValue(of()); // Supón que el método execute devuelve un Observable vacío

    // Llamar al método getDelete
    component.getDelete(testProduct.id!);

    // Verificar que el método execute fue llamado con el ID correcto
    expect(productDeleteUseCase.execute).toHaveBeenCalledWith(testProduct.id!);
    expect(productDeleteUseCase.execute).toHaveBeenCalledTimes(1); // Verifica que fue llamado solo una vez
  });
});
