import { Rule } from "./rule";
import { RuleProfile } from "./rule-profile";

export class Profile {
    id      :number;
    name    :string;
    rules   :Array<RuleProfile>;
}