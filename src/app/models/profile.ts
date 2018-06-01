import { Rule } from './rule';

export class Profile {
    public id: any;
    public title: string;
    public description: string;
    public created_by: string;
    public status: boolean;
    public updated_at: string;
    public rule: Rule[] = new Array();
    public type: string;
    public number: number;
    constructor(id?: number, description?: string) {
        this.id = id;
        this.description = description;
    }
}
