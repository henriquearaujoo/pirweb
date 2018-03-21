import { City } from './city';
export class State {
    public id: string;
    public name: string;
    public uf: string;
    public cities: City[] = new Array();
}

