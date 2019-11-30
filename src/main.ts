import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import Amplify from '@aws-amplify/core';
import awsconfig from './aws-exports';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from '@aws-amplify/core';
// import Auth from '@aws-amplify/auth';

if (environment.production) {
  enableProdMode();
}

Amplify.configure(awsconfig);

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
