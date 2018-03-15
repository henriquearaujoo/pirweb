import { FormQuestionB } from './form-question-b';
import { FormQuestionA } from './form-question-a';
export class Form {
    public id: string;
    public age_zone: number;
    public from: number;
    public to: number;
    public in_years: boolean;
    public is_enabled: boolean;

    public type: string;
    public questions_type_a: FormQuestionA[] = new Array();
    public questions_type_b: FormQuestionB[] = new Array();
}
