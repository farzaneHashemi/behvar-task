import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    EntityFormComponent,
    EntityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
