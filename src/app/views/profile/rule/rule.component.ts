import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { RuleService } from '../../../services/rule/rule.service';
import { Rule } from '../../../models/rule';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../models/profile';
import { Router } from '@angular/router';
import { PageService } from '../../../services/pagenate/page.service';
import { PagenateComponent } from '../../../components/pagenate/pagenate.component';
import { RuleProfile } from '../../../models/rule-profile';
import { AccessPageService } from '../../../services/page/page.service';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent extends PagenateComponent implements OnInit {

  @Input() pk: any;
  @Input() lg = false;

  @Output() reloadFatherComponent = new EventEmitter();
  @Output() confirm = new EventEmitter();


  options: any[] = ['Visualizar', 'Criar', 'Editar', 'Desabilitar'];
  checked: any[] = new Array();

  rule: Rule = new Rule();

  pageSelected: Page[] = new Array();

  profile: Profile = new Profile();
  hasdata: boolean;

  constructor(
    pagerService: PageService,
    private http: Http,
   // private ruleService: RuleService,
    private profileService: ProfileService,
    private ruleService: RuleService,
    private accessPageService: AccessPageService,
    private router: Router) {
      super(pagerService);
      this.hasdata = false;
    }

  ngOnInit() {
  }

  updateChecked(option, event) {
    console.log('event.target.value ' + event.target.value);
    const index = this.checked.indexOf(option);
    if (event.target.checked) {
      console.log('insert');
      if ( index === -1) {
        this.checked.push(option);
      }
    } else {
      console.log('delete');
      if ( index !== -1) {
        this.checked.splice(index, 1);
      }
    }
    console.log(this.checked);
  }

  verifyRules() {
    for (let i = 0; i < this.checked.length; i++) {
      if (this.checked[i] === this.options[0]) {
        this.rule.read = true;
        console.log(this.rule.read);
      }
      if (this.checked[i] === this.options[1]) {
        this.rule.create = true;
        console.log(this.rule.create);
      }
      if (this.checked[i] === this.options[2]) {
        this.rule.update = true;
        console.log(this.rule.update);
      }
      if (this.checked[i] === this.options[3]) {
        this.rule.delete = true;
        console.log(this.rule.delete);
      }
    }
    console.log('view', this.rule.read);
  }


  confirmRules() {

    this.verifyRules();
    this.rule.read = true;
    this.profile = this.accessPageService.getProfile();
    this.pageSelected = this.accessPageService.getPages();
    this.rule.profile_id = this.profile.id;
    console.log('Regra:', this.rule);
    if (this.pageSelected.length > 0) {
      for (let i = 0; i < this.pageSelected.length; i++) {
        this.rule.page_id = this.pageSelected[i].id;
        this.ruleService.saveRule(this.rule).subscribe(
          success => {
            this.profile.rule = new Array();
            this.profile.rule.push(success);
            this.confirm.emit(true);
            console.log('Regra adicionada ao perfil:', this.profile.rule);
            this.reloadFatherComponent.emit({result: true});
            this.profileService.saveEditProfile(this.profile).subscribe(
              succe2s => {
                console.log('Perfil editado:', success);
                this.reloadFatherComponent.emit({result: true});
              },
              error => {
                this.reloadFatherComponent.emit({result: true});
              }
            );
          },
          error => {
            this.reloadFatherComponent.emit({result: true});
          }
        );
      }
    }
  }
}
