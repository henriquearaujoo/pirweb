import { Visit } from './visit';
import { User } from './user';
import { Responsible } from './responsible';
export class Child {
    public id: string;
    public name: string;
    public agent: User = new User();
    public agent_id: string;
    public birth: string;
    public code: string;
    public family: Responsible = new Responsible();
    public family_id: string;
    public father_name: string;
    public gender: string;
    public mother_name: string;
    public age: string;
    public visits: Visit[] = new Array();
}
