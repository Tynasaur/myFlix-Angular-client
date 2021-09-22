import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// components
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { FavoritesComponent } from '../favorites/favorites.component';
// Material modules
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Opens user profile, from here you can update user info
   */
  openUserProfile(): void {
    this.dialog.open(ProfileViewComponent, {
      width: '500px',
    });
  }

  /**
   * Opens the users favorites page
   */
  openFavorites(): void {
    this.dialog.open(FavoritesComponent);
  }

  /**
   * Logs user out of app
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000,
    });
  }
}
