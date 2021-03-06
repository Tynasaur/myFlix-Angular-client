import { Component, OnInit, Inject } from '@angular/core';
// Material modules
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    /**
     * Uses inject to get the movie details
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      imagePath: string;
      description: string;
      director: string;
      genre: string;
    }
  ) {}

  ngOnInit(): void {}
}
