import { Form } from './form';
export class FormQuestionA {
    public id: string;
    public form_id: string;
    public description: string;
    public dimension: string;
    public form: Form = new Form();

    public can_do_alone: boolean;
    public can_do_with_help: boolean;
    public cannot_do: boolean;
}
