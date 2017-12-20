import { Rule } from './rule';

export class Page {
    public id:     number;
    public title:   string;
    public route: string;
    public rules: Rule[] = new Array();
}