import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component';
import { TutorDashboardHomeComponent } from './tutor-dashboard/tutor-dashboard-home/tutor-dashboard-home.component';
import { TutorDashboardProfileComponent } from './tutor-dashboard/tutor-dashboard-profile/tutor-dashboard-profile.component';
import { TutorDashboardHeaderComponent } from './tutor-dashboard/tutor-dashboard-header/tutor-dashboard-header.component';
import { TutorDashboardRequestListComponent } from './tutor-dashboard/tutor-dashboard-request-list/tutor-dashboard-request-list.component';
import { TutorDashboardRequestComponent } from './tutor-dashboard/tutor-dashboard-request/tutor-dashboard-request.component';
import { TutorDashboardCourseComponent } from './tutor-dashboard/tutor-dashboard-course/tutor-dashboard-course.component';
import { TutorDashboardCalendarComponent } from './tutor-dashboard/tutor-dashboard-calendar/tutor-dashboard-calendar.component';
import { TutorDashboardFinanceComponent } from './tutor-dashboard/tutor-dashboard-finance/tutor-dashboard-finance.component';
import { TutorDashboardFinanceRevenueComponent } from './tutor-dashboard/tutor-dashboard-finance-revenue/tutor-dashboard-finance-revenue.component';
import { TutorDashboardFinanceBankingComponent } from './tutor-dashboard/tutor-dashboard-finance-banking/tutor-dashboard-finance-banking.component';
import { TutorDashboardFinancePaymentComponent } from './tutor-dashboard/tutor-dashboard-finance-payment/tutor-dashboard-finance-payment.component';
import { TutorDashboardNewsComponent } from './tutor-dashboard/tutor-dashboard-news/tutor-dashboard-news.component';
import { TutorDashboardNotetipComponent } from './tutor-dashboard/tutor-dashboard-notetip/tutor-dashboard-notetip.component';
import { TutorDashboardSystemMessageComponent } from './tutor-dashboard/tutor-dashboard-system-message/tutor-dashboard-system-message.component';
import {
  RecurrenceEditorAllModule,
  ScheduleAllModule,
  ScheduleModule,
} from '@syncfusion/ej2-angular-schedule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TutorComponent } from './pages/tutor/tutor.component';
import { StudentComponent } from './pages/student/student.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginHomeComponent } from './pages/login/login-home/login-home.component';
import { LoginTutorComponent } from './pages/login/login-tutor/login-tutor.component';
import { LoginStudentComponent } from './pages/login/login-student/login-student.component';
import { RegisterHomeComponent } from './pages/register/register-home/register-home.component';
import { RegisterTutorComponent } from './pages/register/register-tutor/register-tutor.component';
import { RegisterStudentComponent } from './pages/register/register-student/register-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
  SocialLoginModule,
} from 'angularx-social-login';
import { CountdownModule } from 'ngx-countdown';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentDashboardCalendarComponent } from './student-dashboard/student-dashboard-calendar/student-dashboard-calendar.component';
import { StudentDashboardCourseComponent } from './student-dashboard/student-dashboard-course/student-dashboard-course.component';
import { StudentDashboardFinanceComponent } from './student-dashboard/student-dashboard-finance/student-dashboard-finance.component';
import { StudentDashboardHeaderComponent } from './student-dashboard/student-dashboard-header/student-dashboard-header.component';
import { StudentDashboardHomeComponent } from './student-dashboard/student-dashboard-home/student-dashboard-home.component';
import { StudentDashboardNewComponent } from './student-dashboard/student-dashboard-new/student-dashboard-new.component';
import { StudentDashboardNotetipComponent } from './student-dashboard/student-dashboard-notetip/student-dashboard-notetip.component';
import { StudentDashboardProfileComponent } from './student-dashboard/student-dashboard-profile/student-dashboard-profile.component';
import { StudentDashboardRequestComponent } from './student-dashboard/student-dashboard-request/student-dashboard-request.component';
import { StudentDashboardSystemMessageComponent } from './student-dashboard/student-dashboard-system-message/student-dashboard-system-message.component';
import { StudentDashboardFinanceBankingComponent } from './student-dashboard/student-dashboard-finance-banking/student-dashboard-finance-banking.component';
import { StudentDashboardFinanceRevenueComponent } from './student-dashboard/student-dashboard-finance-revenue/student-dashboard-finance-revenue.component';
import { StudentDashboardFinancePaymentComponent } from './student-dashboard/student-dashboard-finance-payment/student-dashboard-finance-payment.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StudentDashboardRequestFormComponent } from './student-dashboard/student-dashboard-request/student-dashboard-request-form/student-dashboard-request-form.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  MatNativeDateModule,
  MatOptionModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { TimeTransform } from './timeTransform.pipe';
