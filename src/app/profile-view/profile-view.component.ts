import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// components
import { FetchApiDataService } from '../fetch-api-data.service';
import { ProfileEditViewComponent } from '../profile-edit-view/profile-edit-view.component';
// Material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

    /**
   * Gets user details, used to display username in the user profile
  */
  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(user);
    });
  }

    /**
   * Opens the dialog to update user information
  */
  openUpdateUserDialog(): void {
    this.dialog.open(ProfileEditViewComponent, {
      panelClass: 'update-dialog',
      width: '700px',
    });
  }

    /**
   * Permanently deletes user profile
  */
  deleteUserProfileDialog(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUserProfile().subscribe(
        () => {
          this.snackBar.open(
            'Your account has successfully been deleted!',
            'OK',
            {
              duration: 2000,
            }
          );
          localStorage.clear();
        },
        (resp) => {
          this.snackBar.open(resp, 'OK', {
            duration: 2000,
          });
          // Refreshes and redirects to welcome view
          this.router.navigate(['/welcome']);
        }
      );
    }
  }
}
