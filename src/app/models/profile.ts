import { Rule } from './rule';

export class Profile {
    public id: number;
    public name: string;
    public dt_register: Date;
    public status: number;
    public user_who_was_register: number;
    rule    :Rule = new Rule();

    constructor(id?: number, name?: string){
        this.id = id;
        this.name = name;
    }
}