import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Todo } from '../todo';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  inputs: [ 'todo' ]
})
export class TodoComponent implements OnInit {
  public todo: Todo;
   
  constructor( private _apiService : ApiService, private _el : ElementRef ) {
  }

  deleteTodo() {
    this._apiService.deleteTodo( this.todo.id );
  }

  ngOnInit() {
    Observable.fromEvent( this._el.nativeElement, 'keyup')
      .map( ( event :any ) => event.target.value )
      .debounceTime(1000)
      .distinctUntilChanged()
      .filter( value => value.length > 0 )
      .subscribe(
        todoText =>  {
          this._apiService.updateTodo( this.todo.id, new Todo( todoText ) );

        } );

  }

}
