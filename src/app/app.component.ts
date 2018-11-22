import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Google Cloud Fest Demo App';

  /**
   *
   * @param snackBar snackBar useed to pop up messages when sign in and sign
   * @param router   router that handles the various url path
   * @param breakpointObserver   breakpointObserver
   * @param auth     Authentication service injected by the framework
   */
  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private breakpointObserver: BreakpointObserver,
              public auth: AuthenticationService) {

  }

  goToSignUp() {
    // Send the user to the Sign Up Page
    this.router.navigate(['/signup']);
  }

  goToSignOut() {
    this.openSnackBar('Bye Bye, See you soon', 'Close');
    this.auth.signOut();
  }

  goToPersonalInfo(tabIndex: number) {
    console.log('requested tab: ' + tabIndex);
    // this.router.navigate(['/personalinfo/' + tabIndex]);
  }

  private openSnackBar(snackbarMessage: string, snackbarAction: string) {
    this.snackBar.open(snackbarMessage, snackbarAction, {
      duration: 2000,
    });
  }

}
