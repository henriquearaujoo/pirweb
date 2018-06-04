import * as FileSaver from 'file-saver';
import * as ExcelJs from 'exceljs/dist/exceljs.min.js';
import { XlsWorkbookConstraints } from './xls-constraints';
import Optional from 'typescript-optional';
import { Injectable } from '@angular/core';
import { XlsTable } from './xls-table';
import { XlsImage } from './xls-image';
import { merge } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

type XlsContent = XlsTable<any> | XlsImage;

export class XlsExport {

    workbook: ExcelJs.Workbook;
    worksheets: ExcelJs.worksheet[];

    static createWorkbook(headers?: XlsWorkbookConstraints): XlsExport {

        const xlsExport = new XlsExport();
        xlsExport.workbook = new ExcelJs.Workbook();

        headers = Optional.ofNullable(headers).orElse(new XlsWorkbookConstraints());

        Object.keys(headers).filter(prop => Optional.ofNullable(headers[prop]).isPresent)
            .forEach(prop => xlsExport.workbook[prop] = headers[prop]);

        xlsExport.workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ];

        return xlsExport;
    }

    static addWorksheet(xlsExport: XlsExport, tabName: string, ...contents: XlsContent[]): ExcelJs.worksheet {

        const worksheet = xlsExport.workbook.addWorksheet(tabName, {
            // pageSetup: { paperSize: 9, orientation: 'landscape' }
        });

        const cols = contents.reduce((a: number, b: XlsContent) => Math.max(a, this.getColsCount(b)), 0);

        contents.forEach(content => {

            if (content instanceof XlsTable) {
                this.addTable(worksheet, content, cols);
            } else if (content instanceof XlsImage) {
                this.addImage(xlsExport.workbook, worksheet, content, cols);
            }
        });

        xlsExport.worksheets = [];
        xlsExport.worksheets.push(worksheet);
        return worksheet;
    }

    private static getColsCount(content: XlsContent): number {
        if (content instanceof XlsTable) {
            return content.colsOffset + content.columns.length;
        } else if (content instanceof XlsImage) {
            return 1 + content.colsOffset;
        }

        return 0;
    }

    private static addTable<T>(worksheet: ExcelJs.worksheet, table: XlsTable<T>, colsCount?: number) {

        // OFFSET
        for (let i = 0; i < table.rowsOffset; i++) {
            worksheet.addRow();
        }


        // HEADER
        {
            worksheet.addRow();
            const headerRow = worksheet.lastRow;
            for (let i = 0; i < table.columns.length; i++) {
                headerRow.getCell(table.colsOffset + i + 1).value = table.columns[i].header.headerName;
            }
        }

        // DATA
        table.data.forEach(obj => {
            worksheet.addRow();
            const currentRow = worksheet.lastRow;
            for (let i = 0; i < table.columns.length; i++) {
                currentRow.getCell(table.colsOffset + i + 1).value = table.columns[i].field.getValue(obj);
            }
        });


        // TOTAL
        if (!table.columns.every(col => col.field.totalSelector === null || col.field.totalSelector === undefined)) {
            worksheet.addRow();
            const currentRow = worksheet.lastRow;

            currentRow.getCell(table.colsOffset + 1).value = 'Total';
            for (let i = 0; i < table.columns.length; i++) {
                if (table.columns[i].field.totalSelector) {
                    currentRow.getCell(table.colsOffset + i + 1).value = table.columns[i].field.totalSelector(table.data);
                }
            }
        }

    }
    static nvl(value, replaceWith) {
        return (typeof value !== 'undefined') && !(typeof value === 'number' && isNaN(value)) && (value != null) ? value : replaceWith;
    }

    private static addImage(workbook: ExcelJs.workbook, worksheet: ExcelJs.worksheet, xlsImg: XlsImage, colsCount?: number) {

        // OFFSET
        for (let i = 0; i < xlsImg.rowsOffset; i++) {
            worksheet.addRow();
        }

        const image = workbook.addImage({
            base64: xlsImg.base64Content,
            extension: xlsImg.ext,
        });

        worksheet.addRow();
        const currentRow = worksheet.lastRow;

        worksheet.addImage(image,
            {
                tl: { col: xlsImg.colsOffset, row: currentRow.number - 1 },
                br: { col: Math.max(colsCount, 1), row: currentRow.number },
            });

        currentRow.height = xlsImg.height;
        if (Math.max(colsCount, 1) === 1) {
            worksheet.getColumn(1).width = xlsImg.width / 5.5;
        } else {
            const minColWidth = 15;
            const mergedWidth = xlsImg.width / 5.5;
            const cols = Array.from(new Array(colsCount - xlsImg.colsOffset), (val, index) => xlsImg.colsOffset + index + 1);

            let resizableWidth = mergedWidth;
            let resizableCols = 0;
            const neededCols = cols.reduce(
                (out, curr) => {
                    const actualWidth =
                        // tslint:disable-next-line:max-line-length
                        out.reduce((sum, c) => Number(sum) + Number(Math.max(XlsExport.nvl(worksheet.getColumn(c).width, 0), minColWidth)), []);
                    const pendingWidth = mergedWidth - actualWidth;

                    if (pendingWidth > minColWidth * 1) {
                        out.push(curr);

                        if (worksheet.getColumn(curr).width && worksheet.getColumn(curr).width > minColWidth) {
                            resizableWidth -= worksheet.getColumn(curr).width;
                        } else {
                            resizableCols++;
                        }
                    }

                    return out;
                }, []);

            worksheet.mergeCells(
                this.toColumnName(neededCols[0]) + currentRow.number,
                this.toColumnName(neededCols[neededCols.length - 1]) + currentRow.number);

            const colSize = Math.max(resizableWidth / resizableCols, minColWidth);
            neededCols.forEach(o => {
                if (!worksheet.getColumn(o).width) {
                    worksheet.getColumn(o).width = colSize;
                }
            });
        }

    }

    static saveAsFile(xlsExport: XlsExport, fileName?: string): Observable<string> {

        return Observable.create(observer => {

            try {
                const tabName = xlsExport.worksheets.length === 1 ? xlsExport.worksheets[0].name : null;

                xlsExport.workbook.xlsx.writeBuffer()
                    .then(function (buffer) {

                        // tslint:disable-next-line:max-line-length
                        const filePath = fileName ? fileName + '.xlsx' : XlsExport.nvl(tabName, 'export') + '_' + XlsExport.get_id() + '.xlsx';
                        FileSaver.saveAs(new Blob([new Uint8Array(buffer)]), filePath);

                        observer.next(filePath);
                    },
                        error => observer.error(error));
            } catch (ex) {
                observer.error(ex);
            }
        });
    }

    static get_id() {
        const newDate = new Date();
        return ' ' + (newDate.getMonth() + 1) + '-' +
            newDate.getDate() + '-' + newDate.getFullYear() + '-' + newDate.getTime();
    }

    static toColumnName(num: number) {
        let ret = '';
        for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(((num % b) / a) + 65) + ret;
        }
        return ret;
    }
}
