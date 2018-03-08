import { Answer } from './answer';

export class Question {
    public id: string;
    public type: string;
    public conclusion_id: string;
    public description: string;
    public answers: Answer[] = new Array();
}
