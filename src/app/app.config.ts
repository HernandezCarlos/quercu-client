import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAngularSvgIcon } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      HttpClientModule
    ),
    provideAngularSvgIcon(), provideAnimationsAsync()
  ]
};
