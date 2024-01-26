import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: "", loadChildren: () => {
  //   return import('./components/pages/').then(pm => pm.PagesModule)
  // }},
  // {path: "admin", loadChildren: () => {
  //   return import("").then(am => am.AdminModule)
  // }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }