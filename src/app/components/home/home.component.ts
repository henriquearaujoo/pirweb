import { ToastService } from './../../services/toast-notification/toast.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/login/authentication.service';
import { User } from '../../models/user';
import { Permissions } from '../../helpers/permissions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private day: number;
    private mouth: string;
    private year: number;
    private dayOfWeek: string;
    private userName: string;

    private currentUser: string;

    constructor(
      private permissions: Permissions,
      private toastService: ToastService
     ) {
    }

    ngOnInit() {
      const d = new Date();
      this.dayOfWeek = this.getDayOfWeek(d);
      this.day = d.getDate();
      this.mouth = this.getMouth(d);
      this.year = d.getFullYear();
      this.currentUser = localStorage.getItem('currentUserPir');
    }

    getMouth(d) {
      const month = new Array();
      month[0] = 'Janeiro';
      month[1] = 'Fevereiro';
      month[2] = 'Março';
      month[3] = 'Abril';
      month[4] = 'Maio';
      month[5] = 'Junho';
      month[6] = 'Julho';
      month[7] = 'Augosto';
      month[8] = 'Setembro';
      month[9] = 'Outubro';
      month[10] = 'Novembro';
      month[11] = 'Decembro';
      return month[d.getMonth()];
    }

    getDayOfWeek(d) {
      const weekday = new Array(7);
      weekday[0] =  'Domingo';
      weekday[1] = 'Segunda-Feira';
      weekday[2] = 'Terça-Feira';
      weekday[3] = 'Quarta-Feira';
      weekday[4] = 'Quinta-Feira';
      weekday[5] = 'Sexta-Feira';
      weekday[6] = 'Sábado';
      return  weekday[d.getDay()];
    }

}
