import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';
import { ViewBooksComponent } from './view-books/view-books.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RattingComponent } from './view-books/ratting/ratting.component';


@NgModule({
  declarations: [
    UserComponent,
    ViewBooksComponent,
    UserNavComponent,
    RattingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class UserModule { }
