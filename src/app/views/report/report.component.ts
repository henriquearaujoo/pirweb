import { Permissions, RuleState } from './../../helpers/permissions';
import { PagenateComponent } from './../../components/pagenate/pagenate.component';
import { PageService } from './../../services/pagenate/page.service';
import { Paginate } from './../../models/paginate';
import { RReport } from './../../models/r_report';
import { ReportFilterComponent } from './../../components/report-filter/report-filter.component';
import { BIThreeSearch } from './../../models/bi_tree_search';
import { Properties } from './../../models/properties';
import { Node } from './../../models/node';
import { BigraphService } from './../../services/bi-graph/bigraph.service';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ReportChartComponent } from './report-chart/report-chart.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { forEach } from '@angular/router/src/utils/collection';

declare const $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent  extends PagenateComponent implements OnInit {
  private loading = false;
  private general: any = {};
  private hasdata: boolean;
  private items: any[] = new Array();
  private paginate: Paginate;

  // ===============================
  private headerList: Array<any>;
  private headerShower: Array<any>;
  // ==============================

  // Report
  private nodeList = [];
  private tableColunm = new Array();
  private currentTable = 'Selecione uma tabela';
  private properties: Node;
  private filterList = [] = new Array();
  private currentFilter: any;
  private paramList = [] = new Array();
  private groupedList: Node[] = new Array();
  private orderList = [] = new Array();
  private allPath: any[] = Array();
  private treeToSearch: any[] = Array();
  private searchedList: Node[] = new Array();
  private selectAllOrder = true;

  @ViewChild('filter')
  private reportFilter: ReportFilterComponent;

  @ViewChild('chart')
  private chart: ReportChartComponent;

  @ViewChild('table')
  private table: ReportTableComponent;

  private startNode: string;

  constructor(private report: BigraphService, private pagerService: PageService, private permissions: Permissions) {
    super(pagerService);
    this.hasdata = false;
  }

  ngOnInit() {
    this.permissions.canActivate(['/relatorios']);
    this.permissions.permissionsState.subscribe(
      (rules: RuleState) => {
      });
    this.nodeList = new Array();
    this.report.getGraph().subscribe(
      s => {
        const content = JSON.stringify(s);
        const body = JSON.parse(content);
        const nodes = JSON.parse(body['_body']);

        // init nodes
        for (let i = 0; i < nodes.length; i++) {

          this.nodeList[i] = {
            child: {nodes : new Array<Node>(), fk: new Array<string>()} ,
            node: nodes[i],
            entity: nodes[i].entity,
            alias: nodes[i].alias
          };
        }

        // create graph
        for (let i = 0; i < nodes.length; i++) {

          const x = new Array<Node[]>();
          const node = new Node();
          node.size =  nodes[i].size;
          node.entity = nodes[i].entity;
          node.table = nodes[i].table;
          node.properties = new Array<Properties>();

          for (let j = 0 ; j < nodes[i].properties.length ; j++) {

            const prop = new Properties();
            prop.type = nodes[i].properties[j].type;
            prop.property = nodes[i].properties[j].property;
            node.properties.push(prop);

            let entity = prop.type;
            if (prop.type.indexOf('Collection<') !== -1) {
              entity = prop.type.slice(11, prop.type.length - 1);
            }else if (prop.type.indexOf('Set<') !== -1) {
              entity = prop.type.slice(4, prop.type.length - 1);
            }
            const k = this.nodeList.find(o => o.entity === entity);
            if (k !== undefined ) {
              this.nodeList[i].child.nodes.push({nodes: k, fk: prop.property});
            }
          }
        }
      },
      e => {
        console.log(e);
      }
    );
  }

  private handlerFilter(event, prop, i, j) {
    if (event.target.checked) {
      this.filterList.push({
        entity: this.groupedList[i].entity,
        filters: new Array(),
        prop: prop,
        connected: undefined
      });
      this.currentFilter = this.filterList[this.filterList.length - 1];
      $('#btnmodal').click();
      if (this.reportFilter !== undefined) {
        this.reportFilter.invoke();
      }
    }else {
      const index = this.filterList.findIndex(
        o => o.entity === this.groupedList[i].entity && o.prop.property === prop.property
      );
      if (index !== -1) {
        this.filterList.splice(index, 1);
      }
    }
  }

  private createPath(node: Node, event) {
    let path = new Array();
    if (event) {
      this.searchedList.push(node);
      if (this.searchedList.length > 1) {
        path = this.showDeepPath(this.searchedList[0], this.searchedList[this.searchedList.length - 1]);
        this.allPath.push(path);
      }else if (this.searchedList.length === 1) {

        path.push(node);
        this.allPath.push(path);


      }else {
        path = new Array();
      }

    }else {
      // remove and prune tree
      const index = this.searchedList.findIndex(o => o.entity === node.entity);
      this.searchedList.splice(index, 1);
      this.allPath.splice(index, 1);
      // rebuild three starting new root node
      if (index === 0 && this.searchedList.length > 0 ) {

        this.allPath = new Array();
        path.push(this.searchedList[0]);
        this.allPath.push(path);
        path = new Array();

        for (let i = 1; i < this.searchedList.length; i++) {
          const currentNode = this.searchedList[i];
          this.showDeepPath(this.searchedList[0], currentNode);
          this.allPath.push(path);
        }
      }
    }
    if (this.searchedList.length > 0) {
      this.startNode = this.searchedList[0].entity;
    }
    this.groupedList = this.searchedList;

    this.tableColunm = new Array();
    this.groupedList.forEach(o => {
      this.tableColunm.push(o.properties);
    });
    // this.apply();
  }

  private showDeepPath(startNode: Node, endNode: Node) {
    const visited = [];
    const stack = new Array();

    let foundEnd = false;

    stack.push(startNode);
    for (let i = 0; i < this.nodeList.length; i++) {
      visited[i] = false;
    }
    const startIndex = this.nodeList.findIndex(o => o.entity === startNode.entity);
    const endIndex = this.nodeList.findIndex(o => o.entity === endNode.entity);

    visited[startIndex] = true;
    // this.path.push(stack[startIndex]);
    while (stack.length > 0 && !foundEnd) {

      const currentNode = stack[stack.length - 1];
      const currentIndex = this.nodeList.findIndex(o => o.entity === currentNode.entity);
      // get other connected nodes from current node
      const childrenNodes = this.nodeList[currentIndex].child.nodes;
      let hasDeepNodes = false;

      for (let i = 0; i < childrenNodes.length && !hasDeepNodes; i++) {
        const entityDest =  this.nodeList.findIndex(o => o.entity === childrenNodes[i].nodes.entity);
        if (!visited[entityDest]) {
          visited[entityDest] = true;
          stack.push(childrenNodes[i].nodes);
          hasDeepNodes = true;

          if (childrenNodes[i].nodes.entity === this.nodeList[endIndex].entity) {
            foundEnd = true;
          }
        }
      }
      if (!hasDeepNodes) {
        stack.pop();
      }
    }
    return stack;
  }

  private checkWormRole(startNode: Node, destNode: Node): boolean {

    const startIndex = this.nodeList.findIndex(o => o.entity === startNode.entity);
    const endIndex = this.nodeList.findIndex(o => o.entity === destNode.entity);

    // ignore root
    if (startIndex === endIndex) {
      return false;
    }

    // get other connected nodes from current node
    const childrenNodes = this.nodeList[startIndex].child.nodes;
    let foundEnd = false;
      for (let i = 0; i < childrenNodes.length && !foundEnd; i++) {
        const entityDest =  this.nodeList.findIndex(o => o.entity === childrenNodes[i].nodes.entity);

        if (childrenNodes[i].nodes.entity === this.nodeList[endIndex].entity) {
          foundEnd = true;
        }
    }
    return foundEnd;
  }

  private filterColumn(prop, event, i) {
    this.headerShower[i] = event;
  }

  private apply() {
    // create new graph from paths
    const newGraph = new Array();
    const paths = new Array();
    this.allPath.forEach(o => {
      if (o.length > 1) {
        for (let i = 0; i < o.length; i++) {
          const hasConn = this.checkWormRole(o[i], o[o.length - 1]);
          if (hasConn) {
            const temp = new Array();
            for (let j = 0; j <= i; j++) {
              temp.push(o[j]);
            }
            temp.push(o[o.length - 1]);
            paths.push(temp);
          }
        }
      }
    });
    paths.forEach(ele => {
      ele.forEach(node => {
        const index = newGraph.findIndex(o => o.entity === node.entity);
        if (index === -1) {
          const idxFilters = this.filterList.findIndex(o => o.entity === node.entity);
          if (idxFilters === -1) {
            newGraph.push({entity: node.entity, joins: new Array(), leafs: new Array()});
          }else {
            newGraph.push({entity: node.entity, joins: new Array(), leafs: new Array()});
          }
        }
      });
    });
    paths.forEach(ele => {
      for (let i = 0 ; i < ele.length ; i ++) {
        const parentIndex =  newGraph.findIndex(o => o.entity === ele[i].entity);
        if ( i + 1 < ele.length) {
          const currIndex =  newGraph.findIndex(o => o.entity === ele[i + 1].entity);
          const nIndex = newGraph[parentIndex].joins.findIndex(o => o.entity === newGraph[currIndex].entity);
          if (nIndex === -1) {
            newGraph[parentIndex].joins.push(newGraph[currIndex]);
          }
        }
      }
    });
    // start from root
    const json = new Array();
    if (newGraph.length > 0) {
      const leafs = new Array();
      for (let i = 1; i < this.groupedList.length; i++) {
        leafs.push(this.groupedList[i].entity);
      }
      newGraph[0].leafs = leafs;
      json.push(newGraph[0]);
    }else {
      if (this.allPath.length > 0) {
        json.push({entity: this.allPath[0][0].entity, joins: new Array(), leafs: new Array()});
      }
    }

    if (json.length > 0) {
      (<HTMLButtonElement> document.getElementById('showmodal')).click();
      this.report.generateReport(json[0]).subscribe(
        s => {
          this.collectData(s);
        },
        e => {
          (<HTMLButtonElement> document.getElementById('closeModal')).click();
          console.log(e);
        }
      );
    }
  }

  private gettingData(d: any) {
    const data = d['maps'];
    this.headerShower = new Array();
    this.chart.showChart(data, this.groupedList);
    const entity = new Array();

    // handler data
    for (let k = 0 ; k < data.length ; k++) {

      const vlue = Object.values(data[k]['key']);

      if (k === 0) {
        const root = Object.keys(data[k]['key']);
        const bodyList = new Array();
        bodyList.push({v: vlue, parentIndex: k});
        entity.push({entity: this.groupedList[0].entity, countProp: root.length, prop: root, values:  bodyList});
      }else {
        const root = Object.keys(data[k]['key']);
        entity[0].values.push({v: vlue, parentIndex: k});
      }

      const tdata = Object.keys(data[k]['value']);
      const keys = Object.values(tdata);

      for (let i = 0; i < keys.length; i++) {

        const currentity = keys[i];
        const values = data[k]['value'][currentity];
        const valueList = Object.values(values);
        let props = [];
        let value = [];
        const dataEntity = [];
        if (valueList.length > 0) {
          const prop = Object.keys(valueList[0]);
          valueList.forEach( u => {
            dataEntity.push({v: Object.values(u), parentIndex: k});
          });
          value =  dataEntity;
          props = prop;
        }
        const index = entity.findIndex(o => o.entity === currentity);
        if (index === -1) {
          const v = Object.values(data[k]['key']);
          entity.push({entity: currentity, countProp: props.length, prop: props, values:  value});
        }else {
          if (entity[index].countProp === 0) {
            entity[index].countProp = props.length;
            entity[index].prop = props;
            entity[index].values = value;
          }else {
            const s = Object.values(value);
            if (s.length > 0) {
              const v = Object.values(s);
              const x = Object.values(v);
              x.forEach(el => {
                entity[index].values.push(el);
              });
            }
          }
        }
      }
    }
    // console.log(entity);
    // create table
    this.headerList = new Array();
    const body = new Array();
    for (let i = 0; i < entity.length; i++) {
      for (let j = 0; j < entity[i].countProp; j++) {
        const currProp = entity[i].prop[j];
        const x = this.groupedList.findIndex(o => o.entity === entity[i].entity);
        const idx = this.groupedList[x].properties.findIndex(p => p.property === currProp);
        if (idx !== -1) {
          if (this.groupedList[x].properties[idx].alias !== null) {
            this.headerList.push(this.groupedList[x].properties[idx].alias);
            this.headerShower.push(true);
          }
        }
      }
    }
    console.log(entity);
    data.forEach(dat => {
      const rootK = Object.values(dat['key']);
      const rootV = Object.values(dat['value']);
      for (let j = 0; j < rootV.length; j++) {
        for (let k = 0; k < rootV[j].length; k++) {
          const element = rootV[j][k];
          // console.log(element);
        }
      }
    });
    this.currentTable = this.groupedList[0].alias;
    // this.table.loadData(this.currentTable, this.headerList, this.headerShower);
    (<HTMLButtonElement> document.getElementById('closeModal')).click();
  }

  private collectData(data) {
    this.chart.showChart(data['maps'], this.groupedList);
    (<HTMLButtonElement> document.getElementById('closeModal')).click();
  }

  private handlerData(rrport: any) {

    this.headerList = new Array();
    this.headerShower = new Array();
    const data = new Array();

    for (let i = 0; i < rrport.length; i++) {
      if ( i === 0 ) {

        data.push({node: this.groupedList[0], values: new Array()});
        data[i].values.push(rrport[i].key);

      } else {

        const index = data.findIndex(o => o.node.entity === Object.keys(rrport[i].value)[0]);

        if (index === -1) {

          const currentEntity = Object.keys(rrport[i].value);
          const nodeIndex = this.groupedList.findIndex(o => o.entity === currentEntity[0]);
          data.push({node: this.groupedList[nodeIndex], values: new Array()});
          const x = Object.values(rrport[i].value);
          x.forEach(o => {
            for (let j = 0; j < o.length; j++) {
              data[i].values.push(o[j]);
            }
          });

        }else {
          const x = Object.values(rrport[i].value);
          x.forEach(o => {
            for (let j = 0; j < o.length; j++) {
              data[index].values.push(o[j]);
            }
          });
        }
      }
    }
    // console.log(data);
    data.forEach(d => {

      const currentNode = Object.keys(d);

      for (let i = 0 ; i < d[currentNode[0]].properties.length; i++) {
        const currProp = d[currentNode[0]].properties[i];
        const index = Object.keys(d[currentNode[1]][0]).findIndex(o => o === currProp.property);
        if (index !== -1 && currProp.alias !== null) {
          this.headerList.push({prop: currProp.property, alias: currProp.alias, rows: new Array()});
          this.headerShower.push(true);
        }
      }
      // let field;
      for (let i = 0; i < d[currentNode[1]].length; i++) {
        const fields = Object.values(d[currentNode[1]][i]);
        for (let j = 0 ; j < fields.length ; j++) {
          const index = this.headerList.findIndex(o => o.prop === Object.keys(d[currentNode[1]][i])[j]);
          if (index !== -1) {
            this.headerList[index].rows.push(fields[j]);
          }
        }
      }
    });

    const body = new Array();

    for (let j = 0; j < this.headerList[0].rows.length; j++) {
      const row = new Array();
      for (let k = 0; k < this.headerList.length; k++) {
        const element = this.headerList[k].rows[j];
        row.push(element);
      }
      body.push(row);
    }
    this.allItems = body;
    if (this.allItems.length > 0) {
      this.hasdata = true;
      this.setPage(1);
    }
    (<HTMLButtonElement> document.getElementById('closeModal')).click();
    // this.chart.showChart(data, this.groupedList);
  }

  private selectAll(event, type) {
    switch (type) {
      case 1:

      break;
      case 2:
        if (event.target.checked) {
          this.selectAllOrder = true;
        }else {
          this.selectAllOrder = true;
        }
      break;
    }
  }
}
