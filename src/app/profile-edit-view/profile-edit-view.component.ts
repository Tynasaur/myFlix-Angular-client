import { Component, OnInit, Input } from '@angular/core';
// components
import { FetchApiDataService } from '../fetch-api-data.service';
// Material modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit-view',
  templateUrl: './profile-edit-view.component.html',
  styleUrls: ['./profile-edit-view.component.scss'],
})
export class ProfileEditViewComponent implements OnInit {
  //fields for user update form
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  username: any = {};
  movies: any = [];
  favorites: any = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditViewComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //update user details
  editProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe(
      (res) => {
        // Logic for successful user registration needs to be implemented here!
        this.dialogRef.close();
        localStorage.setItem('user', res.username);
        console.log(res);
        this.snackBar.open(
          
          'Successfully updated user details!', "ok",
          {
            duration: 3000,
          }
        );
      },
      (res) => {
        this.snackBar.open(res, 'OK', {
          duration: 3000,
        });
        setTimeout(function () {
          window.location.reload();
        }, 3500);
      }
    );
  }
}
