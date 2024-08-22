import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductAddComponent } from './product-add.component';
import { ProductRegisterUseCase } from 'src/domain/usecases/product-register.usecase';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let mockProductRegisterUseCase: jasmine.SpyObj<ProductRegisterUseCase>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear un mock de ProductRegisterUseCase
    mockProductRegisterUseCase = jasmine.createSpyObj('ProductRegisterUseCase', ['execute']);
    mockProductRegisterUseCase.execute.and.returnValue(of({
      id: "cod_uno",
      name: "Producto desde test",
      description: "Se crea test con Jest",
      logo: "c/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2024-08-23",
      date_revision: "2024-08-25"
    })); // Mockea la respuesta del método execute

    // Crear un mock de Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProductAddComponent],
      imports: [FormsModule], // Asegúrate de importar FormsModule aquí
      providers: [
        { provide: ProductRegisterUseCase, useValue: mockProductRegisterUseCase },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRegister with the correct product data', () => {
    spyOn(component, 'getRegister').and.callThrough(); // Espía en getRegister para verificar la llamada
    const form: NgForm = {
      valid: true,
      value: {
        id: '123ooo',
        name: 'Producto desde Test Jest',
        description: 'Product Description',
        logo: 'product-logo.png',
        date_release: '2024-08-24',
        date_revision: '2025-08-26'
      },
      reset: jasmine.createSpy('reset')
    } as any;
  
    component.submitForm(form);
  
    expect(component.getRegister).toHaveBeenCalledWith({
      id: '123ooo',
      name: 'Producto desde Test Jest',
      description: 'Product Description',
      logo: 'product-logo.png',
      date_release: '2024-08-24',
      date_revision: '2025-08-26'
    });
  
    expect(mockProductRegisterUseCase.execute).toHaveBeenCalledWith({
      id: '123ooo',
      name: 'Producto desde Test Jest',
      description: 'Product Description',
      logo: 'product-logo.png',
      date_release: '2024-08-24',
      date_revision: '2025-08-26'
    });
  });
  
  it('Llamar getUpdate con los datos correctos de product cuando es enviado el formulario', () => {
    // Espía en el método getRegister
    spyOn(component, 'getRegister').and.callThrough();
  
    // Configurar el formulario con valores de prueba
    const form: NgForm = {
      valid: true,
      value: {
        id: '123ooo',
        name: 'Producto desde Test Jest',
        description: 'Product Description',
        logo: 'product-logo.png',
        date_release: '2024-08-24',
        date_revision: '2025-08-26'
      },
      reset: jasmine.createSpy('reset')
    } as any;
  
    // Asignar el formulario al componente
    component.submitForm(form);
  
    // Simular un clic en el botón de enviar
    const button = fixture.nativeElement.querySelector('#btnEnviar') as HTMLButtonElement;
    button.click();
  
    // Verificar que el método getRegister fue llamado con los datos correctos
    expect(component.getRegister).toHaveBeenCalledWith({
      id: '123ooo',
      name: 'Producto desde Test Jest',
      description: 'Product Description',
      logo: 'product-logo.png',
      date_release: '2024-08-24',
      date_revision: '2025-08-26'
    });
  });

  
  // it('clic en el boton Enviar ', () => {
  //   const button = compiled.querySelector('button#btnEnviar') as HTMLButtonElement;
  //   button.click();
  //   let data = {
  //     id: '123ooo',
  //     name: 'Producto desde Test Jest',
  //     description: 'Product Description',
  //     logo: 'product-logo.png',
  //     date_release: '2024-08-21',
  //     date_revision: '2025-08-21'
  //   }

  //   // expect(component.getRegister(data)).toBe(
  //   //   {
  //   //     id: '123ooo',
  //   //     name: 'Producto desde Test Jest',
  //   //     description: 'Product Description',
  //   //     logo: 'product-logo.png',
  //   //     date_release: '2024-08-21',
  //   //     date_revision: '2025-08-21'
  //   //   }
  //   // );
  //   expect(component.getRegister(data)).toEqual({
  //     id: '123ooo',
  //     name: 'Producto desde Test Jest',
  //     description: 'Product Description',
  //     logo: 'product-logo.png',
  //     date_release: '2024-08-21',
  //     date_revision: '2025-08-21'
  //   });
  // })

  // expect(component.getRegister(data)).toEqual({
  //   id: '123ooo',
  //   name: 'Producto desde Test Jest',
  //   description: 'Product Description',
  //   logo: 'product-logo.png',
  //   date_release: '2024-08-21',
  //   date_revision: '2025-08-21'
  // });
});