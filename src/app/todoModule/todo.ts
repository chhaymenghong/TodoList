export class Todo {
  public text: string;
  public isCompleted: boolean;
  public id: string;
  constructor( text : string, isCompleted: boolean = false, id? : string ) {
    this.text = text;
    this.isCompleted = isCompleted;
    if ( id ) {
      this.id = id;
    }
  }
}
