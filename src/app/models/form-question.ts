import { Form } from './form';
export class FormQuestion {
    public id: string;
    public form_id: string;
    public description: string;
    public type: string;
    public form: Form = new Form();
    public is_enabled: boolean;
    public number: number;
}
