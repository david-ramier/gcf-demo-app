import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppUser} from '../models/app-user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<AppUser | null>;

  /**
   * Class constructor that takes the 4 parameters for its initialiyation:
   * AngularFireAuth service
   * AngularFirestore database
   * AngularFireStorage cdn
   * Angular Router in order to redirect to the correct page after each method
   *
   * @param afAuth
   * @param afFirestore
   * @param router
   */
  constructor(private afAuth: AngularFireAuth,
              private afFirestore: AngularFirestore,
              private router: Router) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afFirestore.doc<AppUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * This method allows to SignUp an anonymous user with Email and Password
   * @param email
   * @param password
   */
  signUpWithEmailAndPassword(appUser: AppUser, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(appUser.email, password)
      .then(authResult => {
        console.log('AppUser: ' + authResult.user.email + ' has been successfully registered in the app with uid: ' + authResult.user.uid);

        // Mapping Firebase user with App AppUser
        appUser.uid         = authResult.user.uid;
        appUser.email       = authResult.user.email;
        appUser.displayName = authResult.user.displayName;
        appUser.photoURL    = authResult.user.photoURL;

        this.updateUserData(appUser);    // create initial user document
        this.router.navigate(['/welcome']);
      })
      .catch(error => this.handleError(error) );

  }

  signOut() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  /**
   *
   * @param provider
   */
  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((authResult) => {
        this.updateUserData(authResult.user);
        this.router.navigate(['/welcome']);
      })
      .catch(error => this.handleError(error));
  }

  /**
   *
   * @param user
   */
  private updateUserData(user: AppUser) {
    const userRef: AngularFirestoreDocument<any> = this.afFirestore.doc(`users/${user.uid}`);

    const data: AppUser = {
      uid:          user.uid,
      email:        user.email,
      photoURL:     user.photoURL,
      displayName:  user.displayName,
      profileType:  user.profileType,
      firstname:    user.firstname,
      lastname:     user.lastname,
      telephone:    user.telephone,
      gender:       user.gender,
      birthDate:    user.birthDate,
      address:      user.address
    };

    return userRef.set(data, { merge: true });
  }

  /**
   * If error, console log and notify user
   */
  private handleError(error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
  }
}
