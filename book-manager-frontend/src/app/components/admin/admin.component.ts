import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  activeMenu: string = '';

  isMobile: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeMenu = <string>this.router.url.split('/').pop();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.isMobile = true;
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.isMobile = false;
      }
    });
  }

  sidenavToggle() {
    this.sidenav.toggle();
  }

  setMenuActive(menu: string) {
    this.activeMenu = menu;
  }

  getNotifEvent(event: any) {
    this.activeMenu = event.menu;
  }
}
