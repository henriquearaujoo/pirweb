import { Address } from './address';
import { Person } from './person';
import { Org } from './org';

export class User {
    public login: string;
    public id: string;
    public name: string;
    public email: string;
    public pfis: any;
    public pjur: any;
    public profile: string;
    public password: string;
    public type: string;
    public status: boolean;
    public dt_register: string;
    public address: Address = new Address();
    public community_id: string;

    constructor() { }
}
