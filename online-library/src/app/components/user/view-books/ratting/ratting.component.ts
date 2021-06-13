import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-ratting',
  templateUrl: './ratting.component.html',
  styleUrls: ['./ratting.component.scss']
})
export class RattingComponent implements OnInit {
  id: any;
  ratting:any;
  rattingForm = new FormGroup({
    ratting: new FormControl('', Validators.required)
  })
  constructor(
    private bookService: BooksService,
  ) { }

  ngOnInit(): void {
    this.id = this.bookService.getter()
  }
  getRatting(){
    this.ratting = this.rattingForm.value.ratting
  }
  updateRatting() {
    let ratting = {
      ratting: this.ratting
    }
    this.bookService.updateBook(this.id, ratting).subscribe(data => {})
  }
}
