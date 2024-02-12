import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service'; 
import { GroupComponent } from './group/group.component';
import { MaterialComponent } from './material/material.component';
import { CommandeComponent } from './commande/commande.component';
import { HistoCommandeComponent } from './histo-commande/histo-commande.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'members', component: MemberComponent, canActivate: [AuthGuard] }, 
  { path: 'groups', component: GroupComponent, canActivate: [AuthGuard] }, 
  { path: 'materials', component: MaterialComponent, canActivate: [AuthGuard] }, 
  { path: 'commandes', component: CommandeComponent, canActivate: [AuthGuard] }, 
  { path: 'histo-commandes', component: HistoCommandeComponent, canActivate: [AuthGuard] }, 


  // Ajoutez d'autres routes protégées de la même manière
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
