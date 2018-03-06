import { State } from './states';
export class City {
    public state: State;
    constructor(public id: string,
        public state_id: string,
        public name: string) { }
}
