import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

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
    path: 'agent',
    loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule),
    canActivate: [AuthGuard]
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
    path: 'accounting',
    loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'banking',
    loadChildren: () => import('./banking/banking.module').then(m => m.BankingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'overview',
    loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reconciliation',
    loadChildren: () => import('./reconciliation/reconciliation.module').then(m => m.ReconciliationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kpi',
    loadChildren: () => import('./kpi/kpi.module').then(m => m.KpiModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'eligibility-benefits',
    loadChildren: () => import('./eligibility-benefits/eligibility-benefits.module').then(m => m.EligibilityBenefitsModule),
    canActivate: [AuthGuard]
  },
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
