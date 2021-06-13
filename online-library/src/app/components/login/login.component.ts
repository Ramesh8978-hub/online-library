import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models/users';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  role: string
  userData:Users[] | any;
  usersData:Users[] | any;
  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  constructor(
    private router: Router,
    private userService: UsersService,
    private snackBar: MatSnackBar,
  ) { this.role = '' }

  ngOnInit(): void {
  }

  onSubmit() {
    let adminData = {
      role: 'admin',
      name: this.loginForm.value.name,
      password: this.loginForm.value.password
    }
    let userData = {
      role: 'user',
      name: this.loginForm.value.name,
      password: this.loginForm.value.password
    }
    this.userService.getUser().subscribe(data => {
      this.userData = data;
      this.userData.map((e: any) => {
        if (e.role === adminData.role) {
          this.userService.login(adminData).subscribe(data => {
            if (data) {
              this.usersData = data
              window.localStorage.setItem('id', this.usersData._id);
              window.localStorage.setItem('name', this.usersData.name);
              window.localStorage.setItem('email', this.usersData.email);
              if (data) {
                this.router.navigate(['admin'])
              }
            }
          })
        }
        else if (e.role === userData.role) {
          this.userService.login(userData).subscribe(data => {
            if (data) {
              this.usersData = data
              window.localStorage.setItem('id', this.usersData._id);
              window.localStorage.setItem('name', this.usersData.name);
              window.localStorage.setItem('email', this.usersData.email);
              if (data) {
                this.router.navigate(['user'])
              }
            }
          })
        }
      })
    })
  }

}
