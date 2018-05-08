import { User } from './user';
import { Chapter } from './chapter';
import { Child } from './child';
import { Answer } from './answer';
import { Responsible } from './responsible';

export class Visit {
    public agent_id: string;
    public agent_rating: number;
    public answers: Answer = new Answer();
    public chapter_id: string;
    public child: Child = new Child();
    public done_at: string;
    public family_rating: number;
    public form_id: string;
    public id: string;
    public number: number;
    public responsible: Responsible = new Responsible();
    public visit_time: number;

    public chapter: Chapter = new Chapter();
    public agent: User = new User();
}
