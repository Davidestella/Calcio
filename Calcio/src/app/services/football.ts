import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private baseUrl = 'https://www.thesportsdb.com/api/v1/json/3';

  constructor(private http: HttpClient) {}

  getLeagues(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all_leagues.php`);
  }

  getTable(leagueId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/lookuptable.php?l=${leagueId}&s=2024-2025`);
  }

  getNextEvents(leagueId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/eventsnextleague.php?id=${leagueId}`);
  }
}
