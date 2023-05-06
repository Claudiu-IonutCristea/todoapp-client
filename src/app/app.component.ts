import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from './components/modals/modal-register/modal-register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'todoapp-client';

  constructor(private modalService: NgbModal) {}

  openModal(){
    this.modalService.open(ModalRegisterComponent);
  }
}
