import { ISize } from 'selenium-webdriver';
import Optional from 'typescript-optional';

type TypedCallback<T> = () => T;

export class XlsImage {

    base64Content: String;
    ext: string;
    width: number;
    height: number;

    colsOffset: number;
    rowsOffset: number;

    static fromCanvas(element: HTMLCanvasElement, colsOffset?: number, rowsOffset?: number) {
        return new XlsImage(element.toDataURL(), 'png', element.width, element.height, colsOffset, rowsOffset);
    }

    constructor(base64: String, ext: string, width?: number, height?: number,
        colsOffset?: number, rowsOffset?: number) {

        this.base64Content = base64;
        this.ext = ext;
        this.width = width;
        this.height = height;
        this.colsOffset = Optional.ofNullable(colsOffset).orElse(0);
        this.rowsOffset = Optional.ofNullable(rowsOffset).orElse(0);
    }

}
