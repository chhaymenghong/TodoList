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
          this.todos = json.map( todoData => new Todo( todoData.text, todoData.isCompleted, todoData._id ) );
          this.allTodos.next( this.todos );
        },
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
          this.todos.push( new Todo( json.text, json.isCompleted, json._id ) );
        },
        console.log
      );
  }

  updateTodo( id: string, updatedTodo ) {
    this.isUpdatingTodo.next( true );
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    this._http.put(`/api/todo/${id}`, JSON.stringify( updatedTodo ), { headers : headers } )
      .map( resp => resp.json() )
      .subscribe(
        ( json ) => {
          let todoToUpdate = this.todos.find( todo => todo.id === id )
          Object.assign( todoToUpdate, updatedTodo );
          this.isUpdatingTodo.next( false );
        }, ( err ) => {
          console.log( err );
          this.isUpdatingTodo.next( false );
        } );
  }

  deleteTodo( id: string ) {
    this._http.delete(`/api/todo/${id}`)
      .subscribe(
        () => {
          let index = this.todos.findIndex( todo => todo.id === id);
          this.todos.splice(index, 1);
        },
        console.log );
  }
}
