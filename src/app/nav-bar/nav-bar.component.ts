import { Component, OnInit } from '@angular/core';
// custom components
import { ProfileViewComponent } from '../profile-view/profile-view.component';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public router: Router, ) {}

  ngOnInit(): void {}

 
     openUserProfile(): void {
      this.dialog.open(ProfileViewComponent, {
        width: '500px'
      } );
    }
  
}
