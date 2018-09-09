import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { HttpClientModule } from '@angular/common/http';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import {  NotFoundComponent } from './not-found/not-found.component';
import{RouterModule,Routes} from '@angular/router';
import { SortingpipesPipe } from './sortingpipes.pipe';
import{ ServicesService } from './services.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    SortingpipesPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    Ng2CarouselamosModule,

    NgxPaginationModule,
    FormsModule,
    RouterModule.forRoot([
     { path:'home', component:HomeComponent },
     {path:'',redirectTo:'home',pathMatch:'full'}, 
     {
      path: 'detail/:entityName/:id',
      component: DetailsComponent
    },
    { path: '**', component: NotFoundComponent }

    ])
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

