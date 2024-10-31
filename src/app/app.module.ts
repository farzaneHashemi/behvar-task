import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { UsersComponent } from './pages/users/users.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    // MatDialogModule,
    // MatButtonModule, // they get conflict with the user.component.ts 
    AppComponent,
    DepartmentsComponent,
    EntityListComponent,
    UsersComponent,
    UserDetailDialogComponent,
    LoadingComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
