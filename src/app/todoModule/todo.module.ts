import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService } from './service/api.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { TodoMainComponent } from './todo-main/todo-main.component';
import { TodoFormComponent } from './todo-form/todo-form.component';


@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ TodoListComponent, TodoComponent, TodoMainComponent, TodoFormComponent ],
  exports: [ TodoMainComponent ],
  providers: [ ApiService ]
})
export class TodoModule {
}
