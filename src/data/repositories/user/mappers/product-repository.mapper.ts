import { Mapper } from 'src/base/mapper';
import { ProductModel } from 'src/domain/models/product.model';
import { ProductsEntity } from '../entities/product-entity';


export class ProductImplementationRepositoryMapper extends Mapper<ProductsEntity, ProductModel> {
    mapFrom(param: ProductsEntity): ProductModel {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            logo: param.logo,
            date_release: param.date_release,
            date_revision: param.date_revision
        };
    }
    mapTo(param: ProductModel): ProductsEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            logo: param.logo,
            date_release: param.date_release,
            date_revision: param.date_revision
        }
    }
}