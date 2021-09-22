import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// components
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieDetailsComponent } from '../movie-details/details-dialog.component';
// Material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//declarations
const user = localStorage.getItem('username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  faves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFaves();
  }

  /**
   * Get all Movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
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

    /**
   * Opens genre details in a MatDialog modal
   * @param name Director name
   * @param bio director bio
   * @param birthday director birthday
   * @param deathdate director deathdate
   */
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
   * Opens movie synopsis modal with movie-details
   * @param title movie title
   * @param imagePath movie imagePath
   * @param description movie description
   * @param director movie director
   * @param genrre movie genre
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
    });
  }

  /**
   * Adds move to users favorites list
   */
  addToFavoriteMoviesList(id: string, Title: string): void {
    this.fetchApiData.addToFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      });
      return this.getUserFaves();
    });
  }

  /**
   * Removes movie from users favorites list
   */
  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      });
      return this.getUserFaves();
    });
  }

  /**
   * Returns a list of the users favorites movie._id's
   */
  getUserFaves(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      // console.log(this.faves);
      return this.faves;
    });
  }

  /**
   * Compares movie id's with getUserFaves returned list to set the Favorites icon to add/remove correctly
   */
  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
