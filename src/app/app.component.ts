import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'apitera-recruitment-task';
}
