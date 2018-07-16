import { City } from './city';
export class Unity {
    public id: string;
    public name: string;
    public abbreviation: string;
    public cities: City[] = new Array();

    public number: number;
}