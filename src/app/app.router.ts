import { FormTemplateDetailsComponent } from './views/form-template/form-template-details/form-template-details.component';
import { FormTemplateListComponent } from './views/form-template/form-template-list/form-template-list.component';
import { FormTemplateComponent } from './views/form-template/form-template.component';
import { ChildDetailsComponent } from './views/child/child-details/child-details.component';
import { ResponsibleDetailsComponent } from './views/responsible/responsible-details/responsible-details.component';
import { MotherDetailsComponent } from './views/mother/mother-details/mother-details.component';
import { CommunityDetailsComponent } from './views/community/community-details/community-details.component';
import { ChildListComponent } from './views/child/child-list/child-list.component';
import { ResponsibleListComponent } from './views/responsible/responsible-list/responsible-list.component';
import { ResponsibleComponent } from './views/responsible/responsible.component';
import { MotherListComponent } from './views/mother/mother-list/mother-list.component';
import { MotherComponent } from './views/mother/mother.component';
import { ChildComponent } from './views/child/child.component';
import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { ChapterDashboardComponent } from './views/template-chapter/chapter/chapter-dashboard/chapter-dashboard.component';
import { TemplateSelectModelComponent } from './views/template-chapter/template-select-model/template-select-model.component';
import { UserDetailsComponent } from './views/user/user-details/user-details.component';
import { PageComponent } from './views/profile/page/page.component';
import { ProfileComponent } from './views/profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';

// view components
import { HomeComponent } from './components/home/home.component';
import { CostumerComponent } from './views/costumer/costumer.component';
import { MapsComponent } from './views/maps/maps.component';
import { LoginComponent } from './views/login/login.component';
import { AgentComponent} from './views/agent/agent.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TemplateChapterComponent } from './views/template-chapter/template-chapter.component';

import { ReceptionComponent } from './views/template-chapter/chapter/reception/reception.component';
import { TaskComponent } from './views/template-chapter/chapter/task/task.component';

import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';

import {UserComponent} from './views/user/user.component';
import {UserListComponent} from './views/user/user-list/user-list.component';

import { ProfileListComponent } from './views/profile/profile-list/profile-list.component';
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { InterventionComponent } from './views/template-chapter/chapter/intervention/intervention.component';
import { InformationComponent } from './views/template-chapter/chapter/information/information.component';
import { DeactivateGuard } from './guards/deactivate.guard';
import { CommunityComponent } from './views/community/community.component';
import { CommunityListComponent } from './views/community/community-list/community-list.component';
import { PageGuard } from './guards/page.guard';
import { SendEmailComponent } from './views/login/send-email/send-email.component';

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
            path: 'dashboard',
            component: DashboardComponent
              // canActivate: [PageGuard]
          },

          {
            path: 'agent',
            component: AgentComponent
              // canActivate: [PageGuard]
          },
          {
            path: 'maps',
            component: MapsComponent
              // canActivate: [PageGuard]
          },
          {
            path: 'form-template',
            component: FormTemplateComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'form-template-list',
            component: FormTemplateListComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'form-template-details',
            component: FormTemplateDetailsComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'community-list',
            component: CommunityListComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'child-list',
            component: ChildListComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'child-details',
            component: ChildDetailsComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'pregnant-list',
            component: MotherListComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'pregnant-details',
            component: MotherDetailsComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'responsible-list',
            component: ResponsibleListComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'responsible-details',
            component: ResponsibleDetailsComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'community',
            component: CommunityComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'community-details',
            component: CommunityDetailsComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'child',
            component: ChildComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'pregnant',
            component: MotherComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'responsible',
            component: ResponsibleComponent,
            canActivate: [PageGuard]
          },
          {
            path: 'template-chapter',
            component: TemplateChapterComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'chapter-dashboard',
            component: ChapterDashboardComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'chapter-dashboard/:id',
            component: ChapterDashboardComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'user',
            component: UserComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'user-list',
            component: UserListComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'user-details',
            component: UserDetailsComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'user-edit',
            component: UserEditComponent,
              canActivate: [PageGuard]
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'profile-list',
            component: ProfileListComponent,
              canActivate: [PageGuard]
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
      { path: 'send-email', component: SendEmailComponent},
      { path: 'reset-password', component: ResetPasswordComponent},
      { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router, {useHash: true});
