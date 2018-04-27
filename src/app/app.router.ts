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
          path: 'chapter',
          loadChildren: './views/template-chapter/template-chapter.module#TemplateChapterModule'
        },
        {
          path: 'user-list',
          loadChildren: './views/user/user.module#UserModule'
        },
        {
          path: 'agent-information',
          loadChildren: './views/agent/agent.module#AgentModule'
        },
        {
          path: 'agent-visit',
          loadChildren: './views/agent/visit-history/visit-history.module#VisitHistoryModule'
        },
        {
          path: 'agent-performance',
          loadChildren: './views/agent/performance-chart/performance-chart.module#PerformanceChartModule'
        },
        {
          path: 'agents-map',
          loadChildren: './views/agent/agent-map/agent-map.module#AgentMapModule'
        },
        {
          path: 'profile-list',
          loadChildren: './views/profile/profile.module#ProfileModule'
        },
        {
          path: 'responsible-list',
          loadChildren: './views/responsible/responsible.module#ResponsibleModule'
        },
        {
          path: 'pregnant-list',
          loadChildren: './views/pregnant/pregnant.module#PregnantModule'
        },
        {
          path: 'child-list',
          loadChildren: './views/child/child.module#ChildModule'
        },
        {
          path: 'community-list',
          loadChildren: './views/community/community.module#CommunityModule'
        },
        {
          path: 'form-template-list',
          loadChildren: './views/form-template/form-template.module#FormTemplateModule'
        },
        {
          path: 'dashboard',
          loadChildren: './views/dashboard/dashboard.module#DashboardModule'
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
