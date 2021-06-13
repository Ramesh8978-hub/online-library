import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'sno',
    'name',
    'email',
    'phone',
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
    private userService:UsersService,
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
    this.ReadUserDetails();
  }
  ReadUserDetails() {
    this.userService.getUser().subscribe(data => {
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
  updateUser(id: string) {
    this.userService.setter(id);
     this.router.navigate([`admin/users/edit`])
  }
  deleteUser(id: string) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
      this.userService.deleteUser(id).subscribe(data => {
        this.ReadUserDetails();
        this.snackbar.open('User Deleted', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

}
