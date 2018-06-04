import { ReportModel } from './report-model';
import { Constant } from './../constant/constant';
import { XlsTable, XlsTableColumn } from './xls-table';
import { Observable } from 'rxjs/Observable';
import { XlsExport } from './xls-export';

// import { GenericListComponent } from '../view/generic-list/generic-list.component';
// import { BaseModel } from '../model/base.model';
// import { Project } from '../model/project.model';
// import { ToastService } from 'app/service/toast/toast.service';
// import { MessageType } from 'app/constant/message-type.enum';
// import { Filial } from '../model/filial.model';
// import { Sector } from '../model/sector.model';
// import { User } from '../model/user.model';
// import { ImprovementType } from '../model/improvement-type.model';

declare const nvl: any;

export type ExportSrc<T> = Array<T>;

export class InstanceFactory<T> {
    private newObj: { new(): T };

    constructor(newObj: { new(): T }) {
        this.newObj = newObj;
    }

    get(): T {
        return new this.newObj();
    }
}

export class ExportFactory {

    static main(keys: string[], values: Array<Array<any>>) {
        return this.tableFromAny(keys, ExportFactory.convert(keys, values));
    }

    static convert(cols: string[], values: Array<Array<any>>): Array<any> {
        console.log(cols, values);
        const rows = values.length;
        const resultList: Array<any> = [];

        return Array.from(Array(rows).keys())
            .map(rIndex => {
                const curr: any = resultList[rIndex] = {};
                for (let cIndex = 0; cIndex < cols.length; cIndex++) {
                    const propName = cols[cIndex];
                    curr[propName] = values[rIndex][cIndex];
                }

                return curr;
            });
    }

    static tableFromAny<T>(config: Array<string>, sourceData: Array<any>): XlsTable<any> {

        const cols = new Array<XlsTableColumn<any>>();

        config.forEach(c => {
            cols.push(new XlsTableColumn<any>(c,
                o => {
                    return o[c];
                }));
        });

        return new XlsTable(sourceData, cols);
    }

    static tableFromEntity<T>(sourceData: ExportSrc<T>, newObj: { new(): T }): XlsTable<T> {
        const factory = new InstanceFactory<T>(newObj);

        let data = new Array<T>();
        data = sourceData;
        console.log(data);
        const cols = new Array<XlsTableColumn<any>>();
        // cols.push(new XlsTableColumn<any>('teste', o => o.alias));
        // if (factory.get() instanceof NConformity) {

            // cols.push(
            //     ...[
            //         new XlsTableColumn<NConformity>('Código', o => o.id),
            //         new XlsTableColumn<NConformity>('Número', o => c.generateSequence(o.sequence)),
            //         new XlsTableColumn<NConformity>('Ano', o => o.year),
            //         new XlsTableColumn<NConformity>('Cliente/Fornecedor', o => o.clientName),
            //         new XlsTableColumn<NConformity>('Cliente - Departamento', o => o.clientDepartment),
            //         new XlsTableColumn<NConformity>('Cliente - Núm. Dóc', o => o.clientNumDoc),
            //         new XlsTableColumn<NConformity>('Cliente - Fone', o => o.clientPhone),
            //         new XlsTableColumn<NConformity>('Cliente - Responsável', o => o.clientResponsible),
            //         new XlsTableColumn<NConformity>('Cliente - Email', o => o.clientEmail),
            //         new XlsTableColumn<NConformity>('Requisição de fornecedor', o => o.requestFromPRovider),
            //         // new XlsTableColumn<NConformity>('', o => o.providerName),
            //         new XlsTableColumn<NConformity>('Tipo de ação', o => o.actionType),
            //         new XlsTableColumn<NConformity>('NC com Exceção', o => o.hasException ? 'Sim' : 'Não'),
            //         new XlsTableColumn<NConformity>('Exceção', o => o.exception),
            //         // new XlsTableColumn<NConformity>('', o => o.productNonConformities),
            //         new XlsTableColumn<NConformity>('Efeitos', o => o.effect),
            //         new XlsTableColumn<NConformity>('Categoria', o => o.category),
            //         new XlsTableColumn<NConformity>('Revisão', o => o.review),
            //         new XlsTableColumn<NConformity>('Origem', o => o.requiredOrigin),
            //         new XlsTableColumn<NConformity>('Status', o => Constant.STATUS_LIST[o.status]),
            //         new XlsTableColumn<NConformity>('Emissor', o => o.requester.name),
            //         new XlsTableColumn<NConformity>('D2 - Descrição do problema', o => o.dtwo[0].description),
            //         new XlsTableColumn<NConformity>('D2 - Disposição', o => o.dtwo[0].disposition),
            //         // new XlsTableColumn<NConformity>('', o => o.departmentNConformities),
            //         new XlsTableColumn<NConformity>('Dt. Registro', o => o.registeredAt),
            //         new XlsTableColumn<NConformity>('Dt. de Abertura', o => o.openedAt),
            //         new XlsTableColumn<NConformity>('Dt. de previsão de término', o => o.finishedPrevision),
            //         new XlsTableColumn<NConformity>('Dt. real de finalização', o => o.finishedAt),
            //         // new XlsTableColumn<NConformity>('', o => o.dsixes),
            //         // new XlsTableColumn<Project>('Investimento', o => o.total_expenditure,
            //         //     list => list.reduce((sum, curr) => sum + curr.total_expenditure, 0)),
            //         // new XlsTableColumn<Project>('Economia', o => o.total_savings,
            //         //     list => list.reduce((sum, curr) => sum + curr.total_savings, 0)),
            //         // new XlsTableColumn<Project>('Retorno', o => o.project_payback,
            //         //     list =>
            //                 // nvl(
            //                 //     (list.reduce((sum, curr) => sum + curr.total_expenditure, 0)
            //                 //         / list.reduce((sum, curr) => sum + curr.total_savings, 0)),
            //                 //     0))
            //     ]);
        // }
        return new XlsTable(data, cols);
    }

    static exportAndSave(xlsx: XlsExport) {

        try {
            XlsExport.saveAsFile(xlsx).subscribe(
                success => {
                    console.log(success);
                    // ToastService.show('export.success', MessageType.SUCCESS);
                },
                error => {
                    console.log(error);
                    // ToastService.show('export.error', MessageType.ERROR);
                });

        } catch (err) {
            console.log(err);
            // ToastService.show('export.error', MessageType.ERROR);
        }
    }
}
