import { City } from './city';
export class Community {
    public id: string;
    public name: string;
    public regional: string;
    public uc: string;
    public city_id: string;
    public zone: string;
    public water_supply: string;
    public has_eletricity: boolean;
    public garbage_destination: string;
    public access_via: string;
    public main_income: string;
    public health_service: string;
    public has_kindergarten: boolean;
    public has_elementary_school: boolean;
    public has_high_school: boolean;
    public has_college: boolean;
    public has_community_center: boolean;
    public has_religious_place: boolean;
    public has_cultural_events: boolean;
    public has_patron: boolean;
    public cultural_production: string;
    public has_community_leaders: string;
    public longitude: number;
    public latitude: number;
    public city: City = new City();
    // public status: boolean;

// tslint:disable-next-line:eofline
}