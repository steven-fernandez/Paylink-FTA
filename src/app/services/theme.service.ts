import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: 'dark' | 'light' = 'light';

  constructor() {
    this.loadInitialTheme();
  }

  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  enableDarkMode(): void {
    this.currentTheme = 'dark';
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark');
  }

  enableLightMode(): void {
    this.currentTheme = 'light';
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark');
  }

  toggleTheme(): void {
    this.isDarkMode() ? this.enableLightMode() : this.enableDarkMode();
  }

  loadInitialTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.enableLightMode();
    }
  }
  
}
