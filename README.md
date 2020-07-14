# JeeProjectWeb

## Overview
A web application for managing trades and their beers' stocks.
Users are authenticate with Google OAuth and can find which trades sell their favorites beers near them.

⚠ This web project is link with [this one](https://github.com/Effobless2/JEEProject).
Please install it before set up the angular front :)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Additional dependencies
### OAuth
Follow this [link](https://support.google.com/cloud/answer/6158849?hl=en)
and realize the part "Web applications".

⚠ Make sure to apply these modifications on the same Google API console project client ID than the JEE project server.

### Google Geolocation
Get API key from [here](https://developers.google.com/maps/documentation/javascript/geolocation).

### Google Maps
Get API key from [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Environment variables
Set on `src/environments/environment.ts` file:
- googleAPIClientId: client id of your OAuth service in Google API Console
- googleCloudAPIClientId: client id for Google Maps API key and Google Geolocation API key
- beererApiUrl: URL to the JEE server

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
