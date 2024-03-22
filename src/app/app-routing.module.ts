import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AuthGuard } from './auth.guard';
// import { AuthGuard } from './auth.guard'; // Menggunakan nama yang benar
import { authGuard } from './auth.guard'; // Menggunakan nama yang benar
import { LspromptComponent } from './lsprompt/lsprompt.component';
import { PromptComponent } from './prompt/prompt.component';



const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'dashboard', component: DashboardComponent,children:[
    { path: 'list', component: LspromptComponent },
    {path:'prompt',component:PromptComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }

 