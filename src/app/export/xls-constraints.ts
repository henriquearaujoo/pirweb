// import { LeanUtils } from '../../constant/lean-utils';
import { EXlsHorizontalAlign, EXlsVerticalAlign, EXlsBorderStyle } from './xls-table';
// import { TranslateService } from '../../translate';

export class XlsWorkbookConstraints {

    get creator() { return 'System'; }

    get lastModifiedBy() { return 'System'; }

    get loggedUser() { return  localStorage.getItem('name'); }

    get created() { return new Date(); }

    get modified() { return new Date(); }

    get lastPrinted() { return new Date(); }

    date1904 = true;

}

export class XlsDefaultConstraints {

    static get horizontalAlign(): EXlsHorizontalAlign { return EXlsHorizontalAlign.center; }

    static get verticalAlign(): EXlsVerticalAlign { return EXlsVerticalAlign.middle; }

    static get borderStyle(): EXlsBorderStyle { return EXlsBorderStyle.thin; }

    static get isTranslated(): boolean { return true; }

}