import { CustomPaginator } from './customPaginatorConfiguration';
import { TutorChatAreaComponent } from './tutor-dashboard/tutor-dashboard-system-message/tutor-chat-area/tutor-chat-area.component';
import { StudentChatAreaComponent } from './student-dashboard/student-dashboard-system-message/student-chat-area/student-chat-area.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { TutorDashboardRequestReceiveComponent } from './tutor-dashboard/tutor-dashboard-request/tutor-dashboard-request-receive/tutor-dashboard-request-receive.component';
import { TutorDashboardRequestSendComponent } from './tutor-dashboard/tutor-dashboard-request/tutor-dashboard-request-send/tutor-dashboard-request-send.component';
import { StudentRequestDetailComponent } from './tutor-dashboard/student-request-detail/student-request-detail.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { TutorDetailComponent } from './pages/tutor-detail/tutor-detail.component';
import { StudentDashboardSendComponent } from './student-dashboard/student-dashboard-request/student-dashboard-send/student-dashboard-send.component';
import { StudentDashboardReceiveComponent } from './student-dashboard/student-dashboard-request/student-dashboard-receive/student-dashboard-receive.component';
import { TutorRequestDetailComponent } from './student-dashboard/student-dashboard-request/tutor-request-detail/tutor-request-detail.component';
import { LearningDateTransform } from './learningDateTransform';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimeRangeTransform } from './timeRange.transform';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardHomeComponent } from './admin-dashboard/admin-dashboard-home/admin-dashboard-home.component';
import { ChartsModule } from 'ng2-charts';
import { AdminDashboardTutorAccountComponent } from './admin-dashboard/admin-dashboard-tutor-account/admin-dashboard-tutor-account.component';
import { AdminDashboardStudentAccountComponent } from './admin-dashboard/admin-dashboard-student-account/admin-dashboard-student-account.component';
import { AdminDashboardCourseManageComponent } from './admin-dashboard/admin-dashboard-course-manage/admin-dashboard-course-manage.component';
import { AdminDashboardSubjectManageComponent } from './admin-dashboard/admin-dashboard-subject-manage/admin-dashboard-subject-manage.component';
import { AdminDashboardLevelManageComponent } from './admin-dashboard/admin-dashboard-level-manage/admin-dashboard-level-manage.component';
import { AdminDashboardStudentRequestComponent } from './admin-dashboard/admin-dashboard-student-request/admin-dashboard-student-request.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AdminDashboardFinanceComponent } from './admin-dashboard/admin-dashboard-finance/admin-dashboard-finance.component';
import { AdminDashboardPayForTutorComponent } from './admin-dashboard/admin-dashboard-pay-for-tutor/admin-dashboard-pay-for-tutor.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TutorDashboardComponent,
    TutorDashboardHomeComponent,
    TutorDashboardProfileComponent,
    TutorDashboardHeaderComponent,
    TutorDashboardRequestListComponent,
    TutorDashboardRequestComponent,
    TutorDashboardCourseComponent,
    TutorDashboardCalendarComponent,
    TutorDashboardFinanceComponent,
    TutorDashboardFinanceRevenueComponent,
    TutorDashboardFinanceBankingComponent,
    TutorDashboardFinancePaymentComponent,
    TutorDashboardNewsComponent,
    TutorDashboardNotetipComponent,
    TutorDashboardSystemMessageComponent,
    TutorComponent,
    StudentComponent,
    RegisterComponent,
    LoginComponent,
    LoginHomeComponent,
    LoginTutorComponent,
    LoginStudentComponent,
    RegisterHomeComponent,
    RegisterTutorComponent,
    RegisterStudentComponent,
    StudentDashboardComponent,
    StudentDashboardCalendarComponent,
    StudentDashboardCourseComponent,
    StudentDashboardFinanceComponent,
    StudentDashboardHeaderComponent,
    StudentDashboardHomeComponent,
    StudentDashboardNewComponent,
    StudentDashboardNotetipComponent,
    StudentDashboardProfileComponent,
    StudentDashboardRequestComponent,
    StudentDashboardSystemMessageComponent,
    StudentDashboardFinanceBankingComponent,
    StudentDashboardFinanceRevenueComponent,
    StudentDashboardFinancePaymentComponent,
    StudentDashboardRequestFormComponent,
    TimeTransform,
    TutorChatAreaComponent,
    StudentChatAreaComponent,
    TutorDashboardRequestReceiveComponent,
    TutorDashboardRequestSendComponent,
    StudentRequestDetailComponent,
    StudentDetailComponent,
    TutorDetailComponent,
    StudentDashboardSendComponent,
    StudentDashboardReceiveComponent,
    TutorRequestDetailComponent,
    LearningDateTransform,
    TimeRangeTransform,
    LoginAdminComponent,
    AdminDashboardComponent,
    AdminDashboardHomeComponent,
    AdminDashboardTutorAccountComponent,
    AdminDashboardStudentAccountComponent,
    AdminDashboardCourseManageComponent,
    AdminDashboardSubjectManageComponent,
    AdminDashboardLevelManageComponent,
    AdminDashboardStudentRequestComponent,
    AdminDashboardFinanceComponent,
    AdminDashboardPayForTutorComponent,
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    SocialLoginModule,
    CountdownModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ScheduleAllModule,
    ChartsModule,
    NgxPayPalModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '353599220504-m6njhkonmqur84et91qsdvddn2gr4tso.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('564543198415304'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}