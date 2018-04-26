import { NgxMaskModule } from 'ngx-mask';
import { UploadMultimediaComponent } from './../../components/upload-multimedia/upload-multimedia.component';
import { MultimediaGalleryComponent } from './../../components/multimedia-gallery/multimedia-gallery.component';
import { AnswerListComponent } from './chapter/conclusion/question/answer-list/answer-list.component';
import { QuestionComponent } from './chapter/conclusion/question/question.component';
import { QuillEditorModule } from 'ng2-quill-editor';
import { InterventionComponent } from './chapter/intervention/intervention.component';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReceptionComponent } from './chapter/reception/reception.component';
import { MultimediaComponent } from './chapter/multimedia/multimedia.component';
import { InterventionService } from './../../services/intervention/intervention.service';
import { InformationComponent } from './chapter/information/information.component';
import { ConclusionComponent } from './chapter/conclusion/conclusion.component';
import { ChapterDashboardComponent } from './chapter/chapter-dashboard/chapter-dashboard.component';
import { TemplateChapterItemComponent } from './template-chapter-item/template-chapter-item.component';
import { TemplateChapterComponent } from './template-chapter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateChapterRoutingModule } from './template-chapter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TemplateChapterRoutingModule,
    HttpModule,
    FormsModule,
    SharedModule,
    QuillEditorModule,
  ],
  declarations: [
    TemplateChapterComponent,
    TemplateChapterItemComponent,
    ChapterDashboardComponent,
    ConclusionComponent,
    InformationComponent,
    InterventionComponent,
    MultimediaComponent,
    ReceptionComponent,
    QuestionComponent,
    AnswerListComponent,
    MultimediaGalleryComponent,
    UploadMultimediaComponent,
  ],
  exports: [
    TemplateChapterComponent,
    TemplateChapterItemComponent,
    ChapterDashboardComponent,
    ConclusionComponent,
    InformationComponent,
    InterventionComponent,
    MultimediaComponent,
    ReceptionComponent,
    QuestionComponent,
    AnswerListComponent,
    MultimediaGalleryComponent,
    UploadMultimediaComponent,
  ],
  providers: [TemplateChapterItemComponent]
})
export class TemplateChapterModule { }
