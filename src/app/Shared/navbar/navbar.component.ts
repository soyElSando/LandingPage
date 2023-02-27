import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _router: Router) { }

  scrollTo(element: any): void {
    this._router.navigate(['']).then(() => {
      (document.getElementById(element) as HTMLElement)
      .scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }
}
