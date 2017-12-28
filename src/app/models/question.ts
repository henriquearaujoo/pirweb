import { Answer } from './answer';

export class Question {
    public id: string;
    public type: string;
    public for_conclusion: number;
    public description: string;
    public answers: Answer[] = new Array();
}