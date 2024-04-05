import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeRoute: string = '';
  dropdowns: { [key: string]: boolean } = {};

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    // Add click event listener to the logout link
    document.getElementById('logout')?.addEventListener('click', this.logout.bind(this));
  }

  logout(event: Event) {
    event.preventDefault(); // Prevent the default link behavior
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  toggleDropdown(dropdownName: string) {
    this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];

    Object.keys(this.dropdowns).forEach(key => {
      if (key !== dropdownName) {
        this.dropdowns[key] = false;
      }
    });
  }

  isActiveRoute(route: string): boolean {
    return this.activeRoute === route;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

