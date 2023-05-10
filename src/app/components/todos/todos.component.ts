import { Component, Input, OnInit } from '@angular/core';
import { ToDo, IToDoItem } from 'src/app/Classes/ToDo';
import { TODOs } from 'src/app/mock-todos';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmDeleteTodoComponent } from '../modals/modal-confirm-delete-todo/modal-confirm-delete-todo.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})

export class TodosComponent implements OnInit{
  @Input() useLocalStorage = false;

  TODOSLOCAL = 'todoslocal';

  todos = new Array<ToDo>();

  // todos: ToDo[] = TODOs;
  // todosLocal: ToDo[] = this.setupLocal();

  ngOnInit(): void {
    if(this.useLocalStorage){
      this.todos = this.setupLocal();
    }
  }

  constructor(
    private modalService: NgbModal,
    private storageService: StorageService,
  ) {}

  addNewItem(todo: ToDo, text: string){
    if(text){
     todo.todoItems.push({
       text: text,
       completed: false
      })
    }
  }

  addTodo(title: string){
    if(title){
      this.todos?.unshift(new ToDo(title));
    }
    console.log(this.todos);
  }

  updateCheck(item: IToDoItem){
    item.completed = !item.completed;
  }

  deleteItem(todo: ToDo, item: IToDoItem){
    const i = todo.todoItems.indexOf(item);
    todo.todoItems.splice(i, 1);
  }

  deleteTodo(todo: ToDo){
    const modalRef = this.modalService.open(ModalConfirmDeleteTodoComponent);
    modalRef.componentInstance.todoName = todo.title;
    modalRef.componentInstance.delete.subscribe(() => {
      const i = this.todos?.indexOf(todo, 0);
      this.todos.splice(i, 1);
    })
  }

  setupLocal(): ToDo[]{
    const todosLocalJson = localStorage.getItem(this.TODOSLOCAL);
    let todosLocalParsed;
    let todosLocal = new Array<ToDo>();
    if(todosLocalJson == null){
      //no local todos
      const tutorialTodo = this.tutorialTodo();
      localStorage.setItem(this.TODOSLOCAL, JSON.stringify(Array<ToDo>(tutorialTodo)));
      todosLocal.push(this.tutorialTodo());
      console.log(this.tutorialTodo());
      return todosLocal;
    }
    else{
      todosLocalParsed = JSON.parse(todosLocalJson);
    }

    for(let todo of todosLocalParsed){
      todosLocal.push(new ToDo(todo.title, todo.todoItems, todo.id));
    }

    return todosLocal;

  }

  tutorialTodo(): ToDo{
    return new ToDo(
      "Tutorial",
      new Array<IToDoItem>(
        {
          text: "Test",
          completed: false
        },
        {
          text: "This is a test",
          completed: true
        },
        {
          text: "Test",
          completed: false
        },
        
      ),
      "tutorialTodo"
    );
  }
}
