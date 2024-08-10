import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { ProductRepository } from '../repositories/product.repository';

export class ProductDeleteUseCase implements UseCase<string, void> {
    constructor(private productRepository: ProductRepository) { }

    execute(productId: string): Observable<void> {
        return this.productRepository.delete(productId);
    }
}