import { Component, OnInit } from '@angular/core';
// custom modules
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieDetailsComponent } from '../movie-details/details-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  faves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      panelClass: 'genre-dialog',
    });
  }

  showDirectorDialog(
    name: string,
    bio: string,
    birthday: string,
    deathdate: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birthday, deathdate },
      panelClass: 'director-dialog',
    });
  }
  showMovieDetails(
    title: string,
    imagePath: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { title, imagePath, description, director, genre },
      panelClass: 'details-dialog',
    });
  }

  addToFavoriteMoviesList(id: string, Title: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((response: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      });
      return this.getUsersFavs();
    });
  }

  /**
   * Removed movie from users favorites list
   */
  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      });
      return this.getUsersFavs();
    });
  }

  /**
   * Returns a list of the users favorites movie._id's
   */
  getUsersFavs(): void {
    const user = localStorage.getItem('Username');
    this.fetchApiData.getUser(user).subscribe((response: any) => {
      this.faves = response.Favorites;
      //console.log(this.faves);
      return this.faves;
    });
  }
  /**
   * Compares movie id's with getUsersFavs returned list to set the Favorites icon to add/remove correctly
   */
  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
