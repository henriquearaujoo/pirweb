import { City } from './city';
export class Address {
    public street: string;
    public neighborhood: string;
    public number: string;
    // public id: string;
    public complement: string;
    public postalcode: string;
    public city: City = new City();
    public city_id: string;
    public state: string;

}
