import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormTemplateDetailsComponent } from './form-template-details/form-template-details.component';
import { FormTemplateListComponent } from './form-template-list/form-template-list.component';
import { PageGuard } from './../../guards/page.guard';
import { FormTemplateComponent } from './form-template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FormTemplateListComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'registro',
    component: FormTemplateComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'detalhes',
    component: FormTemplateDetailsComponent,
      canActivate: [PageGuard]
  },
  {
    path: 'construtor',
    component: FormBuilderComponent
      // canActivate: [PageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormTemplateRoutingModule { }
