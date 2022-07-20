import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { HomeComponent } from './home/home.component';
import { DefaultErrorComponent } from './default-error/default-error.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    CitiesComponent,
    CityComponent,
    HomeComponent,
    DefaultErrorComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "cities",
        component: CitiesComponent
      },
      {
        path: "cities/:cityId",
        component: CityComponent
      },
      {
        path: "search",
        component: SearchComponent
      },
      {
        path: "**",
        pathMatch: 'full',
        component: DefaultErrorComponent
      }      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
