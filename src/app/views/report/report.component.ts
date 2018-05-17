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

  private joinList = [] = new Array();
  private columnList = [] = new Array();
  private groupedList = [] = new Array();
  private orderList = [] = new Array();
  private path = [] = new Array();
  private allPath: any[] = Array();
  private treeToSearch: any[] = Array();
  private searchedList = [] = new Array();

  private startNode: string;

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
        // console.log(this.nodeList);
        // this.showDeepPath(this.nodeList[5].entity, this.nodeList[11].entity); // visit to community
        // this.showBreadthPath(this.nodeList[18].entity, this.nodeList[4].entity); // visit to community
      },
      e => {
        console.log(e);
      }
    );
  }

  createPath(node: Node, event) {

    this.path = new Array();

    if (event.target.checked) {
      this.searchedList.push(node);
      if (this.searchedList.length > 1) {
        this.showDeepPath(this.searchedList[0], this.searchedList[this.searchedList.length - 1]);
      }else if (this.searchedList.length === 1) {
        this.path.push(node);
        this.allPath.push(this.path);
      }else {
        this.path = new Array();
      }
    }else {

      const index = this.searchedList.findIndex(o => o.entity === node.entity);
      this.searchedList.splice(index, 1);
      this.allPath[index].splice(index, this.allPath[index].length);
      this.allPath.splice(index, 1);
    }
    if (this.searchedList.length > 0) {
      this.startNode = this.searchedList[0].entity;
    }
    this.groupedList = this.searchedList;
    console.log(this.allPath);
  }

  amountProps(entity) {
    const startIndex = this.nodeList.findIndex(o => o.entity === entity);
    this.properties = this.nodeList[startIndex];
    this.currentTable = this.properties.alias;
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
          // console.log(currentNode + '-----[' +  childrenNodes[i].fk + ']------>' + childrenNodes[i].nodes.entity);
          hasDeepNodes = true;

          if (childrenNodes[i].nodes.entity === this.nodeList[endIndex].entity) {
            foundEnd = true;
          }
        }
      }
      if (!hasDeepNodes) {
        // console.log(stack);
        stack.pop();
      }
    }
    this.path = stack;
    this.allPath.push(this.path);
  }

  private showBreadthPath(startNode, endNode) {
    const visited = [];
    const queue = new Array();
    queue.push(startNode);
    for (let i = 0; i < this.nodeList.length; i++) {
      visited[i] = false;
    }

    let foundEnd = false;
    const startIndex = this.nodeList.findIndex(o => o.entity === startNode);
    const endIndex = this.nodeList.findIndex(o => o.entity === endNode);
    visited[startIndex] = true;

    this.path.push(queue[startIndex]);

    while (queue.length > 0 ) {
      this.path.splice(0, 1);
      const currentNode = queue.splice(0, 1);
      const currentIndex = this.nodeList.findIndex(o => o.entity === currentNode[0]);
      const childrenNodes = this.nodeList[currentIndex].child.nodes;

      for (let i = 0; i < childrenNodes.length; i++) {

        const entityDest =  this.nodeList.findIndex(o => o.entity === childrenNodes[i].nodes.entity);

        if (!visited[entityDest]) {

          visited[entityDest] = true;
          queue.push(childrenNodes[i].nodes.entity);
          this.path.push(childrenNodes[i].nodes.entity);

          // console.log(currentNode + '->' + childrenNodes[i].nodes.entity);
          if (childrenNodes[i].nodes.entity === this.nodeList[endIndex].entity) {
            foundEnd = true;
          }
        }
      }
    }

  }
}
