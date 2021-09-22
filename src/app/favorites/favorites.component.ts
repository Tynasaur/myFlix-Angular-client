import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// components
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/details-dialog.component';
// Material modules
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//declarations
const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  faves: any[] = [];
  userDetails: any;
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFaves();
    this.getUserDetails();
  }

  /**
   * gets user details to display username in favorties profile
   */
  public getUserDetails(): void {
    this.userDetails = localStorage.getItem('username') + "'s";
  }

  /**
   * gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.filterFavorites();
    });
  }

  /**
   * gets the users favorite movies
   */
  getUserFaves(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      // console.log(this.faves);
      return this.faves;
    });
  }

  /**
   * Filters movies to display only the users favorites
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.faves.includes(movie._id)) {
        this.favorites.push(movie);
      }
      // console.log(this.favorites);
    });
    return this.favorites; // Calls a reload for a dynamic removal from list
  }

  /**
   * opens genre modal with info about genre
   * @param name (genre name)
   * @param description (genre description)
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  /**
   * opens director modal with infos about director
   * @param name (director name)
   * @param bio (director bio)
   * @param birthday (director birthday)
   * @param deathdate (director deathdate)
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birthday: number,
    deathdate: number
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birthday, deathdate },
      width: '500px',
    });
  }

  /**
   * opens synopsis modal with infos about movie
   * @param title (movie title)
   * @param imageUrl (movie image/cover)
   * @param description (movie description)
   * @param genre (movie genre)
   * @param director (movie director)
   */
  openMovieDetails(
    title: string,
    imageUrl: string,
    description: string,
    genre: string,
    director: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { title, imageUrl, description, genre, director },
      width: '500px',
    });
  }

  /**
   * adds the movie to users favoritemovies array
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
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
   * removes the movie from users favoritemovies array
   * @param id (movie._id - unique identifier)
   * @param title (movie title)
   * @returns a status message - success/error
   */
  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${title} has been removed from your favorites.`,
        'OK',
        {
          duration: 3000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    });
    return this.getUserFaves();
  }

  /**
   * Compares movie id's with getUserFaves returned list to display the favorite movie icon (heart) correctly
   * @param id
   */
  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
