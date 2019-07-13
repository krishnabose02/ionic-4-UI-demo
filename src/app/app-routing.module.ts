import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'landing-page', loadChildren: './landing-page/landing-page.module#LandingPagePageModule' },
  { path: 'dummy-module/:id', loadChildren: './dummy-module/dummy-module.module#DummyModulePageModule' },
  { path: 'video-list', loadChildren: './video-list/video-list.module#VideoListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
