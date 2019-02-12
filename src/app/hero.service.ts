import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
       console.log('${operation} failed: {$error.message}');
       return of(result as T);
     };
   }
   private log (message: string) {
    this.messageService.add('HeroService: ${message}');
  }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
       catchError(this.handleError('getHeroes', [])));
  }
  getHero(id: number): Observable<Hero> {
    const url = '${this.heroesUrl/${id}}';
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log('fetched hero id=${id}')),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log('updated hero id=${hero.id}')),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  constructor (
    private messageService: MessageService,
    private http: HttpClient,
    ) {}
}
