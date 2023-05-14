import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  darkMode = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem('darkMode')) {
      if(localStorage.getItem('darkMode') == 'true') {
        this.darkMode = true;
      }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', <unknown>this.darkMode as string);
  }

}
