import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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
  toTemplateForms(){
    this.router.navigate(['templateForms']);
  }

  toUser(){
    this.router.navigate(['user']);
  }

  toUserList(){
    this.router.navigate(['user-list']);
  }

  toProfile(){
    this.router.navigate(['profile']);
  }

  toProfileList(){
    this.router.navigate(['profile-list']);
  }
}
