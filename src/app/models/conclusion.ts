import { Question } from './question';

export class Conclusion {
    public id: number;
    public description: string;
    public chapter: string;
    public questions: Question[] =  new Array();
}
