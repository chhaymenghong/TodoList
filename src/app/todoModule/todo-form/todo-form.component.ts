import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  // we can use this text field
  // or we can just use the value passed in by the submit method
  public todo: Object;
  constructor( private _apiService : ApiService ) { }

  submit( controlObject ) {
    this._apiService.addTodo( new Todo( controlObject.todo ) );
  }

  ngOnInit() {
  }

}
