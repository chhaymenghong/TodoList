import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Todo } from '../todo';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ApiService {
  public todos: Todo[];
  public allTodos : BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor( private _http : Http ) {
  }

  getTodos() {
    return this._http.get('/api/todos')
      .map( resp => resp.json() )
      .subscribe(
        json => {
          this.todos = json.map( todoData => new Todo( todoData.text, todoData.isCompleted, todoData.id ) );
          this.allTodos.next( this.todos );
        },
        console.log
      );
  }

  getTodo( id: string ) {
    return this._http.get(`/api/todo/${id}`)
      .map( resp => resp.json().map( todoData => new Todo( todoData ) ) )
      .subscribe(
        () => {},
        console.log
       );
  }

  addTodo( todo: Todo ) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this._http.post('/api/todo', JSON.stringify( todo ), { headers : headers } )
      .map( resp => resp.json() )
      .subscribe(
        ( json ) => {
          this.todos.push( new Todo( json.text, json.isCompleted, json.id ) );
          this.allTodos.next( this.todos );
        },
        console.log
      );
  }

  updateTodo( id: string, updatedTodo ) {
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    this._http.put(`/api/todo/${id}`, JSON.stringify( updatedTodo ), { headers : headers } )
      .subscribe( console.log, ( err ) => console.log( err ) );
  }

  deleteTodo( id: string ) {
    this._http.delete(`/api/todo/${id}`)
      .subscribe( console.log, ( err ) => console.log( err ) );
  }
}
