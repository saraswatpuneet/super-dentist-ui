import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from './shared/dialog/dialog.module';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { NotificationModule } from './shared/notification/notification.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NotificationModule,
    DialogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MomentDateModule,
    NgxMaskModule.forRoot(),
    FlexLayoutModule,
    HttpClientModule,
    MatMomentDateModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {
    //   provide: MAT_DATE_FORMATS,
    //   useValue: {
    //     display: {
    //       dateInput: 'MMM DD, YYYY',
    //       monthYearLabel: 'YYYY',
    //       dateA11yLabel: 'LL',
    //       monthYearA11yLabel: 'YYYY',
    //     },
    //   },
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
