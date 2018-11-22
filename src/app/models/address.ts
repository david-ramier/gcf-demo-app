import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export interface Address {

  address?:     string;
  zipCode?:     string;
  city?:        string;
  country?:     string;
  addressType?: string;

  location?:          GeoPoint;
  placeId?:           string;
  formattedAddress?:  string;
}
