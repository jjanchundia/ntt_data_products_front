import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';
import { ProductUpdateUseCase } from 'src/domain/usecases/product-update.usecase';
import { of } from 'rxjs';
import { NgForm, FormsModule } from '@angular/forms';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  let mockProductUpdateUseCase: jasmine.SpyObj<ProductUpdateUseCase>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mock para ProductUpdateUseCase
    mockProductUpdateUseCase = jasmine.createSpyObj('ProductUpdateUseCase', ['execute']);
    mockProductUpdateUseCase.execute.and.returnValue(of({
      id: "cod_uno",
      name: "Producto Editado desde test",
      description: "Se edita producto con Jest",
      logo: "c/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2024-08-23", 
      date_revision: "2024-08-25"
    }));

    // Mock para Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mock para ActivatedRoute
    mockActivatedRoute = {
      queryParams: of({
        id: '123ooo',
        name: 'Producto Editado',
        description: 'Product Description Edited',
        logo: 'product-logo-edited.png',
        date_release: '2024-08-21',
        date_revision: '2025-08-21'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ProductEditComponent],
      imports: [FormsModule], // Asegúrate de importar FormsModule aquí
      providers: [
        { provide: ProductUpdateUseCase, useValue: mockProductUpdateUseCase },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Llamar getUpdate con los datos correctos de product cuando es enviado el formulario', () => {
    // Espía en el método getUpdate
    spyOn(component, 'getUpdate').and.callThrough();

    // Configurar el formulario con valores de prueba
    const form: NgForm = {
      valid: true,
      value: {
        id: '123456',
        name: 'Producto Editado desde Test Jest',
        description: 'Product Description Edited',
        logo: 'product-logo-edited.png',
        date_release: '2024-08-21',
        date_revision: '2025-08-21'
      },
      reset: jasmine.createSpy('reset')
    } as any;

    // Simular el envío del formulario
    component.submitForm(form);

    // Verificar que el método getUpdate fue llamado con los datos correctos
    expect(component.getUpdate).toHaveBeenCalledWith({
      id: '123456',
      name: 'Producto Editado desde Test Jest',
      description: 'Product Description Edited',
      logo: 'product-logo-edited.png',
      date_release: '2024-08-21',
      date_revision: '2025-08-21'
    });

    // Verificar que la navegación fue llamada correctamente
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});
