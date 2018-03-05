import { Mother } from './mother';
export class Responsible {
    public id: string;
    public name: string;
    // public uc: string;
    // public regional: string;
    public community_id: string;
    public birth: string;
    public in_social_program: boolean;
    public habitation_type: string;
    public live_with: string;
    public income_participation: string;
    public habitation_members_count: number;
    public family_income: string;
    public drinking_water_treatment: string;
    public has_hospital_nearby: boolean;
    public has_sanitation: boolean;
    public has_other_children: boolean;
    public mother: Mother = new Mother();

    public family_income_other: string;
    public drinking_water_treatment2: boolean;

// tslint:disable-next-line:eofline
}