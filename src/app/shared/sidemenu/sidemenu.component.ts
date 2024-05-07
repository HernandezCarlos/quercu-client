import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuComponent {

  public isOpen = false;
  public isMobile = true;
  
  public menuItems = routes
  .map( route => route.children ?? [])
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes('form'))



  constructor() {
    this.checkDeviceSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkDeviceSize();
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  private checkDeviceSize() {
    this.isMobile = window.innerWidth < 768;
  }
  
 }
