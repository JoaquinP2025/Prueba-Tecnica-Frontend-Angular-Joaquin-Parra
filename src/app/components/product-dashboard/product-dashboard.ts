import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-dashboard.html',
  styleUrls: ['./product-dashboard.scss']
})
export class ProductDashboard implements OnInit {

  products: Product[] = [];

  // Formulario reactivo
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  // Modal
  isModalOpen = false;
  modalTop = 100;
  modalLeft = 100;

  // Drag
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Validaciones para el template
  get nameInvalid() {
    const control = this.addProductForm.get('name');
    return control?.invalid && control?.touched;
  }

  get priceInvalid() {
    const control = this.addProductForm.get('price');
    return control?.invalid && control?.touched;
  }

  get stockInvalid() {
    const control = this.addProductForm.get('stock');
    return control?.invalid && control?.touched;
  }

  // CRUD Productos
  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  submitAddProduct() {
    if (this.addProductForm.valid) {
      const newProduct: Product = this.addProductForm.value;
      this.productService.addProduct(newProduct);
      this.loadProducts();
      this.closeModal();
      this.addProductForm.reset({ stock: 0, price: 0 });
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }

  // Modal
  openAddProductModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Drag del modal
  startDrag(event: MouseEvent) {
    const modal = (event.currentTarget as HTMLElement).closest('.modal-wrapper') as HTMLElement;
    if (!modal) return;

    this.dragOffsetX = event.clientX - modal.offsetLeft;
    this.dragOffsetY = event.clientY - modal.offsetTop;

    const mouseMove = (moveEvent: MouseEvent) => {
      this.modalLeft = moveEvent.clientX - this.dragOffsetX;
      this.modalTop = moveEvent.clientY - this.dragOffsetY;
    };

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  }
}

















