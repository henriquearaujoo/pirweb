import { Visit } from './visit';
import { Profile } from './profile';
import { Address } from './address';
import { Person } from './person';
import { Org } from './org';

export class User {
    public login: string;
    public id: string;
    public name: string;
    public email: string;
    public person: Person = new Person();
    public entity: Org = new Org();
    public profile_id: string;
    public profile: Profile = new Profile();
    public password: string;
    public type: string;
    public status: boolean;
    public dt_register: string;
    public address: Address = new Address();
    public community_id: string;
    // public longitude: number;
    // public latitude: number;

    public visits: Visit[] = new Array();
    constructor() { }
}
