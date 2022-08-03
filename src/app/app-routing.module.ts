import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryResolver } from './inventory/inventory.resolver';

const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  { path: '', component: LoginComponent },
  { path: 'register', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
