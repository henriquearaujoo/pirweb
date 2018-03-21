import { FormQuestion } from './form-question';

export class Form {
    public id: string;
    public age_zone: number;
    public from: number;
    public to: number;
    public in_years: boolean;
    public is_enabled: boolean;

    public type: string;
    public questions: FormQuestion[] = new Array();
}

