import { Child } from './child';
import { Responsible } from './responsible';

export class Pregnant {
    public is_pregnant: boolean;
    public pregnancies: any;
    public children: Child[] = Array();
    public responsible: Responsible;
}
