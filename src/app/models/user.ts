import { Address } from './address';
import { Person } from './person';
import { Org } from './org';

export class User {
	private email: string;
	public username: string;

	public id: string;
	public name: string;
	public person: Person = new Person();
	public org: Org = new Org();
	public ie: string;
	public cnpj: string;
	public social_reason: string;
	public nickname: string;
	public profile_id: number;
	public login: string;
	public password: string;
	public type: string;
	public status: boolean;
	public dt_register: string;
	public address: Address = new Address();
	public city_id: string;
	constructor() { }
}