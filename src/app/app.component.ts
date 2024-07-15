import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardModule, HeaderComponent, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamicDashboard';
}
