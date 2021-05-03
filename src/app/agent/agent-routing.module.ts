import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentComponent } from './agent.component';
import { IsAgentGuard } from '../isAgent.guard';

const routes: Routes = [
  {
    path: '', component: AgentComponent, canActivate: [IsAgentGuard], children: [
      { path: '', redirectTo: 'clinics', pathMatch: 'full' },
      { path: 'clinics', loadChildren: () => import('./clinics/clinics.module').then(m => m.ClinicsModule) },
      { path: 'clinics/:clinicId/patients', loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule) },
      {
        path: 'clinics/:clinicId/patients/:patientId/dental-insurance',
        loadChildren: () => import('./dental-insurance/dental-insurance.module').then(m => m.DentalInsuranceModule)
      },
      {
        path: 'clinics/:clinicId/patients/:patientId/medical-insurance',
        loadChildren: () => import('./medical-insurance/medical-insurance.module').then(m => m.MedicalInsuranceModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
