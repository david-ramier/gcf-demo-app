import {Address} from './address';

export interface AppUser {
  uid:            string;
  email:          string;
  photoURL?:      string;
  displayName?:   string;

  profileType?:   string;
  firstname?:     string;
  lastname?:      string;
  telephone?:     string;
  gender?:        string;
  birthDate?:     string;

  address?:        Address;

}
