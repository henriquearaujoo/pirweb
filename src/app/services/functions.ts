export class Functions {
    removeEmptyKey(obj: string) {
        const removeEmpty = ( obj : string ) => {
            Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
            return obj;
          };
          return removeEmpty;
    }
}