import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductsEntity } from './entities/product-entity';
import { ProductImplementationRepositoryMapper } from './mappers/product-repository.mapper';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductModel } from 'src/domain/models/product.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ProductImplementationRepository extends ProductRepository {
    productMapper = new ProductImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    register(params: {
        id: string;
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
    }): Observable<ProductModel> {
        return this.http
            .post<ProductsEntity>('http://localhost:3002/bp/products', params) // Envía los parámetros directamente
            .pipe(map(this.productMapper.mapFrom));
    }

    delete(productId: string): Observable<void> {
        return this.http
            .delete<void>(`http://localhost:3002/bp/products/${productId}`);
    }

    update(params: {
        id:string,
        name: string;
        description: string;
        logo: string;
        date_release: string;
        date_revision: string;
    }): Observable<ProductModel> {
        return this.http
            .put<ProductsEntity>('http://localhost:3002/bp/products/'+params.id, params) // Envía los parámetros directamente
            .pipe(map(this.productMapper.mapFrom));
    }

    getAllProducts(): Observable<ProductModel[]> {
        return this.http.get<{ data: ProductsEntity[] }>('http://localhost:3002/bp/products').pipe(
            map(response => response.data.map(this.productMapper.mapFrom)) // Mapea la lista de ProductsEntity a ProductModel[]
        );
    }
}