import { Observable } from 'rxjs';
import { UseCase } from 'src/base/use-case';
import { ProductModel } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

export class ProductUpdateUseCase implements UseCase<{ 
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
 }, ProductModel> {

    constructor(private ProductRepository: ProductRepository) { }

    execute(
        params: { 
            id: string,
            name: string;
            description: string;
            logo: string;
            date_release: string;
            date_revision: string; },
    ): Observable<ProductModel> {
        return this.ProductRepository.update(params);
    }
}