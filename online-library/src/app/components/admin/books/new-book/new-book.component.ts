import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/shared/models/books';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  id: string;
  booksData: Books[] | any
  booksForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  })

  constructor(
    private bookService: BooksService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { 
    this.id = ''
  }

  ngOnInit(): void {
    this.id = this.bookService.getter();
    this.initForm()
  }
  initForm() {
    if (this.id) {
      this.bookService.getBookById(this.id).subscribe(data => {
        this.booksData = data
        this.booksForm = this.formBuilder.group({
          name: new FormControl(this.booksData.name, Validators.required),
          author: new FormControl(this.booksData.author, Validators.required),
        })
      })
    }
  }

  onSubmit() {
    if (this.id) {
      this.bookService.updateBook(this.id, this.booksForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('Book Updated!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['admin/books'])
        }
      })
      this.booksForm.reset()
    }
    else {
      this.bookService.addBook(this.booksForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('Book Added!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['admin/books'])
        }
        this.booksForm.reset()
      })
    }
  }
  
}
