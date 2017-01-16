import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  inputs: [ 'todo' ]
})
export class TodoComponent implements OnInit {
  public todo: Todo;
  constructor() {

  }

  ngOnInit() {
  }

}
