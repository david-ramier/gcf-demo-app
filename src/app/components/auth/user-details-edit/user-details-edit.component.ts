import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {AppUser} from '../../../models/app-user';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  user: AppUser;

  constructor(private afFirestore: AngularFirestore,
              private dialogRef: MatDialogRef<UserDetailsEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data;
  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpdateUser() {
    this.afFirestore.collection('users').doc(this.data.uid).update({
      firstname: this.user.firstname,
      lastname:  this.user.lastname,
      onlineStatus: this.user.onlineStatus,
    });
    this.dialogRef.close();
  }

}
