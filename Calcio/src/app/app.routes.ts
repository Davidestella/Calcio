import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LeagueComponent } from './components/league/league';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'league/:id', component: LeagueComponent },
  { path: '**', redirectTo: '' }
];

