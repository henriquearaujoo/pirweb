export class Chapter {
    public id: string;
    public number: number;
    public version: number;
    public title: string;
    public subtitle: string;
    public resources: string;
    public description: string;
    public content: string;
    public goal: string;
    public family_tasks: string;
    public estimated_time: number;
    public time_next_visit: number;
    public status =  false;
    public percentage: number;
    public versions: Chapter[] = new Array();

}
