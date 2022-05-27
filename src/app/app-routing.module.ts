import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
  {path: 'home', canActivate: [AuthGuard], component: HomePageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
