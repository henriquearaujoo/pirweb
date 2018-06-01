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
  private tableData: any;
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
          const idx = this.groupedList.findIndex(o => o.entity === node.entity);

          if (idxFilters === -1) {
            newGraph.push({entity: node.entity, joins: new Array(), isLeaf: idx > 0});
          }else {
            newGraph.push({entity: node.entity, joins: new Array(), isLeaf: idx > 0});
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
      json.push(newGraph[0]);
    }else {
      if (this.allPath.length > 0) {
        json.push({entity: this.allPath[0][0].entity, joins: new Array(), isLeaf: true});
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
    const data = d;
    this.headerList = new Array();
    this.headerShower = new Array();
    data.forEach(col => {
      this.headerShower.push(true);
      this.headerList.push(col.property);
    });
    const table = new Array();
    for (let j = 0; j < data[0].values.length; j++) {
      const row = new Array();
      for (let k = 0; k < data.length; k++) {
        const element = data[k].values[j];
        row.push(element);
      }
      table.push(row);
    }
    this.allItems = table;
      if (this.allItems.length > 0) {
        this.hasdata = true;
        this.setPage(1);
      }
    this.currentTable = this.groupedList[0].alias;
    (<HTMLButtonElement> document.getElementById('closeModal')).click();
  }

  private collectData(data) {
    this.chart.showChart(data['maps'], this.groupedList);
    (<HTMLButtonElement> document.getElementById('closeModal')).click();
    this.gettingData(data['table']);
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
