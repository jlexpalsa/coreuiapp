/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';
// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXlceXVUQmVeVkRxX0c=');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
