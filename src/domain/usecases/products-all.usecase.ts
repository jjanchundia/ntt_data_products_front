import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { ProductModel } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

export class ProductAllUseCase implements UseCase<{}, ProductModel[]> {

    constructor(private ProductRepository: ProductRepository) { }

    execute(): Observable<ProductModel[]> {
         return this.ProductRepository.getAllProducts();
     }
}