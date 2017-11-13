import { User } from './user';

export class Paginate {
    public content: User[] = new Array();
    public totalElements: number;
    public last: boolean;
    public totalPages: number;
    public size: number;
    public number: number;
    public sort: any[] = new Array();
    public first: boolean;
    public numberOfElements: boolean;
}