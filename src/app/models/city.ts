import { State } from './states';
export class City {
    public state: State =  new State();
    public id: string;
    public state_id: string;
    public name: string;

    public number: number;

    constructor() { }
}
