import { Agent } from './agent';
import { Responsible } from './responsible';

export class Pregnant {
    public id: string;
    public name: string;
    public is_pregnant: boolean;
    public agent_id: string;
    public birth: string;
    public civil_state: string;
    public code: string;
    // public family: Responsible = new Responsible();
    public family_id: string;
    public phone_number: string;
    public phone_owner: boolean;
    public pregnancies: any[] = new Array();
    public agent: Agent = new Agent();
    public family: Responsible = new Responsible();
}
