import { Rule } from './rule';

export class Page {
    public id:     any;
    public title:   string;
    public route: string;
    public rules: Rule[] = new Array();
}
