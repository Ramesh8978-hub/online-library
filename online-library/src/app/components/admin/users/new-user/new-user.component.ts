import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/shared/models/users';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  id: string;
  userData: Users[] | any
  usersForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private userService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) { this.id = '' }

  ngOnInit(): void {
    this.id = this.userService.getter();
    this.initForm()
  }
  initForm() {
    if (this.id) {
      this.userService.getUserById(this.id).subscribe(data => {
        this.userData = data
        this.usersForm = this.formBuilder.group({
          name: new FormControl(this.userData.name, Validators.required),
          email: new FormControl(this.userData.email, Validators.required),
          phone: new FormControl(this.userData.phone, Validators.required),
          password: new FormControl(this.userData.password, Validators.required)
        })
      })
    }
  }

  onSubmit() {
    if (this.id) {
      this.userService.updateUser(this.id, this.usersForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('User Updated!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['admin/users'])
        }
        this.usersForm.reset()
      })
    }
    else {
      this.userService.addUser(this.usersForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('User Added!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['admin/users'])
        }
        this.usersForm.reset()
      })
    }
  }

}
