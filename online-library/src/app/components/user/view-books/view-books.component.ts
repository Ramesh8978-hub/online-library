import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import { ReviewService } from 'src/app/shared/services/review.service';
import { RattingComponent } from './ratting/ratting.component';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit {

  displayedColumns: string[] = [
    'sno',
    'name',
    'author',
    'status'
  ];
  isLoading!: boolean;
  id!: string;
  userId: any;
  bookData: any
  dataSource: any;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  totalLength = [10, 25, 50, 100];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<RattingComponent> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private bookService: BooksService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('id')
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
  openDialog(id:any) {
    this.bookService.setter(id);
    this.simpleDialog = this.dialog.open(RattingComponent, {
      width: '27%'
    });
  }
 
  async changeStatus(id: string, status: boolean) {
    this.openDialog(id)
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    let pickup = {
      pickup: status,
      user: this.userId,
    }
    this.bookService.updateBook(id, pickup).subscribe(data => {
      if (data) {
        this.snackBar.open('Book Picked!', 'Success', {
          duration: 2000,
        });
        this.ReadBookDetails()
      }
    })
  }
  pickedBook(){
    alert('This book is not-available')
  }

}
