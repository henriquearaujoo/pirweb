import { Rule } from './rule';

export class Profile {
    public id: number;
    public title: string;
    public description: string;
    public dt_register: Date;
    public status: number;
    public user_who_was_register: number;
    public rule: Rule[] = new Array();
    constructor(id?: number, description?: string) {
        this.id = id;
        this.description = description;
    }
}