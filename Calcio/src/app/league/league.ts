import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FootballService } from '../../services/football';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './league.html'
})
export class LeagueComponent implements OnInit {
  id!: string;
  table: any[] = [];
  nextEvents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FootballService,
    private location: Location
  ) {}

  ngOnInit() {
    // Prende l'id della lega dai parametri della rotta
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    // Popola la classifica
    this.fb.getTable(this.id).subscribe(res => {
      this.table = res.table?.map((team: any, index: number) => ({
        intRank: index + 1,
        strTeam: team.strTeam,
        intPoints: team.intPoints,
        intGoalsFor: team.intGoalsFor,
        intGoalsAgainst: team.intGoalsAgainst,
        intPlayed: team.intPlayed
      })) || [];
    });

    // Popola le prossime partite
    this.fb.getNextEvents(this.id).subscribe(res => {
      this.nextEvents = res.events?.map((e: any) => ({
        dateEvent: e.dateEvent,
        strHomeTeam: e.strHomeTeam,
        strAwayTeam: e.strAwayTeam
      })) || [];
    });
  }

  // Metodo per tornare indietro
  goBack(): void {
    this.location.back();
  }
}
