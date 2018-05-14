import { ChapterDashboardComponent } from './chapter/chapter-dashboard/chapter-dashboard.component';
import { PageGuard } from './../../guards/page.guard';
import { TemplateChapterComponent } from './template-chapter.component';
import { AuthGuard } from './../../guards/auth.guard';
import { HomeLayoutComponent } from './../../components/layout/home-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TemplateChapterComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: ChapterDashboardComponent,
      canActivate: [PageGuard]
  },
  {
    path: ':id',
    component: ChapterDashboardComponent,
      canActivate: [PageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateChapterRoutingModule { }