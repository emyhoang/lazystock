import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { EditStockComponent } from './edit-stock/edit-stock.component';

const routes: Routes = [
  { path : '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'stocks/:id/edit', component: EditStockComponent , pathMatch: 'full', canActivate: [AuthGuardService] }, 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
