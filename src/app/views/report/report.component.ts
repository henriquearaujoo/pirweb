import { ReportFilterComponent } from './../../components/report-filter/report-filter.component';
import { BIThreeSearch } from './../../models/bi_tree_search';
import { Properties } from './../../models/properties';
import { Node } from './../../models/node';
import { BigraphService } from './../../services/bi-graph/bigraph.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  private nodeList = [];

  private currentTable = 'Selecione uma tabela';
  private properties: Node;
  private filterList = [] = new Array();
  private currentFilter: any;
  private paramList = [] = new Array();
  private groupedList = [] = new Array();
  private orderList = [] = new Array();
  private path = [] = new Array();
  private allPath: any[] = Array();
  private treeToSearch: any[] = Array();
  private searchedList = [] = new Array();

  @ViewChild('filter')
  private reportFilter: ReportFilterComponent;

  private startNode: string;

  constructor(private report: BigraphService) {  }

  ngOnInit() {

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
        prop: prop
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

    this.path = new Array();

    if (event.target.checked) {
      this.searchedList.push(node);
      if (this.searchedList.length > 1) {
        this.showDeepPath(this.searchedList[0], this.searchedList[this.searchedList.length - 1]);
        this.allPath.push(this.path);
      }else if (this.searchedList.length === 1) {

        this.path.push(node);
        this.allPath.push(this.path);


      }else {
        this.path = new Array();
      }

    }else {
      // remove and prune tree
      const index = this.searchedList.findIndex(o => o.entity === node.entity);
      this.searchedList.splice(index, 1);
      this.allPath.splice(index, 1);
      // rebuild three starting new root node
      if (index === 0 && this.searchedList.length > 0 ) {

        this.allPath = new Array();
        this.path.push(this.searchedList[0]);
        this.allPath.push(this.path);
        this.path = new Array();

        for (let i = 1; i < this.searchedList.length; i++) {
          const currentNode = this.searchedList[i];
          this.showDeepPath(this.searchedList[0], currentNode);
          this.allPath.push(this.path);
        }

      }
    }
    if (this.searchedList.length > 0) {
      this.startNode = this.searchedList[0].entity;
    }
    this.groupedList = this.searchedList;

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
    this.path = stack;
  }

  private apply() {

    // create new graph from paths
    const newGraph = new Array();
    this.allPath.forEach(ele => {
      ele.forEach(node => {
        const index = newGraph.findIndex(o => o.entity === node.entity);
        if (index === -1) {
          newGraph.push({entity: node.entity, joins: new Array(), grouped: new Array()});
        }
      });
    });
    this.allPath.forEach(ele => {
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
    if (newGraph.length > 0) {
      this.groupedList.forEach(element => {
        newGraph[0].grouped.push(element.entity);
      });
      const json = new Array();
      json.push(newGraph[0]);
      this.report.generateReport(json[0]).subscribe(
        s => {
          console.log(s);
        },
        e => {
          console.log(e);
        }
      );
    }
  }

}
