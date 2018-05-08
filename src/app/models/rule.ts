import { Page } from './page';
import { Profile } from './profile';
export class Rule {
    public id: number;
    public profile_id: string;
    public page_id: string;
    public page: Page = new Page();
    public create = false;
    public update = false;
    public read = false;
    public delete: boolean;
    public profile: Profile;
}
