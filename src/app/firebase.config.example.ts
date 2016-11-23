import { AuthMethods, AuthProviders } from 'angularfire2';

export const AUTH = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup,
};

export const CONFIG = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: ''
};
