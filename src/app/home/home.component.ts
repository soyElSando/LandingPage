import { Component } from '@angular/core';
import { Carrousel } from 'src/app/models/Carrousel.model';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private HomeService: HomeService) { }
  promos :Carrousel[]= this.HomeService.getPromos()

}
