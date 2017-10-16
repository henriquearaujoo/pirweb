import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// view components
import { CostumerComponent } from './views/costumer/costumer.component';
import { MapsComponent } from  './views/maps/maps.component';
import { LoginComponent } from './views/login/login.component';
import { AgentComponent} from  './views/agent/agent.component';
import { DashboardComponent } from  './views/dashboard/dashboard.component';
import { TemplateFormsComponent } from  './views/template-forms/template-forms.component';

const App_Router: Routes = [
    { path: 'maps', component: MapsComponent },
    { path: 'agent', component: AgentComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'templateForms', component: TemplateFormsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router);