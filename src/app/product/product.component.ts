import { Component } from '@angular/core';
import { Product } from '../../models/products.interface';
import { category } from '../../models/category.interface';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [CommonModule, ProductCardComponent]
})
export class ProductComponent {
  products: Product[] = [];
  categories: category[] | any= [];

  constructor() {
    this.fetchData();
  }
 
  async fetchData() {
    const url = 'https://dummyjson.com/products';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      this.products = data.products;
      
      const categoryMap = this.products.reduce((acc: any, product: Product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {});

      this.categories = Object.keys(categoryMap).map(category => ({
        name: category,
        products: categoryMap[category]
      }));

      console.log(this.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  scrollCarousel(direction: string, carouselId: string): void {
    const carousel:any = document.getElementById(`carousel-${carouselId}`);
    const scrollAmount = 300;
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
