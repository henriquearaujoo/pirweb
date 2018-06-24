import { QuestionFormBuilder } from './questionFormBuilder';
export class FormBuilderM {
    public id: string;
    public title: string = 'titulo teste';
    public description: string = 'descricao teste';
    public questions: QuestionFormBuilder[] = new Array();
}
