import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// components
import { FetchApiDataService } from '../fetch-api-data.service';
// Material modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (resp) => {
        localStorage.setItem('username', resp.user.Username);
        localStorage.setItem('token', resp.token);
        this.dialogRef.close();
        console.log(resp);
        this.snackBar.open('Login successful', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['movies']);
      },
      (resp) => {
        this.snackBar.open(resp, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
