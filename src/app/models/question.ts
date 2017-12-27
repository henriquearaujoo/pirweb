import { Answer } from './answer';

export class Question {
    public type: string;
    public description: string;
    public answers: Answer[] = new Array();
}