import { Component } from '@angular/core';
import { ProductDashboard } from './components/product-dashboard/product-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductDashboard],
  templateUrl: './app.html'
})
export class App {}

