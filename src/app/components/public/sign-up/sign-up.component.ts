import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import GeoPoint = firebase.firestore.GeoPoint;

// Import Models
import { AppUser } from '../../../models/app-user';
import { Address } from '../../../models/address';

// Import Services
import { AuthenticationService} from '../../../services/authentication.service';
import { LocationService } from '../../../services/location.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  location: {lat: number, lng: number};
  loading: boolean;

  isLinear = false;
  profileTypes = [
    { name: 'Personal' },
    { name: 'Business' }
  ];

  accountInfoFormGroup:   FormGroup;
  profileInfoFormGroup:   FormGroup;

  selectedProfile: string;
  selectedGender: string;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private formBuilder: FormBuilder,
              public authenticationService: AuthenticationService,
              private geocodeService: LocationService,
              private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {

    this.accountInfoFormGroup = this.formBuilder.group({
      emailCtrl:            ['', [<any>Validators.required, <any>Validators.email] ],
      passwordCtrl:         ['', [<any>Validators.required] ],
      confirmPasswordCtrl:  ['', [<any>Validators.required] ]
    });

    this.profileInfoFormGroup = this.formBuilder.group({
      profileTypeCtrl:    ['', [<any>Validators.required] ],
      firstnameCtrl:      ['', [<any>Validators.required] ],
      lastnameCtrl:       ['', [<any>Validators.required] ],
      addressCtrl:        ['', [<any>Validators.required] ],
      zipCodeCtrl:        ['', [<any>Validators.required] ],
      cityCtrl:           ['', [<any>Validators.required] ],
      countryCtrl:        ['', [<any>Validators.required] ],
      telephoneCtrl:      ['', [<any>Validators.required] ],
      genderCtrl:         ['0', [<any>Validators.required] ],
      dobCtrl:            ['', [<any>Validators.required] ]
    });

    this.accountInfoFormGroup.valueChanges.subscribe(data => this.onValueChangedOnAccountInfo(data));
    this.profileInfoFormGroup.valueChanges.subscribe(data => this.onValueChangedOnProfileInfo(data));
  }

  onAccountInfoFormNext(): void {

  }

  onAddressLookup(){
    const address = <Address>{};
    address.address = this.profileInfoFormGroup.get('addressCtrl').value;
    address.zipCode = this.profileInfoFormGroup.get('zipCodeCtrl').value;
    address.city    = this.profileInfoFormGroup.get('cityCtrl').value;
    address.country = this.profileInfoFormGroup.get('countryCtrl').value;
    this.lookupAddressToCoordinates(address);
  }

  onSignUpFormSubmit(): void {
    //  verify that all data are present and submit calling the AuthenticationService method signUpWithEmailAndPassword

    // Creation of User Object
    const registeredUser = <AppUser>{};
    registeredUser.email        = this.accountInfoFormGroup.get('emailCtrl').value;
    registeredUser.profileType  = this.profileInfoFormGroup.get('profileTypeCtrl').value;
    registeredUser.firstname    = this.profileInfoFormGroup.get('firstnameCtrl').value;
    registeredUser.lastname     = this.profileInfoFormGroup.get('lastnameCtrl').value;
    registeredUser.displayName  = this.profileInfoFormGroup.get('firstnameCtrl').value + ' '
      + this.profileInfoFormGroup.get('lastnameCtrl').value;
    const address = <Address>{};
    address.address = this.profileInfoFormGroup.get('addressCtrl').value;
    address.zipCode = this.profileInfoFormGroup.get('zipCodeCtrl').value;
    address.city    = this.profileInfoFormGroup.get('cityCtrl').value;
    address.country = this.profileInfoFormGroup.get('countryCtrl').value;

    address.location = new GeoPoint(this.location.lat, this.location.lat);

    registeredUser.address      = address;

    registeredUser.telephone    = this.profileInfoFormGroup.get('telephoneCtrl').value;
    registeredUser.gender       = this.profileInfoFormGroup.get('genderCtrl').value;
    registeredUser.birthDate    = this.profileInfoFormGroup.get('dobCtrl').value;

    // Call of Authentication service with method signUpWithEmailAndPassword
    this.authenticationService.signUpWithEmailAndPassword(
      registeredUser,
      this.accountInfoFormGroup.get('passwordCtrl').value
    );

  }

  // Updates validation state on form changes.
  onValueChangedOnAccountInfo(data?: any) {
    if (!this.accountInfoFormGroup) { return; }
    const form = this.accountInfoFormGroup;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onValueChangedOnProfileInfo(data?: any) {
    if (!this.profileInfoFormGroup) { return; }
    const form = this.profileInfoFormGroup;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  lookupAddressToCoordinates(addressToBeLookedUp: Address) {
    this.loading = true;
    const location = addressToBeLookedUp.address + ' ' + addressToBeLookedUp.zipCode  + ' ' + addressToBeLookedUp.city;
    this.geocodeService.geocodeAddress(location)
      .subscribe(
        location => {
          this.location = location;
          this.loading = false;
          this.ref.detectChanges();
        }
      );
  }

}
