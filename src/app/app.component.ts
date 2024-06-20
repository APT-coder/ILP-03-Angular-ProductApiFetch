import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from "./product/product.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ProductComponent]
})
export class AppComponent {
  title = 'FetchData';
  toFilter:string='';
}
