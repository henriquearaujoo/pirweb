import { AlternativeFormBuilder } from './alternativeFormBuilder';
export class QuestionFormBuilder {
    public description: string;
    public id: string;
    public type: string;
    public value_type:	string;
    public alternatives: AlternativeFormBuilder[] = new Array();
}
