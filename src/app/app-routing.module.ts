import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'referrals',
    loadChildren: () => import('./referrals/referrals.module').then(m => m.ReferralsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'specialist',
    loadChildren: () => import('./specialist/specialist.module').then(m => m.SpecialistModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
