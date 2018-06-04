export class VariableType {

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
        } else {
            return 4;
        }
    }
}
