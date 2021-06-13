import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { BooksComponent } from './books/books.component';
import { NewBookComponent } from './books/new-book/new-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';


@NgModule({
  declarations: [
    UsersComponent,
    NewUserComponent,
    BooksComponent,
    NewBookComponent,
    AdminComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
