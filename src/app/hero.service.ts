import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
   private log (message: string) {
    this.messageService.add('HeroService: ${message}');
  }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero: id=${id}');
    return of (HEROES.find(hero => hero.id === id));
  }
  constructor (
    private messageService: MessageService,
    private http: HttpClient,
    ) {}
}
