import Optional from 'typescript-optional';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';
// import { Utils } from '../../constant/util';

export type ObjValueGetter<T> = (obj: T) => any;
type TotalValueGetter<T> = (obj: Array<T>) => any;

function getPropertyValueByName(obj: Object, fieldName: string) {
    if (!obj || !fieldName || !fieldName.length) {
        return obj;
    }

    const dotIndex = fieldName.indexOf('.');
    if (dotIndex > 0) {
        return getPropertyValueByName(obj[fieldName.substr(0, dotIndex)], fieldName.substr(dotIndex + 1));
    } else {
        return (obj[fieldName]);
    }
}

export class XlsTable<T> {

    data: Array<T>;
    columns: Array<XlsTableColumn<T>>;
    style: XlsCellStyle;
    headerStyle: XlsCellStyle;
    cellStyles: Array<XlsCellStyle>;

    colsOffset: number;
    rowsOffset: number;

    constructor(data: Array<T>, columns?: Array<XlsTableColumn<T>>, colsOffset?: number, rowsOffset?: number, tableStyle?: XlsCellStyle,
        headerStyle?: XlsCellStyle, cellsStyles?: XlsCellStyle[]) {

        this.data = data;
        this.columns = columns;
        this.colsOffset = Optional.ofNullable(colsOffset).orElse(0);
        this.rowsOffset = Optional.ofNullable(rowsOffset).orElse(0);
        this.style = tableStyle;
        this.headerStyle = headerStyle;
        this.cellStyles = cellsStyles;
    }
}


export class XlsTableColumn<T> {

    header: XlsTableHeader;
    field: XlsTableField<T>;

    constructor(header: string | XlsTableHeader, inField: string | ObjValueGetter<T> | XlsTableField<T>,
        totalSelector?: TotalValueGetter<T>) {

        if (typeof (header) === 'string') {
            this.header = new XlsTableHeader(header);
        } else {
            this.header = header;
        }

        if (inField instanceof XlsTableField) {
            this.field = inField;
        } else {
            this.field = new XlsTableField(inField);
        }

        if (totalSelector) {
            this.field.totalSelector = totalSelector;
        }
    }
}

export class XlsTableHeader {

    headerName: string;
    cellStyle: XlsCellStyle;

    constructor(headerName: string, cellStyle?: XlsCellStyle) {
        this.headerName = headerName;
        this.cellStyle = cellStyle;
    }
}

export class XlsTableField<T> {

    valueSelector: string | ObjValueGetter<T>;
    totalSelector: TotalValueGetter<T>;
    format: string;
    cellStyle: XlsCellStyle;

    constructor(valueSelector: string | ObjValueGetter<T>, totalSelector?: TotalValueGetter<T>, format?: string, cellStyle?: XlsCellStyle) {
        this.valueSelector = valueSelector;
        this.totalSelector = totalSelector;
        this.format = format;
        this.cellStyle = cellStyle;
    }

    getValue(obj: T): any {

        if (typeof (this.valueSelector) === 'string') {
            return getPropertyValueByName(obj, this.valueSelector);
        } else {
            return this.valueSelector(obj);
        }
    }
}

export class XlsCellStyle {

    borders: XlsBorders;
    align: XlsAlignment;

    constructor(align?: XlsAlignment, borders?: XlsBorders) {
        this.align = Optional.ofNullable(align).orElse(new XlsAlignment());
        this.borders = Optional.ofNullable(borders).orElse(new XlsBorders());
    }
}

export class XlsAlignment {

    public wrapText: boolean;
    public indent: number;
    public horizontal: EXlsHorizontalAlign;
    public vertical: EXlsVerticalAlign;

    constructor(horizontal?: EXlsHorizontalAlign, vertical?: EXlsVerticalAlign, isWrapText?: boolean, indent?: number) {

        this.horizontal = Optional.ofNullable(horizontal).orElse(EXlsHorizontalAlign.inherit);
        this.vertical = Optional.ofNullable(vertical).orElse(EXlsVerticalAlign.inherit);
        this.wrapText = Optional.ofNullable(isWrapText).orElse(false);
        this.indent = Optional.ofNullable(indent).orElse(0);
    }
}

export enum EXlsHorizontalAlign {

    inherit,
    left,
    center,
    right,
    fill,
    justify,
    centerContinuous,
    distributed
}

export enum EXlsVerticalAlign {

    inherit,
    top,
    middle,
    bottom,
    distributed,
    justify
}

export class XlsBorders {

    top: XlsBorder;
    left: XlsBorder;
    bottom: XlsBorder;
    right: XlsBorder;

    constructor(top?: XlsBorder, left?: XlsBorder, bottom?: XlsBorder, right?: XlsBorder) {

        this.top = Optional.ofNullable(top).orElse(new XlsBorder());
        this.left = Optional.ofNullable(left).orElse(new XlsBorder());
        this.bottom = Optional.ofNullable(bottom).orElse(new XlsBorder());
        this.right = Optional.ofNullable(right).orElse(new XlsBorder());
    }
}

export class XlsBorder {

    color: string | string[];
    style: EXlsBorderStyle;

    // Color array means gradient
    constructor(style?: EXlsBorderStyle, color?: string[] | string) {

        this.style = Optional.ofNullable(style).orElse(EXlsBorderStyle.inherit);
        this.color = color;
    }
}

export enum EXlsBorderStyle {

    inherit,
    thin,
    dotted,
    dashDot,
    hair,
    dashDotDot,
    slantDashDot,
    mediumDashed,
    mediumDashDotDot,
    mediumDashDot,
    medium,
    double,
    thick
}
