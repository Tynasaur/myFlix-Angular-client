import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieDetailsComponent } from '../movie-details/details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  isLoading = false;
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

  /**
   * Get all Movies
   */
  getMovies(): void {
    this.isLoading = true;
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.isLoading = false;
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens genre details in a MatDialog modal
   * @param name Genre name
   * @param description genre description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      panelClass: 'genre-dialog',
    });
  }

  openDirectorDialog(
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
  /**
   * Opens movie synopsis modal with Title, description and trailer video
   * @param Title movie title
   * @param description movie description
   */
  openMovieDetails(
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

  /**
   * Adds move to users favorites list
   */
  addToFavoriteMoviesList(id: string, Title: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((response: any) => {
      console.log(response);
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
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.Favorites;
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
