import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Bem-vindo à Página Inicial!';
  description = 'Esta é uma aplicação Angular estilizada com Sass.';
}
