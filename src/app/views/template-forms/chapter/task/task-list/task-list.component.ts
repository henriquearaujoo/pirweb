import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasks = new Array();

  constructor() {
    this.tasks = ['task1', 'task2', 'task3'];
   }

  ngOnInit() {
  }

}
