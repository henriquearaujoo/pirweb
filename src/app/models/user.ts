import { Address } from './address';
import { Person } from './person';
import { Org } from './org';

export class User {
    public login: string;
    public id: string;
    public name: string;
    public email: string;
    public pfis: Person = new Person();
    public pjur: Org = new Org();
    public profile: string;
    public password: string;
    public type: string;
    public status: boolean;
    public dt_register: string;
    public address: Address = new Address();
    // public city_id: string;

    constructor() { }
}