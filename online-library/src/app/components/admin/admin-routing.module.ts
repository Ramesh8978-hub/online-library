import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BooksComponent } from './books/books.component';
import { NewBookComponent } from './books/new-book/new-book.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '', redirectTo: 'admin', pathMatch: 'full'
      },
      { path: 'users', component: UsersComponent },
      { path: 'users/new-user', component: NewUserComponent },
      { path: 'users/edit', component: NewUserComponent },


      { path: 'books', component: BooksComponent },
      { path: 'books/new-book', component: NewBookComponent },
      { path: 'books/edit', component: NewBookComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
