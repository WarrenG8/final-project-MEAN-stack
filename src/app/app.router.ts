// // STEP 1 Import ModuleWithProviders Routes, RouterModule

// import { ModuleWithProviders } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// // Step 2 Import the components that will be linked to a route 

// import { AppComponent } from './app.component';
// import { AboutComponent } from './about/about.component';
// import { ServicesComponent } from './services/services.component';

// // Step 3 Setup the Routes
// export const router: Routes = [
//     { path: '', redirectTo: 'about', pathMatch: 'full' },
//     { path: 'about', component: AboutComponent },
//     { path: 'services', component: ServicesComponent }
// ];

// // Step 4 -Tell angular to use this router
// export const routes: ModuleWithProviders = RouterModule.forRoot(router);