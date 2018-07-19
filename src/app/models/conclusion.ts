import { Question } from './question';

export class Conclusion {
    public id: string;
    public description: string;
    public chapter_id: string;
    public observations: string;
    public questions: Question[] =  new Array();
}
