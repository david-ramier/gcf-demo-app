// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey:             'AIzaSyDvSzdeHdoyDIfhNb5BizqTUsqmsVgiMfM',
    authDomain:         'name-marmac-gcf-demo.firebaseapp.com',
    databaseURL:        'https://name-marmac-gcf-demo.firebaseio.com',
    projectId:          'name-marmac-gcf-demo',
    storageBucket:      'name-marmac-gcf-demo.appspot.com',
    messagingSenderId:  '52176016320'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
