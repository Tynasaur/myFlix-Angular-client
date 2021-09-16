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

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((response: any) => {
      this.user = response;
      console.log(user);
    });
  }

  openUpdateUserDialog(): void {
    this.dialog.open(ProfileEditViewComponent, {
      panelClass: 'update-dialog',
      width: '700px',
    });
  }

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
        (response) => {
          this.snackBar.open(response, 'OK', {
            duration: 2000,
          });
          // Refreshes and redirects to welcome view
          this.router.navigate(['/welcome']);
        }
      );
    }
  }
}
