import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeBodyComponent } from './home/home-body/home-body.component';
const routes: Routes = [
  {
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'home',
		component: HomeComponent,
    children:[
      {
        path: '',
				component: HomeBodyComponent,
				data: { state: 'home-body' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
