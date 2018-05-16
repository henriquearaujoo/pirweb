import { Properties } from './../../models/properties';
import { Node } from './../../models/node';
import { BigraphService } from './../../services/bi-graph/bigraph.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private report: BigraphService) {

  }

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
            entityName: nodes[i].entity,
            alias: nodes[i].alias
          };
        }

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

            let entityName = prop.type;
            if (prop.type.indexOf('Collection<') !== -1) {
              entityName = prop.type.slice(11, prop.type.length - 1);
            }else if (prop.type.indexOf('Set<') !== -1) {
              entityName = prop.type.slice(4, prop.type.length - 1);
            }
            const k = this.nodeList.find(o => o.entityName === entityName);
            if (k !== undefined ) {
              this.nodeList[i].child.nodes.push({nodes: k, fk: prop.property});
            }
          }
        }
        console.log(this.nodeList);
        // this.showDeepPath(this.nodeList[3].entityName);
        // this.showBreadthPath(this.nodeList[3].entityName);
      },
      e => {
        console.log(e);
      }
    );
  }

  amountProps(entity) {
    const startIndex = this.nodeList.findIndex(o => o.entityName === entity);
    this.properties = this.nodeList[startIndex];
    this.currentTable = this.properties.alias;
  }

  private showDeepPath(startNode) {
    const visited = [];
    const stack = new Array();
    stack.push(startNode);
    for (let i = 0; i < this.nodeList.length; i++) {
      visited[i] = false;
    }
    const startIndex = this.nodeList.findIndex(o => o.entityName === startNode);
    visited[startIndex] = true;
    while (stack.length > 0 ) {

      const currentNode = stack[stack.length - 1];
      const currentIndex = this.nodeList.findIndex(o => o.entityName === currentNode);
      const childrenNodes = this.nodeList[currentIndex].child.nodes;
      let hasDeepNodes = false;

      for (let i = 0; i < childrenNodes.length && !hasDeepNodes; i++) {
        const entityDest =  this.nodeList.findIndex(o => o.entityName === childrenNodes[i].nodes.entityName);
        if (!visited[entityDest]) {
          visited[entityDest] = true;
          stack.push(childrenNodes[i].nodes.entityName);
          // console.log(currentNode + '-----' +  childrenNodes[i].fk + '------>' + childrenNodes[i].nodes.entityName);
          hasDeepNodes = true;
        }
      }
      if (!hasDeepNodes) {
        stack.pop();
      }
    }
  }

  private showBreadthPath(startNode) {
    const visited = [];
    const queue = new Array();
    queue.push(startNode);
    for (let i = 0; i < this.nodeList.length; i++) {
      visited[i] = false;
    }
    const startIndex = this.nodeList.findIndex(o => o.entityName === startNode);
    visited[startIndex] = true;
    while (queue.length > 0 ) {

      const currentNode = queue.splice(0, 1);
      const currentIndex = this.nodeList.findIndex(o => o.entityName === currentNode[0]);
      const childrenNodes = this.nodeList[currentIndex].child.nodes;

      for (let i = 0; i < childrenNodes.length; i++) {
        const entityDest =  this.nodeList.findIndex(o => o.entityName === childrenNodes[i].nodes.entityName);
        if (!visited[entityDest]) {
          visited[entityDest] = true;
          queue.push(childrenNodes[i].nodes.entityName);
          console.log(currentNode + '->' + childrenNodes[i].nodes.entityName);
        }
      }
    }
  }
}
