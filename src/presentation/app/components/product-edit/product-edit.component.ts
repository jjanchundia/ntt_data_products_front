import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/domain/models/product.model';
import { ProductUpdateUseCase } from 'src/domain/usecases/product-update.usecase';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: ProductModel = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productUpdate: ProductUpdateUseCase,
    private router: Router // Inyectamos el servicio Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = {
        id: params['id'] || '',
        name: params['name'] || '',
        description: params['description'] || '',
        logo: params['logo'] || '',
        date_release: params['date_release'] || '',
        date_revision: params['date_revision'] || ''
      };
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      const productEdit = form.value;
      console.log('New Product:', productEdit);
      this.getUpdate(productEdit);
      this.router.navigate(['']);
    }
  }
   
  validateReleaseDate(form: NgForm) {
    const releaseDateControl = form.form.controls['date_release'];
    const revisionDateControl = form.form.controls['date_revision'];
  
    if (releaseDateControl && revisionDateControl) {
      const releaseDate = new Date(releaseDateControl.value);
      const revisionDate = new Date(revisionDateControl.value);
  
      if (releaseDate < new Date()) {
        releaseDateControl.setErrors({ invalidDate: true });
      } else {
        releaseDateControl.setErrors(null);
      }
  
      if (revisionDate.getFullYear() !== releaseDate.getFullYear() + 1 || 
          revisionDate.getMonth() !== releaseDate.getMonth() || 
          revisionDate.getDate() !== releaseDate.getDate()) {
        revisionDateControl.setErrors({ invalidDate: true });
      } else {
        revisionDateControl.setErrors(null);
      }
    }
  }
  
  getUpdate(product: ProductModel) {
    this.productUpdate.execute({
      id: product.id ?? "",
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.date_release,
      date_revision: product.date_revision
    })
      .subscribe((r) => console.log(r));
  }

}