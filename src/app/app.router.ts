import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
// // view components
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';

const App_Router: Routes = [
    {
      path: '',
      component: HomeLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full',
        },
        {
          path: 'home', component: HomeComponent
        },
        {
          path: 'capitulos',
          loadChildren: './views/template-chapter/template-chapter.module#TemplateChapterModule'
        },
        {
          path: 'usuarios',
          loadChildren: './views/user/user.module#UserModule'
        },
        {
          path: 'agente-dashboard',
          loadChildren: './views/agent/agent.module#AgentModule'
        },
        {
          path: 'agente-visita',
          loadChildren: './views/agent/visit-history/visit-history.module#VisitHistoryModule'
        },
        {
          path: 'agente-desempenho',
          loadChildren: './views/agent/performance-chart/performance-chart.module#PerformanceChartModule'
        },
        {
          path: 'agentes-mapa',
          loadChildren: './views/agent/agent-map/agent-map.module#AgentMapModule'
        },
        {
          path: 'perfis',
          loadChildren: './views/profile/profile.module#ProfileModule'
        },
        {
          path: 'responsaveis',
          loadChildren: './views/responsible/responsible.module#ResponsibleModule'
        },
        {
          path: 'gestantes',
          loadChildren: './views/pregnant/pregnant.module#PregnantModule'
        },
        {
          path: 'criancas',
          loadChildren: './views/child/child.module#ChildModule'
        },
        {
          path: 'comunidades',
          loadChildren: './views/community/community.module#CommunityModule'
        },
        {
          path: 'formularios',
          loadChildren: './views/form-template/form-template.module#FormTemplateModule'
        },
        {
          path: 'dashboard',
          loadChildren: './views/dashboard/dashboard.module#DashboardModule'
        },

        {
          path: 'relatorios',
          loadChildren: './views/report/report.module#ReportModule'
        },
      ]
    },
    {
      path: '',
      component: LoginLayoutComponent,
      children: [
        {
          path: 'login',
          loadChildren: './views/login/login.module#LoginModule'
        },
      ]
    },
    // { path: 'send-email', component: SendEmailComponent},
    // { path: 'reset-password', component: ResetPasswordComponent},
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router);
