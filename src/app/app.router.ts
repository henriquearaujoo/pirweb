import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';

// view components
import { CostumerComponent } from './views/costumer/costumer.component';
import { MapsComponent } from  './views/maps/maps.component';
import { LoginComponent } from './views/login/login.component';
import { AgentComponent} from  './views/agent/agent.component';
import { DashboardComponent } from  './views/dashboard/dashboard.component';
import { TemplateFormsComponent } from  './views/template-forms/template-forms.component';
import { HomeComponent } from './views/home/home.component';

const App_Router: Routes = [
    { path: 'maps', component: MapsComponent,
        canActivate: [AuthGuard]
    },

    { path: 'agent', component: AgentComponent,
        canActivate: [AuthGuard]
    },

    { path: 'dashboard', component: DashboardComponent,
        canActivate: [AuthGuard]
    },


    { path: 'login', component: LoginComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'templateForms', component: TemplateFormsComponent,
        canActivate: [AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router);