import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],   // 🔥 obbligatorio!
  templateUrl: './home.html'
})
export class Home {

  leagues: any[] = [];
  loading = true;
  searchText = "";   // necessario

  constructor(private router: Router) {}

  ngOnInit() {
    fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .then(res => res.json())
      .then(data => {
        this.leagues = data.leagues.filter((l: any) => l.strSport === "Soccer");
        this.loading = false;
      });
  }

  filteredLeagues() {
    return this.leagues.filter(
      l => l.strLeague.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  mapCountry(country: string) {
    if (!country) return "US";

    return country
      .replace("England", "GB")
      .replace("Scotland", "GB")
      .replace("Wales", "GB")
      .replace("Northern Ireland", "GB")
      .replace(" ", "%20");
  }

  openLeague(id: string) {
    this.router.navigate(['/league', id]);
  }
}
