import { City } from './city';
import { Regional } from './regional';
export class Unity {
    public id: string;
    public name: string;
    public abbreviation: string;
    public cities: City[] = new Array();
    public regional: Regional = new Regional();

    public number: number;
}
