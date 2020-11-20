import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainDashboardComponent } from './main-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: MainDashboardComponent, 
    canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data:{title:'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data:{title:'Progress'}},
      { path: 'graphic1', component: Graphic1Component, data:{title:'Graphic1'} },
      { path: 'promises', component: PromisesComponent, data:{title:'Promises'} },
      { path: 'account-settings', component: AccountSettingsComponent, data:{title:'Account settings'} },
      { path: 'profile', component: ProfileComponent, data:{title:'My profile'} },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
