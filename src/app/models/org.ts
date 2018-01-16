import { User } from './user';

export class Org  extends User{
    public cnpj: string;
    public ie: string;
    public social_name: string;
    public fantasy_name: string;
}