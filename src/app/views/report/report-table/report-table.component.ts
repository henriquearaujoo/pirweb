import { PageService } from './../../../services/pagenate/page.service';
import { PagenateComponent } from './../../../components/pagenate/pagenate.component';
import { EUserType } from './../../../enums/userType';
import { EProfileType } from './../../../enums/eProfileType';
import { EMediaType } from './../../../enums/eMediaType';
import { EHabitationType } from './../../../enums/eHabitationType';
import { EFormQuestionType } from './../../../enums/eFormQuestionType';
import { EFormType } from './../../../enums/eFormType';
import { ECommunityZone } from './../../../enums/eCommunityZone';
import { EAudience } from './../../../enums/eAudience';
import { EAnswerType } from './../../../enums/eAnswerType';
import { ECivilState } from './../../../enums/eCivilState';
import { VariableType } from './../../../enums/variable_type';
import { Component, OnInit, Input } from '@angular/core';
import { EChildGender } from '../../../enums/eChildGender';
import { DatePipe } from '@angular/common';

declare const $: any;
@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent extends PagenateComponent implements OnInit {

    @Input() headerList: any;
    @Input() rootEntity: any;
    @Input() headerShower: boolean[];
    @Input() pagedItems: any;
    private applyFilter = false;
    private type = 'hidden';
    private varType = new VariableType();
    private hasdata: boolean;
    public table: any;

    constructor(private pagerService: PageService) {
        super(pagerService);
        this.hasdata = false;
    }

    ngOnInit() {
        this.getCivilState();
    }

    private filterApply(event, h, i) {

        // const datePipe = new DatePipe('pt-BR');
        // const f = this.table.filter(o => o[i] === datePipe.transform(event.target.value, 'dd/MM/yyyy'));
        // this.allItems = f;

        // else { }

        const varType = new VariableType();
        const temp = this.allItems;
        let v;
        switch (varType.getValue(h.type)) {
            case 0:
                v = this.allItems.filter(o => o[i].includes(event.target.value));
                this.allItems = v;
            break;
            case 1:
                v = this.allItems.filter(o => o[i].includes(event.target.value));
                this.allItems = v;
            break;
            case 2:
                v = this.allItems.filter(o => o[i].includes(event.target.value));
                this.allItems = v;
            break;
            case 3:
                const datePipe = new DatePipe('pt-BR');
                const dt = new Date(event.target.value);
                v = this.allItems.filter(o => o[i] === datePipe.transform(event.target.value, 'dd/MM/yyyy'));
                this.allItems = v;
            break;
            default:
                v = this.allItems.filter(o => o[i].includes(event.target.value));
                this.allItems = v;
            break;
        }
        if (this.allItems.length > 0) {
            this.hasdata = true;
            this.setPage(1);
        }else {
            this.allItems = temp;
        }
    }

    private reset() {
        if (this.table !== undefined) {
            this.loadData(this.rootEntity, this.headerList, this.headerShower, this.table);
            // this.allItems = this.table;
            // if (this.allItems.length > 0) {
            //     this.hasdata = true;
            //     this.setPage(1);
            // }
        }
        // this.applyFilter = false;
    }

    private filter() {
        this.applyFilter = !this.applyFilter;
    }

    public loadData(currentTable, headerList, headerShower, table) {
        this.allItems = table;
        this.table = table;
        if (this.allItems.length > 0) {
            this.hasdata = true;
            this.setPage(1);
        }
        this.rootEntity = currentTable;
        this.headerList = headerList;
        this.headerShower = headerShower;
        this.applyFilter = false;
    }

    // ==================== Enum ========================
    private getCivilState() {
        const x = Object.keys(ECivilState);
        const v = Object.values(ECivilState);
        const listCivilState = new Array();
        for (let i = 0; i < x.length; i++) {
            listCivilState.push({key: v[i], value: v[i]});
        }
        return listCivilState;
    }

    private getEAnswerType() {
        const x = Object.keys(EAnswerType);
        const v = Object.values(EAnswerType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEAudience() {
        const x = Object.keys(EAudience);
        const v = Object.values(EAudience);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEChildGender() {
        const x = Object.keys(EChildGender);
        const v = Object.values(EChildGender);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getECommunityZone() {
        const x = Object.keys(ECommunityZone);
        const v = Object.values(ECommunityZone);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEFormType() {
        const x = Object.keys(EFormType);
        const v = Object.values(EFormType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEFormQuestionType() {
        const x = Object.keys(EFormQuestionType);
        const v = Object.values(EFormQuestionType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEHabitationType() {
        const x = Object.keys(EHabitationType);
        const v = Object.values(EHabitationType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEMediaType() {
        const x = Object.keys(EMediaType);
        const v = Object.values(EMediaType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEProfileType() {
        const x = Object.keys(EProfileType);
        const v = Object.values(EProfileType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }

    private getEUserType() {
        const x = Object.keys(EUserType);
        const v = Object.values(EUserType);
        const list = new Array();
        for (let i = 0; i < x.length; i++) {
            list.push({key: v[i], value: v[i]});
        }
        return list;
    }
}
