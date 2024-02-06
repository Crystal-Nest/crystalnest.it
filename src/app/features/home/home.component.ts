import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'cn-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
