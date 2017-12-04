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

import { ChapterInformationComponent } from './views/template-chapter/chapter/chapter-information/chapter-information.component';
import { ReceptionComponent } from './views/template-chapter/chapter/reception/reception.component';
import { TaskComponent } from './views/template-chapter/chapter/task/task.component';
import { TemplateCollectDataComponent } from './views/template-chapter/template-collect-data/template-collect-data.component';

import { HomeLayoutComponent } from './components/layout/home-layout.component';
import { LoginLayoutComponent } from './components/layout/login-layout.component';

import {UserComponent} from './views/user/user.component';
import {UserListComponent} from './views/user/user-list/user-list.component';

import { ResetPasswordComponent } from './views/login/reset-password/reset-password.component';
import { ProfileListComponent } from './views/profile/profile-list/profile-list.component';
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { InterventionComponent } from './views/template-chapter/chapter/intervention/intervention.component';
import { TemplateChapterOptionComponent } from './views/template-chapter/template-chapter-option/template-chapter-option.component';
import { QuestionComponent } from './views/template-chapter/template-collect-data/question/question.component';

const App_Router: Routes = [

    {
        path: '',
        component: HomeLayoutComponent,
        // canActivate: [AuthGuard],
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
            path: 'template-chapter',
            component: TemplateChapterComponent
          },
          {
            path: 'selectModel',
            component: TemplateSelectModelComponent
          },
          {
            path: 'template-chapter-option',
            component: TemplateChapterOptionComponent
          },
          {
            path: 'chapterInformation',
            component: ChapterInformationComponent
          },
          {
            path: 'reception',
            component: ReceptionComponent
          },
          {
            path: 'intervention',
            component: InterventionComponent
          },
          {
            path: 'task',
            component: TaskComponent
          },
          {
            path: 'collect-data',
            component: TemplateCollectDataComponent
          },
          {
            path: 'question',
            component: QuestionComponent
          },
          {
            path: 'user',
            component: UserComponent
          },
          {
            path: 'user-list',
            component: UserListComponent
          },
          {
            path: 'user-details',
            component: UserDetailsComponent
          },
          {
            path: 'user-edit',
            component: UserEditComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'profile-list',
            component: ProfileListComponent
          },
          {
            path: 'page-list',
            component: PageComponent
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
      { path: '**', redirectTo: '' },
      { path: 'resetPassword', component: ResetPasswordComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router);
