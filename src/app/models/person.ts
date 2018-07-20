import { Agent } from './agent';
import { User } from './user';

export class Person {
   public rg: string;
   public cpf: string;
   public emitter: string;

   public agent: Agent = new Agent();
}
