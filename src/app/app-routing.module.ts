import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './account.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
  },
  {
    path: 'referrals',
    loadChildren: () => import('./referrals-beta/referrals-beta.module').then(m => m.ReferralsBetaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'early-access',
    loadChildren: () => import('./early-access/early-access.module').then(m => m.EarlyAccessModule)
  },
  {
    path: 'specialist',
    loadChildren: () => import('./specialist/specialist.module').then(m => m.SpecialistModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kpi',
    loadChildren: () => import('./kpi/kpi.module').then(m => m.KpiModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'eligibility-benefits',
  //   loadChildren: () => import('./eligibility-benefits/eligibility-benefits.module').then(m => m.EligibilityBenefitsModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'insurance-completion',
  //   loadChildren: () => import('./insurance-completion/insurance-completion.module').then(m => m.InsuranceCompletionModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'verify',
  //   loadChildren: () => import('./verify/verify.module').then(m => m.VerifyModule),
  //   canActivate: [AuthGuard, VerifiedGuard]
  // },
  {
    path: 'join',
    loadChildren: () => import('./join/join.module').then(m => m.JoinModule)
  },
  {
    path: 'secure',
    loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule)
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
