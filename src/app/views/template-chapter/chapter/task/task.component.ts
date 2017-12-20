import { Task } from './../../../../models/task';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task;

  constructor() { }

  ngOnInit() {
    this.task = new Task();
  }

}
