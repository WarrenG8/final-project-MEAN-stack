// STEP 1 Import ModuleWithProviders Routes, RouterModule

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Step 2 Import the components that will be linked to a route 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChartsComponent } from './charts/charts.component';



// Step 3 Setup the Routes
export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'charts', component: ChartsComponent }
];

// Step 4 -Tell angular to use this router
export const routes: ModuleWithProviders = RouterModule.forRoot(router);