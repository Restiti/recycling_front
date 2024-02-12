import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { MaterialComponent } from './material/material.component';
import { CommandeComponent } from './commande/commande.component';
import { HistoCommandeComponent } from './histo-commande/histo-commande.component';
import { MaterialModule } from './material-module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    LoginComponent,
    GroupComponent,
    MaterialComponent,
    CommandeComponent,
    HistoCommandeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent, LoginComponent, GroupComponent, MaterialComponent, MemberComponent, CommandeComponent],
})
export class AppModule { }

