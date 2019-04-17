import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { StockService } from './stock.service';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    DashboardComponent,
    EditStockComponent,
    StockDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatToolbarModule,
    MatIconModule,
    
  ],
  providers: [
    AuthService,
    AuthGuardService,
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
