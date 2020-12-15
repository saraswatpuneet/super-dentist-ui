import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/auth.guard';
import { VerifiedGuard } from 'src/app/verified.guard';
import { AccountGuard } from 'src/app/account.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuard, AccountGuard, VerifiedGuard]
  },
  {
    path: 'referrals',
    loadChildren: () => import('./referrals-beta/referrals-beta.module').then(m => m.ReferralsBetaModule),
    canActivate: [AuthGuard, VerifiedGuard]
  },
  {
    path: 'referrals2',
    loadChildren: () => import('./referrals/referrals.module').then(m => m.ReferralsModule),
    canActivate: [AuthGuard, VerifiedGuard]
  },
  {
    path: 'specialist',
    loadChildren: () => import('./specialist/specialist.module').then(m => m.SpecialistModule),
    canActivate: [AuthGuard, VerifiedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then(m => m.VerifyModule),
    canActivate: [AuthGuard, VerifiedGuard]
  },
  {
    path: 'join',
    loadChildren: () => import('./join/join.module').then(m => m.JoinModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
    // canActivate: [AuthGuard, VerifiedGuard]
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
