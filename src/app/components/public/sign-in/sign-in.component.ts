import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInFormGroup:   FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.buildForm();
  }


  onSignIn() {
    this.authenticationService.signInWithEmailAndPassword(
      this.signInFormGroup.controls['emailCtrl'].value,
      this.signInFormGroup.controls['passwordCtrl'].value
    );
  }

  private buildForm(): void {
    this.signInFormGroup = this.formBuilder.group({
      emailCtrl:            ['', [<any>Validators.required, <any>Validators.email] ],
      passwordCtrl:         ['', [<any>Validators.required] ]
    });
  }

}
