import { AlternativeFormBuilder } from './alternativeFormBuilder';
export class QuestionFormBuilder {
    public id: string = undefined;
    public description: string = undefined;
    public type: string = undefined;
    public value_type:	string = undefined;
    public required: boolean = undefined;
    public alternatives: AlternativeFormBuilder[];
}
