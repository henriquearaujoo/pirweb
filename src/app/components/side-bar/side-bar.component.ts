import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
  private url: string;
  private routes: any[];
  private urlToNavigate: string;
  private isForm: boolean;
  private hide = false;
  private object: Object = { 'margin-top': (((window.screen.height) / 2 ) - 200) + 'px'};

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    console.log('state', state);
    console.log('snapshot', snapshot.url);
    this.url = snapshot.url;
    console.log('root', root);
  }

  ngOnInit() {
    // this.isActive([this.url, '/']);
    this.routes = this.router.config;
    localStorage.setItem('currentURL', this.router.url);
  }

  isActive(instruction: String[]): boolean {
    let result = false;
    instruction.forEach(element => {
      if (element.toString() === '/') {
        result = this.router.isActive(element.toString(), true);
      } else if (this.router.isActive(element.toString(), false)) {
        result = true;
      }
    });
    return result;
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }
  toAgent() {
    this.router.navigate(['agent']);
  }
  toMaps() {
    this.router.navigate(['maps']);
  }
  toTemplateChapter() {
    this.router.navigate(['template-chapter']);
  }

  toUser() {
    this.router.navigate(['user']);
  }

  toUserList() {
    this.router.navigate(['user-list']);
  }

  toProfile() {
    this.router.navigate(['profile']);
  }

  toProfileList() {
    this.router.navigate(['profile-list']);
  }

  private redirectTo(componentName: string) {

    const currentURL = this.router.url;
    this.urlToNavigate = componentName;

    if (currentURL === null) {
      this.router.navigate([this.urlToNavigate]);
    } else {
      this.isForm = (currentURL.toLowerCase() === '/chapter-dashboard') ||
                    (currentURL.toLowerCase() === '/user');
      if (this.isForm) {
        (<HTMLButtonElement> document.getElementById('btnModal')).click();
      } else {
        this.router.navigate([this.urlToNavigate]);
      }
    }
  }

 confirmModalToLeavePage() {
    this.router.navigate([this.urlToNavigate]);
  }
}
