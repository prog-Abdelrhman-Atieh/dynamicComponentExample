import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  sideMenuItems: Array<{icon: string, label: string}> = [
    {icon: 'icon-dashboard', label: 'Dashboard'},
    {icon: 'icon-bar_chart', label: 'Leader Board'},
    {icon: 'icon-work_outline', label: 'Order'},
    {icon: 'icon-mail_outline', label: 'Mails'},
  ]
}
