import { Rule } from './rule';

export class Profile {
    public id: number;
    public title: string;
    public description: string;
    public created_by: string;
    public status: boolean;
    public modified_by: string;
    public rule: Rule[] = new Array();
    constructor(id?: number, description?: string) {
        this.id = id;
        this.description = description;
    }
}
