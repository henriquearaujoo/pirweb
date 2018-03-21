import { Form } from './form';
export class FormQuestionB {
    public id: string;
    public form_id: string;
    public description: string;
    public form: Form = new Form();

    public is_present: boolean;
    public present: boolean;
}
