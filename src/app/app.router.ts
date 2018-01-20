import { ChapterDashboardComponent } from './views/template-chapter/chapter/chapter-dashboard/chapter-dashboard.component';
import { TemplateSelectModelComponent } from './views/template-chapter/template-select-model/template-select-model.component';
import { UserPersonalInformationComponent } from './views/user/user-personal-information/user-personal-information.component';
import { UserInformationAccountComponent } from './views/user/user-information-account/user-information-account.component';
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
import { ChapterDetailsComponent } from './views/template-chapter/chapter/chapter-details/chapter-details.component';
import { ChapterEditComponent } from './views/template-chapter/chapter/chapter-edit/chapter-edit.component';
import { InformationComponent } from './views/template-chapter/chapter/information/information.component';
import { DeactivateGuard } from './guards/deactivate.guard';
import { CommunityComponent } from './views/community/community.component';
import { CommunityListComponent } from './views/community/community-list/community-list.component';
import { PageGuard } from './guards/page.guard';

const App_Router: Routes = [

    {
        path: '',
        component: HomeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '', component: HomeComponent
            // redirectTo: 'user-list',
            // pathMatch: 'full'
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
            path: 'community-list',
            component: CommunityListComponent
          },
          {
            path: 'community',
            component: CommunityComponent
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
            component: InformationComponent
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
            path: 'chapter-details',
            component: ChapterDetailsComponent
          },
          {
            path: 'chapter-edit',
            component: ChapterEditComponent
          },
          {
            path: 'chapter-dashboard',
            component: ChapterDashboardComponent
              // canDeactivate: [DeactivateGuard]
          },
          {
            path: 'chapter-dashboard/:id',
            component: ChapterDashboardComponent
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
            component: UserDetailsComponent
          },
          {
            path: 'user-edit',
            component: UserEditComponent
          },
          {
            path: 'user-personal-info',
            component: UserPersonalInformationComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'profile-list',
            component: ProfileListComponent
            // canActivate: [PageGuard]
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
      { path: 'reset-password', component: ResetPasswordComponent},
      { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(App_Router);
