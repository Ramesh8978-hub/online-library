import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = [
    'sno',
    'name',
    'author',
    'ratting',
    'status',
    'actions',
  ];
  isLoading!: boolean;
  id: string;
  dataSource: any;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10, 25, 50, 100];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private bookService: BooksService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
    this.id = ''
    this.total = 0 ,
    this.pageSize = 0,
    this.pageIndex = 0
   }

  ngOnInit(): void {
    this.isLoading = true;
    this.ReadBookDetails();
  }
  ReadBookDetails() {
    this.bookService.getBook().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  updateBook(id: string) {
    this.bookService.setter(id);
    this.router.navigate([`admin/books/edit`])
  }
  deleteBook(id: string) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
      this.bookService.deleteBook(id).subscribe(data => {
        this.ReadBookDetails();
        this.snackbar.open('Book Deleted', 'Ok', {
          duration: 2000,
        });
      });
    }
  }
  async changeStatus(id: string, status: boolean) {
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    console.log(status);

    }
    let pickup = {
      pickup: status
    }
    this.bookService.updateBook(id, pickup).subscribe(data => {
      if (data) {
        this.ReadBookDetails()
      }
    })
  }
}
