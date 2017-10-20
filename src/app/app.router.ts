import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';

// view components
import { HomeComponent } from './components/home/home.component';
import { CostumerComponent } from './views/costumer/costumer.component';
import { MapsComponent } from  './views/maps/maps.component';
import { LoginComponent } from './views/login/login.component';
import { AgentComponent} from  './views/agent/agent.component';
import { DashboardComponent } from  './views/dashboard/dashboard.component';
import { TemplateFormsComponent } from  './views/template-forms/template-forms.component';
import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';
import {UserComponent} from  './views/user/user.component';
import {UserListComponent} from './views/user-list/user-list.component';

const App_Router: Routes = [

    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [  
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },

          {
            path: 'agent',
            component: AgentComponent
          },
          {
            path: 'maps',
            component: MapsComponent
          },
          {
            path: 'templateForms',
            component: TemplateFormsComponent
          },   
          {
            path: 'user',
            component: UserComponent
          },
          {
            path:'user-list',
            component:UserListComponent
          }

        ]
      },

      {
        path: '',
        component: LoginLayoutComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          }
        ]
      },
      { path: '**', redirectTo: '' }
    
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router);