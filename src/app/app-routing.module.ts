import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardListComponent} from "./board-list/board-list.component";
import {LoginComponent} from "./auth/login/login.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: BoardListComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'register', pathMatch: 'full', redirectTo: 'login'},
  {path: 'admin', pathMatch: 'full', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
