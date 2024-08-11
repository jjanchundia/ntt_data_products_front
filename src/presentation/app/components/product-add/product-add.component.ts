import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductRegisterUseCase } from 'src/domain/usecases/product-register.usecase';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  constructor(
    private productRegister: ProductRegisterUseCase,
    private router: Router
  ) { }

  resetForm(form: NgForm) {
    form.reset();
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      const newProduct = form.value;
      console.log('New Product:', newProduct);
      this.getRegister(newProduct);
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

  getRegister(product: any) {
    this.productRegister.execute({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.date_release,
      date_revision: product.date_revision
    }).subscribe((r) => console.log(r));
  }
}
