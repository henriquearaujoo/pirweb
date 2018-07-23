import { Child } from './child';
import { Pregnant } from './pregnant';
import { Community } from './community';
export class Responsible {
    public id: string;
    public name: string;
    public community: Community = new Community();
    public children: Child[] = new Array();
    public community_id: string;
    public children_count: number;
    public code: string;
    public family_income: string;
    public family_income_other: string;
    public habitation_members_count: number;
    public habitation_type: string;
    public has_hospital_nearby: boolean;
    public has_sanitation: boolean;
    public has_water_treatment: boolean;
    public observations: string;
    public pregnant: Pregnant = new Pregnant();
    public water_treatment_description: string;
    // public birth: string;
    // public in_social_program: boolean;
    // public live_with: string;
    // public income_participation: string;

    // public drinking_water_treatment: string;

    // public has_other_children: boolean;
    // public mother: Pregnant = new Pregnant();
    // public agent_id: number;
    // public civil_state: string;

    // public drinking_water_treatment2: boolean;

    // public pregnancies: any[] = new Array();

}
