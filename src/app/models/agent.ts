import { Regional } from './regional';
import { Unity } from './unity';
import { City } from './city';

export class Agent {
    public id: string;
    public birth: string;
    public code: string;
    public gender: string;
    public is_phone_owner: boolean;
    public phone: string;
    public city: City = new City();
    public unity: Unity = new Unity();
    public longitude: number;
    public latitude: number;

    public regional: Regional = new Regional();
}
