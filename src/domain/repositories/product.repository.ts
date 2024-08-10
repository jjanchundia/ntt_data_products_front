import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

export abstract class ProductRepository {

    abstract register(params: {
        id?: string;
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
    }): Observable<ProductModel>;

    abstract update(params: {
        id?: string;
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
    }): Observable<ProductModel>;

    abstract delete(id: string): Observable<void>;
    
    abstract getAllProducts(): Observable<ProductModel[]>;
}