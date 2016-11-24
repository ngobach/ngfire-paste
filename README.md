# Paste

Angular 2 Project with Firebase backend powered by *AngularFire2*.

## Live demo

Live demo can be found here:  
:heart: [Firebase hosting](https://paste.ngobach.com/)

## Fix

There're some bugs with **awesome-typescript-loader** that can't load *hightlight.js* and any library with **.js** suffix.   
After run `npm install` you must rename **@types/hightlight.js** to  **@types/hightlightjs** and **hightlight.js** to **hightlightjs** in *node_modules*.   