import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalRegisterComponent } from './components/modals/modal-register/modal-register.component';
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalRegisterComponent,
    ModalLoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
