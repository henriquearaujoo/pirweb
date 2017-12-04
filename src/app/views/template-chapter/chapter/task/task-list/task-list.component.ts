import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasks = new Array();

  constructor() {
    this.tasks = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];
   }

  ngOnInit() {
  }

}
