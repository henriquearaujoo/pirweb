export class VariableType {

    /*
        exception Enums to return and handler data into hashtable
     */
    public getValue(type: string) {
        if (type.toLowerCase() === 'double' ||
            type.toLowerCase() === 'long' ||
            type.toLowerCase() === 'int' ||
            type.toLowerCase() === 'integer' ||
            type.toLowerCase() === 'float' ||
            type.toLowerCase() === 'short'
        ) {
                return 0;
        } else if (
            type.toLowerCase() === 'char' ||
            type.toLowerCase() === 'string') {
                return 1;
        } else if (type.toLowerCase() === 'boolean') {
            return 2;
        } else if (type.toLowerCase() === 'date') {
            return 3;
        } else if (type === 'ECivilState') {
            return 4;
        } else if (type === 'EAnswerType') {
            return 5;
        } else if (type === 'EAudience') {
            return 6;
        } else if (type === 'EChildGender') {
            return 7;
        } else if (type === 'ECommunityZone') {
            return 8;
        } else if (type === 'EFormType') {
            return 9;
        } else if (type === 'EFormQuestionType') {
            return 10;
        } else if (type === 'EHabitationType') {
            return 11;
        } else if (type === 'EMediaType') {
            return 12;
        } else if (type === 'EProfileType') {
            return 13;
        } else if (type === 'EUserType') {
            return 14;
        } else {
            return 15;
        }
    }
}
