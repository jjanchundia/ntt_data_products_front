import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductAllUseCase } from 'src/domain/usecases/products-all.usecase';
import { ProductRegisterUseCase } from 'src/domain/usecases/product-register.usecase';
import { ProductImplementationRepository } from './repositories/user/product-implementation.repository';
import { ProductUpdateUseCase } from 'src/domain/usecases/product-update.usecase';
import { ProductDeleteUseCase } from 'src/domain/usecases/product-delete.usecase';

const ProductAllUseCaseFactory = 
(productRepo: ProductRepository) => new ProductAllUseCase(productRepo);
export const ProductAllUseCaseProvider = {
    provide: ProductAllUseCase,
    useFactory: ProductAllUseCaseFactory,
    deps: [ProductRepository],
};

const productRegisterUseCaseFactory = 
(productRepo: ProductRepository) => new ProductRegisterUseCase(productRepo);
export const productRegisterUseCaseProvider = {
    provide: ProductRegisterUseCase,
    useFactory: productRegisterUseCaseFactory,
    deps: [ProductRepository],
};

const productUpdateUseCaseFactory = 
(productRepo: ProductRepository) => new ProductUpdateUseCase(productRepo);
export const productUpdateUseCaseProvider = {
    provide: ProductUpdateUseCase,
    useFactory: productUpdateUseCaseFactory,
    deps: [ProductRepository],
};

const productDeleteUseCaseFactory = 
(productRepo: ProductRepository) => new ProductDeleteUseCase(productRepo);
export const productDeleteUseCaseProvider = {
    provide: ProductDeleteUseCase,
    useFactory: productDeleteUseCaseFactory,
    deps: [ProductRepository],
};

@NgModule({
    providers: [
        ProductAllUseCaseProvider,
        productRegisterUseCaseProvider,
        productUpdateUseCaseProvider,
        productDeleteUseCaseProvider,
        { provide: ProductRepository, useClass: ProductImplementationRepository },
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
})
export class DataModule { }