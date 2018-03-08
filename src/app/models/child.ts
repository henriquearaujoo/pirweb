import { Responsible } from './responsible';
export class Child {
    public id: string;
    public name: string;
    // public uc: string;
    // public regional: string;
    public responsible_id: string;
    // public community_id: string;
    public birth: string;
    public gender: string;
    public age: string;
    public father_name: string;
    public mother_id: string;
    public has_civil_registration: boolean;
    public civil_reg_justificative: string;
    public is_in_social_program: boolean;
    public is_premature_born: boolean;
    public born_week: number;
    public is_mensaly_weighted: boolean;
    public is_vacination_uptodate: boolean;
    public has_relation_diff: boolean;
    public who_take_care: string;
    public has_education_diff: boolean;
    public education_diff_specification: string;
    public plays_with_who: string;
    public responsible: Responsible = new Responsible();

}
