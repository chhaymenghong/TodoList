import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Todo } from '../todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todos$ : Observable<Todo[]>;

  constructor( private _apiService: ApiService ) {
    this.todos$ = _apiService.allTodos;
  }

  ngOnInit() {
    this._apiService.getTodos();
  }

}
